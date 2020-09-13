# 学习笔记

## Proxy

>浏览器新增内置对象，一个 Proxy 对象包装另一个对象并拦截诸如读取/写入属性和其他操作，可以选择自行处理它们，或者透明地允许该对象处理它们.

`Proxy` 对象与普通对象的区别在于，`Proxy` 对象不管是修改已有属性，还是新增属性都会得到一个不一样的值。

``` js
 let po = new Proxy(obj, {
    set(obj, prop, val) {
      console.log(obj, prop, val);
    }
  })
```

[更多关于Proxy](https://zh.javascript.info/proxy),[以及Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

## vue双向绑定

和描述一样 `Proxy` 可以代理一个对象并且做一些操作。
行为上与 `TypeScript` 的 `getter setter` 类似，但是 `TypeScript` 是基于 `Object.defineProperties` 方法实现的。

[proxy](proxy.js)

[reactive](reactive.js)

### reactivity作用

>reactivity 可算作一个办成品德双向绑定

- 很明显 `reactivity` 里用 `Proxy` 实现数据监听读写操作，只需要给dom元素赋予初始值，并添加事件监听就能实现双向绑定
  - 添加 effect 动作，实现 reactive 对象数据变更时通知 DOM
  - 添加 DOM 元素事件监听，实现 DOM 对象内容变更时更新 reactive 对象

[reactivity实践代码](./x.html)

## 用 Range 对 DOM 进行精确操作

- 实现基本拖拽
  - 在 mousedown 事件响应函数体当中才开始启用 mousemove 和 mouseup 监听
  - mouseup 响应函数体：负责把 move 和 自身 两个事件响应函数从 document 的事件响应函数中移除
  - mousedown 响应函数中记录事件坐标，即此次拖拽动作的起始位置坐标
  - mousemove 响应函数体：把元素 translate 到 (mousemove 事件坐标) 与 (mousedown 事件坐标) 之差
  - 多次发生拖动动作，起始时元素的 translate 值已包含上次拖动后的偏移量，造成被拖动元素脱离鼠标位置
    - 解决办法：在 mouseup 时记录本次拖拽结束的位置(放在事件响应函数作用域外，在多次拖动之间保留值)，下次拖动时 translate 参数改为 (上次结束位置 + (mousemove 事件位置 - mousedown 位置) )
  - [代码](./dragTransform.html)

- 实现拖拽元素进入段落内部
  - 列举段落内可以插入元素的位置 - 在段落头尾和每个字符之间创建 Range
  - 应用 CSSOM 的 getBoundingRect() 取到各 Range **当前渲染位置** 对应的矩形 - 坐标在两个字符实际排版位置之间，宽度为0
  - move 事件响应函数中，计算与目标位置距离最近的 Range，调用 range.insertNode() 把拖动中的元素移入
  - [代码](./dragRange.html)