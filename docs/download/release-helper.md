---
title: 发布助手
article: false

---

# 发布助手

## 软件简介

发布助手用于项目构建产物打包和远程发布，支持多环境配置与回滚。

## 下载版本

| 版本 | 日期 | 平台 | 下载 |
| --- | --- | --- | --- |
| v0.9.3 | 2026-03-02 | Windows / Linux | [/downloads/release-helper-v0.9.3.zip](/downloads/release-helper-v0.9.3.zip) |
| v0.9.0 | 2026-01-15 | Windows / Linux | [/downloads/release-helper-v0.9.0.zip](/downloads/release-helper-v0.9.0.zip) |

## 使用教程

### 1. 准备配置

在 `config.yml` 中填写：

- 服务器地址
- SSH 用户和密钥
- 发布目录

### 2. 执行发布

1. 选择项目目录
2. 选择目标环境（dev / test / prod）
3. 点击“打包并发布”

### 3. 回滚

在“发布历史”里选择某个版本执行回滚。

## 更新记录

### v0.9.3

- 新增发布历史记录
- 支持失败自动回滚

### v0.9.0

- 支持基础打包与发布
