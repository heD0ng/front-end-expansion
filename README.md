
## 感谢
* 首先非常感谢此作者（[vue3-antd-admin](https://github.com/llyyayx/vue3-antd-admin)）的开源贡献，具体详细的使用可以参考此仓库文档说明。

## 简介
* 本仓库主要是针对前端开发工作做一些拓展性工作，如前端异常监控，页面埋点以及性能监控等等。

## 安装使用

```
# 克隆项目
git clone https://github.com/heD0ng/front-end-expansion.git

# 客户端部分

# 安装依赖
npm install

# 本地开发 启动项目
npm run dev

# 服务端部分

cd errorServer

npm install

nodemon/node index.js
```


## 异常捕获部分代码

* 代码路径：cd src/utils/error.ts
* 后端路径：cd errorServer

## 页面埋点

* 代码路径：cd src/utils/page.ts
* 后端路径：cd pageView

## 问题记录

### 为什么要重写history事件？
* 因为在window上，利用addEventListener并不能监听到history事件，但是在vue-router中实际上是利用其跳转的，所以重写history事件，确保可以正常监听，然后进行数据上报；

### Vue(React)错误上报

* 本项目的错误处理并没有包括console.error、vue.config.errorHandler、errorBoundry，如果需要上报这些，需要在Vue或React中单独处理，本项目只针对于JS的错误处理。另外，这里需要注意的是，在Vue中必须配置vue.config.errorHandler才能使得window.error才能生效。


## 说明
* 错误监控与页面埋点，其实本质上就是监听事件，然后做数据上报，后端将数据存储后，在另一个平台以可视化或图表的方式进行展示。这个项目主要针对的是数据上报部分，不涉及监控平台可视化或图表的开发，目的是更好地理解里面的基本原理。

## 现有功能

* [x] 错误监控
* [x] pv、uv
* [x] 性能监控
* [x] 埋点SDK(未上传到github，感兴趣可私聊)
* [ ] 性能优化实践
* [ ] 骨架屏
