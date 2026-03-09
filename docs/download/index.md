---
title: 下载中心
outline: false
aside: false
download_config:
  self_developed:
    - id: eqms-bi
      name: EQMS-BI
      icon: 📊
      version: v1.4.3
      description: 企业质量管理系统数据分析平台，提供全面的业务智能分析和可视化报表。
      platform: Windows
      platformIcon: 🖥️
      features: [数据可视化, 报表生成, 数据分析]
      detailUrl: /download/eqms-bi/
      downloadUrl: https://xck-download.oss-cn-hangzhou.aliyuncs.com/EQMS-BI-v1.4.3.exe
      color: green
    - id: release-helper
      name: 发布助手
      icon: 🚀
      version: v0.9.3
      description: 一键打包并发布服务到目标服务器，支持多环境参数模板。
      platform: Windows / Linux
      platformIcon: 💻
      features: [一键部署, 多环境支持, 参数模板]
      detailUrl: /download/release-helper/
      downloadUrl: /download/release-helper/
      color: purple
  open_source:
    - id: git
      name: Git
      icon: 🌿
      description: 分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。
      officialUrl: https://git-scm.com/downloads
      detailUrl: /download/git/
      color: orange
    - id: vscode
      name: Visual Studio Code
      icon: 📝
      description: 轻量级但功能强大的源代码编辑器，支持丰富的插件生态。
      officialUrl: https://code.visualstudio.com/Download
      detailUrl: /download/vscode/
      color: blue
    - id: nodejs
      name: Node.js
      icon: 💚
      description: 基于 Chrome V8 引擎的 JavaScript 运行时环境。
      officialUrl: https://nodejs.org/en/download
      detailUrl: /download/nodejs/
      color: green
---

<script setup>
import DownloadCenter from '../.vitepress/theme/components/DownloadCenter.vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<DownloadCenter 
  :self-developed="frontmatter.download_config?.self_developed || []"
  :open-source="frontmatter.download_config?.open_source || []"
/>
