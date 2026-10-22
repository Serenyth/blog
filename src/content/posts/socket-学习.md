---
title: "Socket 学习"
published: 2025-05-07
updated: 2025-05-07
description: "Socket 编程入门：C/S 与 B/S 架构对比、TCP 握手与挥手、IP 和端口、套接字类型，配 Python 服务端客户端代码和端口扫描。"
tags: ["python"]
category: "python"
slug: "socket-学习"
---

## 一、Web 服务基础

### 1\. 什么是 Web 服务


*   **定义**：一种面向服务的架构技术，通过标准 Web 协议提供服务，实现不同平台应用的互操作。
*   **核心作用**：允许通过网络访问目标服务器上的文件，典型案例：淘宝、百度、京东等平台。

### 2\. C/S 架构 vs B/S 架构

**架构**

**网络环境**

**客户端要求**

**优势**

**C/S（客户端 / 服务器）**

专用网络（局域网）

需要安装专用客户端程序

适合小范围高效数据交互

**B/S（浏览器 / 服务器）**

广域网（互联网）

只需浏览器和操作系统

跨平台性强，部署维护简单

## 二、Socket 编程核心概念

### 1\. TCP 协议特性


*   **连接特性**：面向连接、字节流传输、可靠传输（通过校验、确认、重传机制保证稳定性）。
*   **三次握手与四次挥手**（连接建立与断开过程）：
    *   三次握手：SYN 同步→SYN+ACK 确认→ACK 确认，建立可靠连接。
    *   四次挥手：FIN 请求断开→ACK 确认→FIN 再次请求→ACK 最终确认，释放连接资源。

### 2\. IP 地址与端口号


*   **IP 地址**：标识网络中主机的位置（如`127.0.0.1`为本地回环地址）。
*   **端口号**：标识主机上的进程（范围 0-65535，1-1024 为系统保留端口），用于区分同一主机上的不同服务（如 HTTP 默认 80 端口）。

### 3\. 半相关与全相关


*   **半相关（三元组）**：`（协议，本地地址，本地端口号）`，唯一标识本地进程的网络连接部分。
*   **全相关（五元组）**：`（协议，本地地址，本地端口号，远地地址，远地端口号）`，完整标识两个进程间的网络连接。

### 4\. 套接字（Socket）类型


*   **流式套接字（SOCK\_STREAM）**：基于 TCP，面向连接，保证数据有序可靠（常用）。
*   **数据报套接字（SOCK\_DGRAM）**：基于 UDP，无连接，适合实时性要求高的场景（如视频通话）。
*   **原始套接字（SOCK\_RAW）**：直接操作底层协议，用于网络分析或自定义协议开发（较少用）。

## 三、Socket 编程实战：服务端与客户端

### 1\. 服务端编程步骤（以 TCP 为例）

<a href="/assets/files/网络安全程序设计/任务二-socket/server.py" download="server.py">下载 server.py</a>
```python
import socket

# 1. 创建套接字
sk = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  
# AF_INET：IPv4，SOCK_STREAM：流式套接字（TCP）

# 2. 绑定IP和端口
sk.bind(('127.0.0.1', 8000))  # 本地地址+端口

# 3. 设置监听，等待客户端连接
sk.listen(10)  # 最大排队连接数

# 4. 接受客户端连接
conn, addr = sk.accept()  # conn：客户端套接字对象，addr：客户端地址

# 5. 接收与发送数据
data = conn.recv(1024)  # 接收数据（1024字节缓冲区）
conn.sendall(b'Hello, Client!')  # 发送数据（确保全部发送）

# 6. 关闭连接
conn.close()
sk.close()
```

### 2\. 客户端编程步骤


```python
import socket

# 1. 创建套接字
sk = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 2. 连接服务器
sk.connect(('127.0.0.1', 8000))  # 目标服务器IP+端口

# 3. 发送与接收数据
sk.sendall(b'Hello, Server!')
data = sk.recv(1024)

# 4. 关闭连接
sk.close()
```

## 四、HTTP 协议解析

### 1\. 请求协议格式

```plaintext
请求首行：请求方法（GET/POST等） 请求路径 协议版本（如：GET /index.html HTTP/1.1）  
请求头：键值对形式（如：Host: localhost）  
空行：分隔请求头与请求体  
请求体：仅POST等方法存在（如表单数据）  
```

### 2\. 响应协议格式

```plaintext
响应首行：协议版本 状态码 状态描述（如：HTTP/1.1 200 OK）  
响应头：键值对形式（如：Content-Type: text/html）  
空行：分隔响应头与响应体  
响应体：返回的实际数据（如HTML页面内容）  
```

### 3\. 简单 HTTP 响应示例（服务端代码）
```python
# 正确响应格式需包含完整HTTP头（注意\r\n换行符）
server.send(b'HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nHello World!')
```

## 五、TCP 端口扫描实战

### 1\. 单线程端口扫描

```python
from socket import *

def port_scanner(host, port):
    try:
        s = socket(AF_INET, SOCK_STREAM)
        s.connect((host, port))
        print(f'[+] {port} open')
        s.close()
    except:
        print(f'[-] {port} close')

if __name__ == '__main__':
    setdefaulttimeout(1)  # 设置超时时间
    for port in range(1, 1024):
        port_scanner('127.0.0.1', port)
```

### 2\. 多线程优化（提升扫描速度）

```python
import threading

threads = []
open_num = 0

def port_scanner(host, port):
    global open_num
    try:
        s = socket(AF_INET, SOCK_STREAM)
        s.connect((host, port))
        print(f'[+] {port} open')
        open_num += 1
        s.close()
    except:
        pass

if __name__ == '__main__':
    setdefaulttimeout(1)
    for port in range(1, 9999):
        t = threading.Thread(target=port_scanner, args=('127.0.0.1', port))
        threads.append(t)
        t.start()
    for t in threads:
        t.join()  # 等待所有线程结束
    print(f'\n[*] 扫描完成！共发现 {open_num} 个开放端口')
```