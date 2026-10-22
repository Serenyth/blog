---
title: "【picoCTF】Forbidden Paths 禁止路径"
published: 2025-04-20
updated: 2025-04-23
description: "👀Forbidden Paths 禁止路径 题目截图： 访问实例可以得到 🤔思路： 由题已经知道 或许可以尝试使用相…"
tags: ["题目", "CTF"]
category: "picoCTF"
slug: "【picoCTF】Forbidden Paths 禁止路径"
---

### 👀Forbidden Paths 禁止路径
题目截图：
![Forbidden Paths](https://bu.dusays.com/2025/04/19/68036608db4ff.png)
访问实例可以得到
![Web eReader](https://bu.dusays.com/2025/04/19/6803664e728bb.png)

### 🤔思路：
由题已经知道
```text
网站文件位于 /usr/share/nginx/html/ 中，
标志位于 /flag.txt 但该网站正在过滤绝对文件路径道网站文件位于 `/usr/share/nginx/html/` 中，

标志位于 `/flag.txt` 但该网站正在过滤绝对文件路径。
```
或许可以尝试使用相对路径，去读取，比如`../flag.txt`
最后尝试：`../../../flag.txt`
### 🚩获得flag:
尝试：`../../../flag.txt`
flag:`picoCTF{7h3_p47h_70_5ucc355_e5a6fcbc}`
![](https://bu.dusays.com/2025/04/19/680367fb7609c.png)