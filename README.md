
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

## 说明
* 错误监控与页面埋点，其实本质上就是监听事件，然后做数据上报，后端将数据存储后，在另一个平台以可视化或图表的方式进行展示。这个项目主要针对的是数据上报部分，不涉及监控平台可视化或图表的开发，目的是更好地理解里面的基本原理。