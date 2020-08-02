# week05

## CSS计算（CSS computing）

>解析CSS需要对CSS进行词法和语法分析

解析这部分比较复杂，需要考虑到众多因素（`link`请求，`Import`引入等），这里只考虑CSS文本，借用了`npm CSS`库，来解析`CSS`。

通过`css.parse`方法来获得`AST`[抽象语法树](https://zh.wikipedia.org/wiki/%E6%8A%BD%E8%B1%A1%E8%AA%9E%E6%B3%95%E6%A8%B9)

`parse`方法生成出的数据结构参考[CSSparse](https://www.npmjs.com/package/css#example-1)

## CSS 优先级

!important > 行内样式 > ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性

- specificity
  - selector 的"专指"程度高低
  - 四元组 [ `inline`, `#id`, `.class`, `tag` ]
  - 比较大小的规则是从高到底逐级比较，有结果后忽略更低级别的数值
  - 参考资料 [specifishity.com](https://specifishity.com/)
