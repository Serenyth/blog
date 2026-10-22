---
title: "HTML基础内容（文档结构与核心知识）"
published: 2025-03-27
updated: 2025-04-02
description: "基本文档结构 核心组成部分 1. 文档声明 声明HTML5文档类型 2. 根元素 标签包含整个文档内容 3. 头部区域 …"
tags: ["html", "前端"]
category: "学习"
author: "Lonly"
slug: "htlm基础内容-基础结构、知识）"
---

## 基本文档结构


```html

<!DOCTYPE html>

<html lang="zh">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="keywords" content="HTML教程,网页基础">

    <meta name="description" content="HTML文档结构与核心知识点详解">

    <title>HTML基础教程</title>

</head>

<body>

    <!-- 页面内容 -->

</body>

</html>

```



### 核心组成部分

1. **文档声明**  

`<!DOCTYPE html>` 声明HTML5文档类型

2. **根元素**  

`<html>` 标签包含整个文档内容

3. **头部区域**  

`<head>` 包含元数据和页面标题

4. **主体内容**  

`<body>` 包含所有可见内容



## 元数据配置



### 文件头和文件体




- `<head>` 文件头

- `</head>` 文件尾

- `<body>` 文件体

- 主要内容

- `</body>` 结束

- `</html>`



### 元数据




- `keyword`：向搜索引擎说明你的网页的关键词

- `description`：向搜索引擎描述网页内容的摘要信息



### 元数据配置



| 属性 | 作用 | 示例 |

|------|------|------|

| `charset` | 指定字符编码 | `<meta charset="UTF-8">` |

| `name="keywords"` | 搜索引擎关键词 | `<meta name="keywords" content="HTML,教程">` |

| `name="description"` | 页面描述 | `<meta name="description" content="HTML基础教程">` |

| `name="viewport"` | 移动端适配 | `<meta name="viewport" content="width=device-width">` |



``` html

<!-- 典型元数据配置 -->

<meta charset="UTF-8">

<meta name="keywords" content="网页开发,前端技术">

<meta name="description" content="HTML文档结构详解教程">

<title>页面标题</title>

```



### HTML的属性




- `lang`(语言)=“zh(中文)/en(英文)



------------------------------------



## URL链接



### 协议和域名




- `http`资源访问

  - `https://www.xxxx.com/`

- `FTP`文件下载

  - `ftp://ftp.xxxxx/文件夹/文件`

- `MAILTO`邮箱地址

  - `mailto:xxxxxx@xx.com`



-------------------------------------



## 文件路径



### 相对路径




- 相对当前文件寻找需要的文件的路径

- `".."`：返回上一层寻找文件



### 绝对路径




- 从根目录下寻找需要的文件

- `<主机+服务器+目录+文件名>`



-------------------------------------



## 注释




- 使用注释对一段html代码进行说明，方便在未来清楚的明白代码意图



## 图像格式




- `jpeg(JPG)`：网页上更加实用，有损压缩，色彩丰富，较小

- `PNG`：无损压缩（同时支持有损，透明，交错，动画）

- `GIF`：简单动画，背景图片



### img的使用




- `<img src="相对路径/绝对路径" alt="图片名称"(当图片无法正常显示时显示该文本)/>`



## 超链接的使用




- `<a href="链接((URL)/文件路径">入口名称/图片等</a>`



### 属性




- `target`：当值等于_blank时会在一个新窗口中打开

- `title`：提示性文本，当鼠标放在入口时会显示该段提示



## 锚点



### 定义




- 跳跃到对应位置



### 属性



#### 局部属性




- `download=''` 属性 用于a标签中(a标签必须有 href )



#### 全局属性




- `spellcheck='true/false'` 对可编辑元素(非密码)进行检查

- `contenteditable='true/false'` 使元素内容可编辑(p/div/...)

  - `contenteditable="plaintext-only"` 只能输入纯文本

- `accesskey="key"` 使元素获取焦点的快捷键(Alt+key/Alt+shift+key)

- `center` 标签自带居中样式。



### 文档声明




- `DOCTYPE` 声明文档html格式

- `meta`



### 背景




- `background-attachment: fixed;`



### 显示省略号




- `white-space: normal/nowrap`(文本不会换行)



## 二级菜单




- `<ul>`

  - `<li>`

    - `<ul>` 默认为none ,当鼠标移动到父级元素上时 ul改为block( li:hover)

      - `<li>`



