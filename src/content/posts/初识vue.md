---
title: "初识vue"
published: 2025-04-13
updated: 2025-04-26
description: "用 Vite 脚手架从零起一个 Vue 项目：命令参数怎么读、每个目录管什么、功能与开发依赖分别要装哪些，最后打包输出。"
tags: ["vue", "前端"]
category: "web开发"
slug: "初识vue"
---

### 如何构建 Vue 项目
#### 使用 Vite 脚手架构建 Vue 项目
`npm create vite@latest frontend -- --template vue`

**参数说明：**
*   npm create：使用 npm 创建新项目。
*   vite@latest：使用最新版本的 Vite 脚手架。
*   frontend：项目名称，将在当前目录创建一个名为 frontend 的文件夹。
*   \--template vue：使用 Vue 模板创建项目。

#### 项目结构
创建后会生成一个名为 frontend 的文件夹，用于存放前端内容。以下是 frontend 文件夹下的常见文件和文件夹及其作用：

*   **/src**：项目的核心源代码目录。
    *   **/src/assets**：存放静态资源，如图片、样式文件等。
    *   **/src/components**：存放可复用的 Vue 组件。
    *   **/src/views**：存放页面级的 Vue 组件，通常对应路由。
    *   **/src/router**：存放路由配置文件，用于管理页面跳转。
    *   **/src/store**：存放 Vuex 状态管理相关代码（如果使用 Vuex）。
    *   **/src/main.js**：项目的入口文件，用于初始化 Vue 应用。
    *   **/src/App.vue**：项目的根组件，包含全局布局和样式。

*   **/public**：存放公共资源，如 favicon、静态 HTML 文件等。这些文件会被直接复制到构建后的输出目录。
*   **/node\_modules**：存放项目依赖的第三方模块。此文件夹由 npm install 命令自动生成，通常不需要手动修改。
*   **/dist**：项目构建后的输出目录。运行构建命令（如 npm run build）后，生成的静态资源会存放在这个文件夹中，用于部署到服务器。
*   **index.html**：Vue 的入口页面，位于项目根目录。它是项目的模板文件，Vite 会根据此文件生成最终的 HTML 文件。

#### 安装依赖

运行以下命令安装项目依赖：
`npm install`

### 运行检查
运行代码确定可以运行
`npm run dev`

#### 构建后的目录结构示例
![构建后](/assets/images/legacy/67fb781fe3155.png)

### 安装推荐依赖

#### 1\. 功能性依赖

*   **vue-router**：Vue 官方的路由管理器，用于实现页面导航和路由控制，支持路由嵌套、参数传递等功能。
*   **pinia**：Vue 官方推荐的状态管理库，用于管理全局状态，比 Vuex 更轻量和简单。
*   **axios**：流行的 HTTP 客户端，用于与后端 API 进行通信，支持请求拦截、响应处理等功能。
*   **element-plus**：Vue 3 的 UI 组件库，提供丰富的预制组件，支持主题定制。
*   **@element-plus/icons-vue**：Element Plus 的图标库，提供常用的图标组件。

安装命令：
`npm install vue-router pinia axios element-plus @element-plus/icons-vue`

#### 2\. 开发工具依赖

*   **sass**：CSS 预处理器，用于编写更灵活的样式代码。
*   **unplugin-auto-import**：自动导入 API，减少手动导入的繁琐操作。
*   **unplugin-vue-components**：自动导入组件，提升开发效率。

安装命令：
`npm install -D sass unplugin-auto-import unplugin-vue-components`

#### 3\. 功能增强依赖

*   **dayjs**：轻量级的日期处理库，用于格式化、解析和操作日期。
*   **lodash-es**：工具函数库，提供丰富的函数用于数组、对象等操作。
*   **js-cookie**：用于处理浏览器 Cookie 的库。
*   **nprogress**：页面加载进度条库，用于增强用户体验。

安装命令：
`npm install dayjs lodash-es js-cookie nprogress`

* * *
### 开始开发页面

安装完依赖后，就可以开发页面啦！以下是开发过程中的一些常见步骤：

1.  **配置路由**： 在 /src/router/index.js 中配置页面路由，使用 vue-router 定义页面路径和对应的组件。
2.  **管理状态**： 在 /src/store 中使用 pinia 创建和管理全局状态，方便组件间共享数据。
3.  **使用 UI 组件库**： 导入 element-plus 组件库，使用其提供的预制组件快速构建页面。
4.  **开发组件**： 在 /src/components 中创建可复用的 Vue 组件，提升代码复用性。
5.  **页面开发**： 在 /src/views 中开发页面级组件，结合路由实现页面跳转。
6.  **样式开发**： 使用 sass 编写样式文件，存放在 /src/assets 中，统一管理项目样式。  
7.  **API 请求**： 使用 axios 与后端 API 进行通信，处理数据请求和响应。
8.  **工具函数**： 使用 lodash-es 提供的工具函数简化代码逻辑。
9.  **日期处理**： 使用 dayjs 处理日期相关的逻辑，如格式化、计算等。
10.  **用户体验优化**： 使用 nprogress 添加页面加载进度条，提升用户体验。

#### 打包vue项目：
``` bash
npm run build
```

这会将vue项目打包成静态资源，也可以使用electron打包成桌面程序