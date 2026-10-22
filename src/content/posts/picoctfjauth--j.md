---
title: "【picoCTF】JAuth  J"
published: 2025-04-19
updated: 2025-04-23
description: "👀JAuth J 题目截图： 🤔思路： 参考大佬博客：🌐 JAuth mH4ck3r0n3 题目内容： 启动实例访…"
tags: ["CTF", "题目"]
category: "picoCTF"
slug: "picoctfjauth--j"
---

### 👀JAuth  J
题目截图：
![JAuth  J](https://bu.dusays.com/2025/04/20/6804ac0036a4e.png)

### 🤔思路：
参考大佬博客：[🌐 JAuth - mH4ck3r0n3](https://mh4ck3r0n3.github.io/posts/2025/03/01/jauth/)
题目内容：
```language
您能否识别组件并利用易受攻击的组件？
该网站在此处运行。你能成为 ？admin
您可以使用密码登录以开始使用。testTest123!
```
启动实例访问：

#### @第一步
访问网站看到的界面是这样的
![our bank](https://bu.dusays.com/2025/04/20/6804abc06d53a.png)
在题目中有提到`admin`，以及密码登录:`testTest123!`

#### @第二步 尝试登录
用户:`test`
密码:`Test123!`
![](https://bu.dusays.com/2025/04/20/6804ad633a87e.png)
登录成功！
![](https://bu.dusays.com/2025/04/20/6804ad9d2e964.png)
好吧被忽悠了，让我们在看看控制台有没有线索？

在应用程序中能看到cookie有token令牌
![](https://bu.dusays.com/2025/04/20/6804ae454c345.png)

尝试检查他是不是JWT，可以使用[JSON Web Tokens - jwt.io](https://jwt.io/)工具进行确认。
![](https://bu.dusays.com/2025/04/20/6804ae7f6d71c.png)
是的，看起来能得到一些信息，可以尝试将角色从**user**提权到**admin**。


### 🚩获得flag:
####工具
[mH4ck3r0n3的JAuth工具](https://mh4ck3r0n3.github.io/resources/PicoGym/PicoGymExclusive/JAuth/exploit.py)