## 通栏和版心




- 通栏:占全屏的元素

- 版心:两边会留空间的元素



### 设定一个类名作为版心




- `outline` : 设置input元素默认互动(焦点)样式



## 布局区域标签(语义化)




- 这些语义化标准主要是针对搜索引擎的

- IE9中需要转换成块元素

- 移动端没有这些兼容性问题



### 标签




- `<header>` 头部标签

- `<nav>` 导航栏

- `<article>` 标签规定独立的自包含内容(帖子，文章，评论)

- `<section>` 定义某个区域(大号的div)

- `<aside>` 侧边栏

- `<footer>` 尾部标签

- `<figure>` 标签规定独立的流内容（图像、图表、代码等等）

  - `<figcaption>` 在figure 标签中设置标题

- `<label>` 可以关联



## 多媒体标签



### 视频播放




- `<video src='文件地址'>` 视频播放,只支持 MP4,WetbM,Ogg

- 标签内容可以写 '您的浏览器不支持 video 标签' ,当未正常播放的时候会显示。



### 属性




- `autoplay = 'autoplay'` 视频自动播放(谷歌浏览器需要muted属性)

- `controls = "controls"` 显示播放控件(播放暂停进度条等..)

- `height/width` 设置播放器高宽

- `loop = 'loop'` 是否循环播放

- `preload = auto/none` 是否预加载视频

- `poster = imgurl(图片地址)` 加载等待的图片

- `muted = muted` 静音播放



### 音频播放




- `<audio src=''>` 音频播放， 支持 MP3、Wav、Ogg 格式

- `autoplay = 'autoplay'` 视频自动播放（谷歌禁用此属性）

- `controls = "controls"` 显示播放控件(播放暂停进度条等..)

- `loop = 'loop'` 是否循环播放

- `src = URL(文件路径)`



### 引入源文件




- `<source src='' type='video/mp4[ogg/..]'>` 在video/audio标签中，常用于引入源文件



## 表单



### 选项列表(数据列表)




- 在文本框中输入数据，会弹出 datalist 中相关文本

- `<input type='text' list='mylist'>`

- `<datalist id='mylist'>`

  - `<option value=''>选项`



### 新增 input 类型




- `pattern` : 设为某个格式的正则表达式，提交时会检查内容是否符合。



### type属性值




- `email` 限制用户只能输入Email 类型  multiple 属性可以填写多个邮箱用 ',' 隔开

- `url` 限制用户只能输入 URL 类型

- `date` 限制用户只能输入 日期 类型

- `time` 限制用户只能输入 时间 类型

- `month` 限制用户只能输入 月分 类型

- `week` 限制用户只能输入 周 类型

- `number` 限制用户只能输入 数字 类型

- `tel` 手机号码

- `search` 搜索框

- `color` 生成颜色选择器



### 注意




- 验证内容是否符合通过添加 form 表单域后 点击按钮 验证



### 表单验证属性



| 属性 | 作用 | 示例 |

|------|------|------|

| `required` | 必填字段 | `<input required>` |

| `pattern` | 正则验证 | `<input pattern="\d+">` |

| `placeholder` | 输入提示 | `<input placeholder="请输入">` |

| `min/max` | 数值范围 | `<input type="number" min="1">` |



```html

<!-- 带验证的登录表单示例 -->

<form>

    <input type="email" 

           placeholder="请输入邮箱"

           required

           pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.com">

    <input type="password" minlength="6" required>

</form>

```



### autofocus




- `autofocus = 'autofocus'` 自动聚焦属性



### autocomplete




- `autocomplete = 'off'/on` 当用户字段开始键入时，浏览器基于之前输入过的值，显示出在字段中填写的选项。需要放入表单且同时加上 name 属性。



### multiple




- `multiple = 'multiple'` 可以多选文件提交 (type = 'file')



## 表格



### 定义表格




- `<table>`:定义表格

- `<tr>`:table标签的子标签，代表一列、

- `<td>`:tr标签的子标签，代表一个单元格



### table属性




- `border`:边框粗细程度（属性值为数值）

- `cellspacing`:定义单元格的间距（属性值为数值）



### td属性




- `colspan`:定义单元格的跨列大小（属性值为数值）

- `rowspan`:定义单元格的跨行大小（属性值为数值）



### 属性




- `align`:属性值center，使文字或表格居中