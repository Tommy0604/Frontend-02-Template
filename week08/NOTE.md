# 重学HTML

HTML的定义：XML与SGML


## 随堂笔记

### 合法元素

Element: \<tagname>...\</tagname>
Text: text
Comment: \<!--comments-->
DocumentType: \<!Doctype html>
ProcessingInstruction: \<?a1?>
CDATA: \<![CDATA[]]>

字符引用

\&#161; 代表
\&amp; 代表and符 “&” 
\&lt; 代表左尖括号“<”
\&quot; 代表双引号 "

- 基于Node的导航类
  - parentNode：父节点
  - ChildNodes：子节点
  - firstChild:第一个子节点
  - lastChild：最后一个
  - nextSibling：下一个邻节点
  - previousSibling：上一个邻节点
- 基于Element的导航类（意义基本与Node节点一样）
  - parentElement
  - children
  - firstElementCHild
  - lastElementChild
  - nextElmentSibling
  - previousElementSibling

- 修改类
  - appendChild：添加一个子节点
  - insertBefore：添加一组字节点
  - removeChild：删除一个子节点
  - replaceChild：替换一个子节点
- 高级
  - compareDocumentPosition：比较两个节点的关系
  - contain：检查一个节点是否包含另一个节点
  - isEqualNode：检查两个节点是否完全相同
  - isSameNode：检查两个节点是否是同一节点
  - cloneNode：复制一个节点，如果入参是true，则会连同子元素做深拷贝

***

### Range API

>Range Api在操作Dom时一般是以一个范围为主，在操作Range之前需要给予Range起始点与终止点。因此Range可以在Dom树上选择任意一段。

简单的例子：

``` js
var range = new Range()
range.setStart(element,9)
range.setEnd(element,4)
var range = document.getSelection().getRangeAt(0)
```

API:

range.setStartBefore
range.setEndBefore
range.setStartAfter
range.setEndAfter
range.selectNode ：与node节点api类似，选中单个节点
range.selectNodeContents ：选中一个元素的所以的内容

取出Range里的内容：
var fragment = range.extractContents()
在Range的位置插入新节点：
range.insertNode(document.createTextNode("asd"));

小例子：

``` js
<div id="a">123<span style="background-color:pink;">45678</span>0123456789</div>
<script>
  let range = new Range();
  //这一步定位到了 <span>开始标签 后面的第0个位置，也就是 <span>标签 内容开头的位置："4"
  range.setStart(document.getElementById('a').childNodes[1], 0);
  //这一步定位到了 </span>结束标签 后面的第3个位置："3"
  range.setEnd(document.getElementById('a').childNodes[2], 3);
  range.extractContents()
  // 1233456789
</script>
```

这里虽然range区间包含了`</span>`，替换掉之后，会"创建"一个新的`</span>`结束标签

**range会截取空格符和回车符**所以需要用到 `range` 相关API。

### CSS OM

>CSSOM是对CSS文档的一个抽象

通过 `document.styleSheets` 属性去访问CSSOM

有两种方式生成 `CSSOM` ：

- 一种`style`标签
- 一种`link`标签(data uri)

`styleSheets`类似一个数组，数组的每一项都对应一个 `CSSOM`
`styleSheets`属性里面有 `Roles` 属性，对应的是一组 `Rule`

有一组API可以操作这组 `Rule`：

``` js
document.styleSheets[0].cssRules
document.styleSheets[0].insertRule("p { color: pink;}", 0)
document.styleSheets[0].removeRule(0)
```

之前有了解 `Rule` 分为 `cssRule` 与 `at-Rule`，at-Rule 是用来辅助 cssRule 的。
Rule 有多少种 `styleSheets[0].cssRules` 就有多少种。

尝试用CSSOM来修改元素样式：

``` js
document.styleSheets[0].cssRules[0].style.color = 'blue';
```

#### getComputedStyle

>getComputedStyle不光可以获取元素的属性，还可以获取伪元素属性

window.getComputedStyle(elt,pseudoElt)

- elt 想要获取的元素
- pseudoElt 可选，伪元素

``` js
window.getComputedStyle(document.querySelector("a"), "::before").color
```

**`getComputedStyle` 获取的是浏览器CSS渲染之后的最终结果**

用于 CSS动画、transform、拖拽，获取中间值

#### CSSOM View

layout

>用来获取元素生成(render)盒之后的相关数据,数据主要是盒的坐标、宽高、偏移

API

getClientRects() ：获取一个元素生成的所有盒
getBoundingClientRect() ：获取一个元素的盒

### API分类
