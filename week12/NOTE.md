# 学习笔记

## 组件化基础知识

- 前端架构两大话题：组件化，架构模式
  - 组件化，扩展 HTML 标签，目标是提高复用率，降低开发者的心智负担
  - 架构模式，例如 MVC, MVVM 等，关注点是 UI 与数据逻辑之间的交互方式

>组件化，扩展 HTML 标签，目标是提高复用率，降低开发者的心智负担

组件既可以理解为对象又可以理解为模块

对象与组件

- 对象
  - Properties 属性
  - Methods 方法
  - Inherit 继承关系

- 组件
  - Properties
  - Methods
  - Inherit
  - Attribute - 用法是通过 markup 向组件传入信息，区别于通过对象的 property / method 读写信息
  - Config (构造参数) & State (运行期间状态)
  - Event - 向组件使用者传递信息
  - Lifecycle - 组件生命周期
  - Children - 组成树形结构

## JSX基本使用

组件由 markup 与 js 代码构成

演示支持 JSX markup 的组件开发

- 准备开发环境
  - node init # 创建项目
  - npm i -g webpack webpack-cli # 全局安装 webpack 命令行
  - 进入项目目录，npm i -D babel-loader @babel/core @babel/preset-env webpack
  - 创建 webpack.config.js 并引入 babel-loader 处理 .js 文件，采用 preset-env 预设配置 babel-loader
- 实现通过 JSX 语法定义组件
  - JSX 语法代码直接编译不能通过
  - 错误信息中提示可以配置 @babel/plugin-syntax-jsx (https://git.io/vb4yA)
  - npm i --save-dev @babel/plugin-transform-react-jsx - JSX 语法被转译为 React.createElement 函数调用
  - 给 @babel/plugin-transform-react-jsx 插件配置 pragma 选项，指定改为调用别的函数
  - 实现自定义的 createElement 函数，根据传入的参数，实际创建 DOM 节点树
  - 当 JSX 中出现非 HTMLElement 的节点类型名，createElement 函数的参数将传入自定义类型标识符
  - 扩展 createElement 实现，遇到自定义节点类型时创建对应的类对象，类内实现创建 DOM 节点树所需的接口方法
  - 通过以上步骤，可以实现添加代码逻辑扩充组件的行为，从而实现通过 JSX 语法引入自定义组件

