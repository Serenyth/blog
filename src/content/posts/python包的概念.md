---
title: "python包的概念"
published: 2025-04-02
updated: 2025-04-02
description: "讲清 Python 里包和模块的关系：为什么文件夹里得有 __init__.py 才能被导入，以及这个文件实际能完成哪些初始化工作。"
tags: ["python"]
category: "学习"
slug: "python包的概念"
---

## 自定义pyothon包

1. 包的文件夹中需要包含__init__.py，才可以被其他python文件引用。

    -    什么是__init__.py文件?

        - 可以对包进行初始化，比如改变环境变量等等。

        - 管理包公共接口，比如在