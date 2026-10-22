/**
 * 构建期给 sitemap 补 lastmod 用：直接扫文章源文件，取 slug 和修改日期。
 *
 * 为什么不用 content collection：astro.config.mjs 在 Astro 启动集成之前就被求值，
 * 那里 import 不到 astro:content，拿不到 getCollection。所以这里用 fs 自己读 frontmatter。
 *
 * 日期只用 frontmatter 里的静态值，绝不能用构建时间 —— 每次构建都变的 lastmod
 * 会被 Google 判定不可信，然后把整列忽略掉，等于白做。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MODULE_DIR = fileURLToPath(new URL(".", import.meta.url));

// Astro 加载配置时可能先把 astro.config.mjs 打包到临时目录，import.meta.url 就未必
// 还指着源文件。所以优先用项目根目录（Astro 一定在根目录下运行）定位，
// 只有那里找不到才退回模块自身的位置。
const POSTS_DIR = [
	path.resolve(process.cwd(), "src/content/posts"),
	path.resolve(MODULE_DIR, "../content/posts"),
].find((dir) => fs.existsSync(dir)) ?? path.resolve(MODULE_DIR, "../content/posts");

/** 从 frontmatter 的一行里抠出 YYYY-MM-DD，兼容带时间、带引号、用斜杠分隔的写法 */
function parseDateLine(line) {
	if (!line) return null;
	const m = line.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
	if (!m) return null;
	const [, y, mo, d] = m;
	return `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

/** 读取一篇 md/mdx 的标题块，返回 { updated, published, draft } */
function readFrontmatter(raw) {
	const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!m) return null;
	const body = m[1];
	const field = (name) => {
		const line = body
			.split(/\r?\n/)
			.find((l) => new RegExp(`^${name}\\s*:`).test(l));
		return line ? line.replace(new RegExp(`^${name}\\s*:\\s*`), "").trim() : "";
	};
	return {
		updated: parseDateLine(field("updated")),
		published: parseDateLine(field("published")),
		draft: /^true$/i.test(field("draft").replace(/["']/g, "")),
	};
}

function walk(dir, rel, out) {
	let entries;
	try {
		entries = fs.readdirSync(dir, { withFileTypes: true });
	} catch (_) {
		return;
	}
	for (const e of entries) {
		const name = e.name;
		if (name.startsWith(".") || name.startsWith("_")) continue;
		const childRel = rel ? `${rel}/${name}` : name;
		if (e.isDirectory()) {
			walk(path.join(dir, name), childRel, out);
			continue;
		}
		if (!/\.(md|mdx|markdown)$/i.test(name)) continue;
		out.push({ slug: childRel.replace(/\.(md|mdx|markdown)$/i, ""), full: path.join(dir, name) });
	}
}

/**
 * @returns {{ dates: Map<string,string>, latest: string | null }}
 *   dates 的 key 是文章 slug（即 /posts/<slug>/ 里的那一段，未编码）
 */
export function collectPostLastmod() {
	const files = [];
	walk(POSTS_DIR, "", files);

	const dates = new Map();
	let latest = null;

	for (const { slug, full } of files) {
		let raw;
		try {
			raw = fs.readFileSync(full, "utf8");
		} catch (_) {
			continue;
		}
		const fm = readFrontmatter(raw);
		if (!fm || fm.draft) continue;
		const date = fm.updated || fm.published;
		if (!date) continue;
		dates.set(slug, date);
		if (!latest || date > latest) latest = date;
	}

	return { dates, latest };
}

// 会随「有新文章/文章被改」而变的列表页。静态页（about / gallery / projects …）
// 不在这张表里，也就不给 lastmod —— 编一个不真实的日期不如不给。
const AGGREGATE_PATHS = new Set([
	"/",
	"/archive/",
	"/categories/",
	"/tags/",
	"/series/",
	"/rss/",
	"/atom/",
]);

/**
 * 按 pathname 查 lastmod。pathname 请传解码后的值。
 * @returns {string | undefined} YYYY-MM-DD
 */
export function createLastmodResolver({ dates, latest }) {
	return (pathname) => {
		if (pathname.startsWith("/posts/")) {
			const slug = pathname.slice("/posts/".length).replace(/\/$/, "");
			return dates.get(slug);
		}
		if (latest && (AGGREGATE_PATHS.has(pathname) || /^\/\d+\/$/.test(pathname))) {
			return latest;
		}
		return undefined;
	};
}
