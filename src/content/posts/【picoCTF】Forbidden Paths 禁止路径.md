---
title: "【picoCTF】Forbidden Paths 禁止路径"
published: 2025-04-20
updated: 2025-04-23
description: "picoCTF 的 Forbidden Paths 题解：网站过滤了绝对路径，于是改用 ../../../flag.txt 这样的相对路径做目录穿越，把 flag 读出来。"
image: /assets/images/legacy/68036608db4ff.png
tags: [题目, CTF]
category: "picoCTF"
draft: false
pinned: false
slug: 【picoCTF】Forbidden Paths 禁止路径
series: "picoCTF靶场"
---


### 👀Forbidden Paths 禁止路径
题目截图：
![Forbidden Paths](/assets/images/legacy/68036608db4ff.png)
访问实例可以得到
![Web eReader](/assets/images/legacy/6803664e728bb.png)

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
![](/assets/images/legacy/680367fb7609c.png)