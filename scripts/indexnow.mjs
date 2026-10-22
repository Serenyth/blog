#!/usr/bin/env node
/**
 * IndexNow 推送：把这次提交里新增 / 修改 / 删除的文章 URL 提交给 Bing、Yandex、
 * Seznam、Naver 等参与 IndexNow 的引擎，省掉等爬虫自己发现的几天。
 *
 * 用法：
 *   node scripts/indexnow.mjs          CI 里用，按 git diff 决定推哪些
 *   node scripts/indexnow.mjs --all    推全站文章 + 首页
 *   node scripts/indexnow.mjs --dry    只打印将要提交的 URL，不发请求
 *
 * 依赖环境变量 BEFORE_SHA / AFTER_SHA（CI 从 github.event 注入）；
 * 没有或为全 0 时（手动触发、首次推送）退化成推全站。
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SITE = "https://serenyth.github.io";
const HOST = new URL(SITE).host;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const POSTS_PREFIX = "src/content/posts/";
const POSTS_DIR = path.resolve("src/content/posts");
const PUBLIC_DIR = path.resolve("public");

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has("--dry");

/** key 文件名就是 key 本身，所以直接按文件名找，换 key 只要替换 public 里的文件 */
function findKey() {
	const hit = fs
		.readdirSync(PUBLIC_DIR)
		.find((f) => /^[0-9a-f]{32}\.txt$/i.test(f));
	if (!hit) {
		throw new Error(
			"public/ 下没找到 32 位十六进制的 IndexNow key 文件，请先放一个 <key>.txt",
		);
	}
	const key = hit.replace(/\.txt$/i, "");
	const content = fs.readFileSync(path.join(PUBLIC_DIR, hit), "utf8").trim();
	if (content !== key) {
		throw new Error(`${hit} 的内容与文件名不一致，引擎会校验失败`);
	}
	return key;
}

/** /posts/<slug>/ 里的 slug 要用百分号编码，和 Astro 生成的链接保持一致 */
function postUrl(slug) {
	return `${SITE}/posts/${slug.split("/").map(encodeURIComponent).join("/")}/`;
}

function slugOf(file) {
	return file
		.replace(/\\/g, "/")
		.replace(POSTS_PREFIX, "")
		.replace(/\.(md|mdx|markdown)$/i, "");
}

function walkPosts(dir, rel, out) {
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		if (e.name.startsWith(".") || e.name.startsWith("_")) continue;
		const childRel = rel ? `${rel}/${e.name}` : e.name;
		if (e.isDirectory()) walkPosts(path.join(dir, e.name), childRel, out);
		else if (/\.(md|mdx|markdown)$/i.test(e.name)) out.push(childRel);
	}
	return out;
}

/** @returns {Array<{status: string, file: string}> | null} null 表示判断不了，应推全站 */
function changedPostFiles() {
	const before = process.env.BEFORE_SHA || "";
	const after = process.env.AFTER_SHA || "HEAD";
	if (!before || /^0+$/.test(before) || !after) return null;

	let out;
	try {
		out = execFileSync(
			"git",
			[
				// 不加这句，git 会把中文文件名转义成 "210.md" 这种形式，路径直接解析错
				"-c",
				"core.quotePath=false",
				"diff",
				"--name-status",
				before,
				after,
				"--",
				POSTS_PREFIX,
			],
			{ encoding: "utf8" },
		);
	} catch (e) {
		console.warn("[indexnow] git diff 失败，退化为推送全站：", e.message);
		return null;
	}

	return out
		.split(/\r?\n/)
		.filter(Boolean)
		.map((line) => {
			const parts = line.split("\t");
			// 重命名是 R100\told\tnew，取新路径
			return { status: parts[0][0], file: parts[parts.length - 1] };
		});
}

function buildUrlList() {
	const changes = args.has("--all") ? null : changedPostFiles();

	let slugs;
	if (changes === null) {
		slugs = walkPosts(POSTS_DIR, "", []).map(slugOf);
		console.log(`[indexnow] 推全站 ${slugs.length} 篇`);
	} else {
		if (!changes.length) {
			console.log("[indexnow] 这次提交没动文章，不用提交");
			return [];
		}
		slugs = changes.map((c) => slugOf(c.file));
		console.log(
			`[indexnow] 本次提交影响 ${changes.length} 个文章文件：`,
			changes.map((c) => `${c.status}:${path.basename(c.file)}`).join(", "),
		);
	}

	const urls = new Set(slugs.map(postUrl));
	// 文章有增删改，首页列表也跟着变
	if (urls.size) urls.add(`${SITE}/`);
	return [...urls];
}

async function main() {
	const key = findKey();
	const urlList = buildUrlList();
	if (!urlList.length) return;

	console.log(`[indexnow] 待提交 ${urlList.length} 条：`);
	for (const u of urlList) console.log("   ", decodeURI(u));

	if (DRY_RUN) {
		console.log("[indexnow] --dry，不发送");
		return;
	}

	const payload = {
		host: HOST,
		key,
		keyLocation: `${SITE}/${key}.txt`,
		urlList,
	};

	let res;
	try {
		res = await fetch(ENDPOINT, {
			method: "POST",
			headers: { "Content-Type": "application/json; charset=utf-8" },
			body: JSON.stringify(payload),
		});
	} catch (e) {
		// 网络问题不该让整个部署变红，站点本身已经上线了
		console.warn("[indexnow] 请求失败，跳过：", e.message);
		return;
	}

	const text = await res.text().catch(() => "");
	const hint = {
		200: "已收到",
		202: "已收到，key 校验待完成",
		400: "请求格式错误",
		403: "key 无效 —— 检查 key 文件是否已部署到站点根目录",
		422: "URL 与 host 不匹配，或 key 文件校验不通过",
		429: "提交过于频繁",
	}[res.status];
	console.log(`[indexnow] HTTP ${res.status} ${hint || ""} ${text}`.trim());

	if (res.status >= 400 && res.status < 500) {
		process.exitCode = 1;
	}
}

main().catch((e) => {
	console.error("[indexnow]", e.message);
	process.exitCode = 1;
});
