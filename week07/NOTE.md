# Week07学习笔记

## 及时笔记

HTML代码中可以书写开始__Tag__，结束__Tag__ ，和自封闭_Tag___ 。

一对起止__Tag__ ，表示一个__Element__ 。

DOM树中存储的是__Element__和其它类型的节点（Node）。

CSS选择器选中的是__Element__ 。

CSS选择器选中的__Element__（**或伪元素**），在排版时可能产生多个__Box__ 。

排版和渲染的基本单位是__Box__ 。 //💀这里填错了应该是Box，之前认为基本单位是元素

很多元素会产生多个 盒 ，行内（inline）元素就会产生多个盒，被伪元素选中的元素也会产生多个盒。

[盒模型](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model)

*****

### 正常流

>正常流是一种符合“现代人”书写直觉的排版方式。正常流分为行内格式上下文(IFC)和块级格式上下文(BFC)

#### 行内&块级排布

行内格式上下文(IFC)

横向排布，以前使用float浮动布局，现在不建议使用了，会发生页面重排。现在使用flex排版更方便。

纵向布局，块级格式上下文[BFC](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)，`BFC`只出现在正常流，正常流只有`BFC`会发生边距折叠。

#### BFC

BFC分三种：
`Block Container`:里面有 BFC
`Block-level Box`:外面有 BFC
`Block Box` = `Block Container` + `Block-level Box`

`overflow` 属性可以清除 `BFC` 用 overflow: hidden。但是只对作用于该元素及其子元素影响。外面对元素不受影响。
同时也可以生成 `BFC` overflow 值不为 visible 的块元素;
更多会创建 `BFC` 的方式可以参考: [https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

### CSS 动画

- CSS 样式表现属性分类

  - 控制位置、尺寸
  - 控制绘制、渲染
  - 交互与动画

- Animation

  - 用 `@keyframes` 定义
  - `animation:` 属性
    - `animation-name` - 引用 keyframes ，并包含其他参数
    - `animation-duration` - 时长
    - `animation-timing-function` - 时间曲线
    - `animation-delay` - 开始前的延迟
    - `animation-iteration-count` - 循环次数
    - `animation-direction` - 方向

- Transition

  - `transition-property` - 要变换的属性
  - `transition-duration` - 时长
  - `transition-timing-function` - 时间曲线
  - `transition-delay` - 延迟

- 时间曲线
  - [cubic-bezier](https://cubic-bezier.com/)
  - 演示用 bezier 曲线拟合抛物线
  - 可用于模拟摩擦、回弹等视觉效果

### CSS 动画与绘制: 颜色

- 色彩理论
  - 3 种视锥细胞分别负责感受 3 原色的强度
  - 自然界混合色光，被视锥细胞分解成 RGB 3 个强度的组合来感知
  - C, M, Y 分别是 R, G, B, 的补色，颜料 3 原色是减色混合
  - HSL - Lightness 有符号，负值变暗，正值变亮
  - HSV - Value 无符号，0 是最暗，最大值是最亮