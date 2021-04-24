# 前言

平时做项目的时候总会遇到一些问题，通常情况下也仅是面向`baidu`编程。事后也做一些笔记，但是我这个人不怎么会整理，很容易丢失！

之前用`vuepress`搭建了一个静态化的网站，好处是傻瓜式，但方便的同时也伴随着`难定制丶样式千篇一律丶发布困难丶版本升级不兼容`等问题。去年6月份，领导信任让我接手`上研产品线`写了一段时间`nuxt`对这种前端服务端渲染还是比较感兴趣，遂决定边学习边用`nuxt`重构自己的网站

## 技术栈

+ web
  + `nuxt` + npm社区第三方依赖如`svg-loader`

+ admin
  + `vue + vue-router + vuex` + npm社区第三方依赖如`element-ui`

+ server
  + `node.js + express + mongoose` + npm社区第三方依赖如`cors`

## 项目运行

项目采用`yarn + lerna`(lerna当前没使用)管理包重复问题
