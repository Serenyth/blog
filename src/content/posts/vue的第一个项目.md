---
title: "vue的第一个项目！"
published: 2025-04-13
updated: 2025-04-22
description: "动手写第一个 Vue 3 页面：认清单文件组件的三件套，理解 script setup 和 ref 在做什么，再用 Element Plus 搭出左侧导航布局。"
tags: ["vue", "前端"]
category: "web开发"
slug: "vue的第一个项目"
---

### 知识回顾：
#### vue项目结构说明：

- App.vue : 应用的根组件，所有页面的容器
- components : 存放可复用的组件
- router : 路由配置，控制页面跳转
- views : 存放页面级组件

### 第一步！了解vue页面的基本概念：
#### 基本三件套；script-template-style
这种结构被称为"单文件组件"(SFC)

```html
<script setup>
// 这里写 JavaScript 代码
// 比如：定义变量、函数、导入其他文件等
</script>

<template>
<!-- 这里写页面结构，类似 HTML -->
<!-- 就是用户看到的内容 -->
</template>

<style>
/* 这里写样式，就是 CSS */
/* 控制页面长什么样子 */
</style>
```

#### 关于 script setup ：
概念：是 Vue 3 引入的一种语法糖，基于 Composition API，使得代码更加简洁和易于理解。它允许我们在<'script'>标签中直接使用 setup 函数的功能。

```javascript
// 导入需要的东西，就像拿工具一样
import { ref } from 'vue'  
// ref 用来创建可以改变的变量
import { useRouter } from 'vue-router' 
// 用来实现页面跳转
// 创建变量
const count = ref(0)  // 这个值可以改变，改变时页面会自动更新

// 创建函数
const addCount = () => {
  count.value = count.value + 1  // 改变值的方法
}
```

**`大致了解作用，用到再详解`**

解释：
Q: 什么是ref?
A: 参考[API 参考 | Vue.js](https://cn.vuejs.org/api/)

```answer
- ref 的作用：
- 让数据变成"响应式"的
- 当数据改变时，页面会自动更新

- 举个生活例子：
- 没有 ref ：就像手动计分板，改变分数需要手动更新显示
- 使用 ref ：就像电子计分板，改变分数时显示会自动更新
```

Q：什么是'vue-router'
A：这是vue-router官方提供的路由管理，可以更好地管理页面跳转和路由。具体学习在[介绍 | Vue Router](https://router.vuejs.org/zh/introduction.html)

<hr />

### 第二步！开始来搭建页面吧！
我想制作一个左右布局的页面，左侧是导航栏：
那么，我就先在复用组件中创建一个导航栏/components/sidebar
我使用的是[Element Plus(组件官网)](https://element-plus.org/zh-CN/)组件。

```html
<script setup>
// 导入所需的 Vue 功能
import { ref, inject } from 'vue'  // 增加 inject 导入
import { useRouter, useRoute } from 'vue-router'  // 用于路由导航
import { watch } from 'vue'

// 导入 Element Plus 的图标组件
import {
  HomeFilled,
  Document,
  Picture,
  Setting,
  Moon,
  Sunny
} from '@element-plus/icons-vue'
// @element-plus/icons-vue 是 Element Plus 提供的图标库
</script>

<template>
  <el-menu class="sidebar-menu">
    <!-- 首页菜单项 -->
    <el-menu-item index="/">
      <el-icon><HomeFilled /></el-icon>
      <template #title>首页</template>
    </el-menu-item>

    <!-- 文章管理菜单项 -->
    <el-menu-item index="/posts">
      <el-icon><Document /></el-icon>
      <template #title>文章管理</template>
    </el-menu-item>

    <!-- 图片管理菜单项 -->
    <el-menu-item index="/images">
      <el-icon><Picture /></el-icon>
      <template #title>图片管理</template>
    </el-menu-item>
    
    <!-- 设置菜单项 -->
    <el-menu-item index="/settings">
      <el-icon><Setting /></el-icon>
      <template #title>设置</template>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.sidebar-menu {
  height: 100vh;
  border-right: none;
  transition: all 0.3s;
}

.sidebar-menu:not(.el-menu--collapse) {
  width: 200px;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  border-bottom: 1px solid #f2f2f2;
  transition: all 0.3s;
}

.logo-small {
  height: 30px;
  transition: all 0.3s;
}

.el-menu-item {
  border-left: 3px solid transparent;
}

.el-menu-item.is-active {
  background-color: var(--el-menu-hover-bg-color);
  border-left: 3px solid var(--el-menu-active-color);
}

.el-menu-item:hover {
  background-color: var(--el-menu-hover-bg-color);
}

.theme-switch {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  padding: 0 20px;
  transition: all 0.3s;
}

.theme-switch.collapsed {
  padding: 0 20px;
  display: flex;
  justify-content: center;
}

.theme-switch.dark {
  color: #e5e7eb;
}

.switch-btn {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 6px;
  transition: all 0.3s;
}

.switch-btn:hover {
  background-color: var(--el-menu-hover-bg-color);
}

.switch-btn .el-icon {
  margin-right: 10px;
  font-size: 18px;
}

.theme-switch.collapsed .switch-btn .el-icon {
  margin-right: 0;
}
</style>
```

然后引入到APP.vue中：

```html
<script setup>
import Sidebar from './components/Sidebar.vue';
<!-- 导入sidebar组件 -->
import './style.css'
import { ref, onMounted, onUnmounted } from 'vue'
</script>

<template>
  <div id="app">
    <el-container class="container">
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="aside-container">
        <Sidebar :is-collapse="isCollapse" @toggle-collapse="isCollapse = !isCollapse" />
      </el-aside>
      
      <!-- 主内容区 -->
      <el-container class="main-container">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
</style>
```