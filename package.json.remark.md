```json
{
  "name": "vue-element-admin",
  "version": "4.2.1",
  "description": "A magical vue admin. An out-of-box UI solution for enterprise applications. Newest development stack of vue. Lots of awesome features",
  "author": "Pan <panfree23@gmail.com>",
  "license": "MIT",
  "scripts": {
    "dev": "vue-cli-service serve",
    "build:prod": "vue-cli-service build",
    "build:stage": "vue-cli-service build --mode staging",
    "preview": "node build/index.js --preview",
    "lint": "eslint --ext .js,.vue src",
    "test:unit": "jest --clearCache && vue-cli-service test:unit",
    "test:ci": "npm run lint && npm run test:unit",
    "svgo": "svgo -f src/icons/svg --config=src/icons/svgo.yml",
    "new": "plop"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  },
  "keywords": [
    "vue",
    "admin",
    "dashboard",
    "element-ui",
    "boilerplate",
    "admin-template",
    "management-system"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/PanJiaChen/vue-element-admin.git"
  },
  "bugs": {
    "url": "https://github.com/PanJiaChen/vue-element-admin/issues"
  },
  "dependencies": {
      // http ajax 请求
    "axios": "0.18.1",
      // 拷贝文字
    "clipboard": "2.0.4",
      // 在线代码编辑
    "codemirror": "5.45.0",
      // 突出显示页面上的项目,以吸引用户的注意力,用作新手导航等
    "driver.js": "0.9.5",
      // 提供文件的异步上传功能，并支持拖拽上传功能
    "dropzone": "5.5.1",
      // 百度图表工具
    "echarts": "4.2.1",
      // element UI库
    "element-ui": "2.7.0",
      // 客户端保存文件的解决方案，非常适合需要生成文件，或者保存不应该发送到外部服务器的敏感信息的 web App。
    "file-saver": "2.0.1",
      // 基于 JavaScript 的轻量级模糊搜索引擎
    "fuse.js": "3.4.4",
      // 一个简单，轻巧的JavaScript API，用于处理Cookie
    "js-cookie": "2.2.0",
      // 验证js
    "jsonlint": "1.6.3",
      // 创建、读取和编辑.zip文件的JavaScript库
    "jszip": "3.2.1",
      // 使浏览器更一致地渲染所有元素，并符合现代标准。它只针对需要规范化的样式。
    "normalize.css": "7.0.0",
      // 页面加载进度条
    "nprogress": "0.2.0",
      //  url 字符串的正则表达式。
    "path-to-regexp": "2.4.0",
      // 实现全屏功能
    "screenfull": "4.2.0",
      // Markdown到HTML双向转换器！
    "showdown": "1.9.0",
      // 拖拽插件
    "sortablejs": "1.8.4",
      // 所见即所得的Markdown编辑器。
    "tui-editor": "1.3.3",
    "vue": "2.6.10",
      // 数字滚动插件
    "vue-count-to": "1.0.13",
    "vue-router": "3.0.2",
      // 分割面板插件
    "vue-splitpane": "1.0.4",
      // 拖拽 例如：TODO list
    "vuedraggable": "2.20.0",
    "vuex": "3.1.0",
      // 解析操作excel电子表格插件
    "xlsx": "0.14.1"
  },
  "devDependencies": {
    "@babel/core": "7.0.0",
    "@babel/register": "7.0.0",
    "@vue/cli-plugin-babel": "3.5.3",
    "@vue/cli-plugin-eslint": "^3.9.1",
    "@vue/cli-plugin-unit-jest": "3.5.3",
    "@vue/cli-service": "3.5.3",
    "@vue/test-utils": "1.0.0-beta.29",
    "autoprefixer": "^9.5.1",
    "babel-core": "7.0.0-bridge.0",
    "babel-eslint": "10.0.1",
    "babel-jest": "23.6.0",
    "chalk": "2.4.2",
    "chokidar": "2.1.5",
    "connect": "3.6.6",
    "eslint": "5.15.3",
    "eslint-plugin-vue": "5.2.2",
    "html-webpack-plugin": "3.2.0",
    "husky": "1.3.1",
    "lint-staged": "8.1.5",
    "mockjs": "1.0.1-beta3",
    "node-sass": "^4.9.0",
    "plop": "2.3.0",
    "runjs": "^4.3.2",
    "sass-loader": "^7.1.0",
    "script-ext-html-webpack-plugin": "2.1.3",
    "script-loader": "0.7.2",
    "serve-static": "^1.13.2",
    "svg-sprite-loader": "4.1.3",
    "svgo": "1.2.0",
    "vue-template-compiler": "2.6.10"
  },
  "engines": {
    "node": ">=8.9",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
}

```

