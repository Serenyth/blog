import type { APIRoute } from "astro";

export const prerender = true;

// SITE 是不含 base 的域根，base 非空时必须手动拼上，否则会指向 404 地址
const siteOrigin = import.meta.env.SITE.replace(/\/$/, "");
const siteBase = import.meta.env.BASE_URL.replace(/^\/*/, "").replace(/\/*$/, "");
const sitemapUrl = `${siteOrigin}/${siteBase ? `${siteBase}/` : ""}sitemap-index.xml`;

// 不要再 Disallow /_astro/：那里是 CSS/JS，挡掉会让 Googlebot 渲染不出页面
const robotsTxt = `
User-agent: *
Disallow: /archive/?tag=
Disallow: /archive/?category=
Disallow: /archive/?uncategorized=

Sitemap: ${sitemapUrl}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
