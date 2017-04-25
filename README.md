# angularTemplate

为公司angular项目构建的一套前端自动化系统，避免每次新建项目都要进行复杂的配置

## Introduce

开发
* 本地建站
* 监听文件变化自动刷新浏览器
* 反向代理，避免ajax跨域
* es6实时监测编译
* less实时监测编译

构建
* 将index.html中引入js文件进行合并压缩，并添加版本号
* 将index.html中引入css文件进行合并压缩，并添加版本号
* 压缩template中html
* 复制静态资源文件到dist文件夹


## Install

```bash
npm install gulp -g //全局安装
npm install gulp --save-dev //本地安装并加入package.json
```
## GettingStart
* 开始项目
```bash
npm start
```
在浏览器地址输入localhost:8080打开项目

* 构建项目
```bash
npm build
```
在dist文件夹中就能获取到构建完成的项目
