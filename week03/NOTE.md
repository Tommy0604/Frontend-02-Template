# 第三周-学习笔记

## 运算符和表达式

> 在`JavaScript`的标准中运算的优先级，是由[“产生式”](https://u.geekbang.org/lesson/17?article=253495&gk_cus_user_wechat=university)来描述的。

比如 1+2*3 会先运算`*`两边的数值，四则运算里的括号也可以改变优先级，例如：

``` javascript
function a(){
    return 1;
};

function b(){
    return 2;
};

(3+a()) * b(); // 8
```

### 表达式（Expressions）

#### Member

运算符优先级最高，典型的`Member Expressions`运算有：

* a.b
* a[b]
* foo\`string\`
* super.b
* super.['b']
* new.target
* new Foo()

_new Foo() 优先级高于 new Foo_

#### Call

`Call Expressions`函数调用,典型的函数调用有：

* foo()
* super()
* foo()[\`b\`]
* foo().b
* foo(\`abc\`)

`Call Expressions` 的优先级要低于`new`和`Member`运算。

用个例子来证明这句话是对的：

``` javascript
new a()['b']
// 执行顺序
//1. new a
//2. new a()
//3. new a()['b']
```

这句话的意思是，先获取a的实例，再获取实例a中的属性b。

#### Left Handside & Right Handside

Example:

``` javascript
a.b = c; // 左运算
a + b = c; // 右运算
```

可以下一个结论"左运算以外就是右运算"，已知的右运算有乘方

``` javascript
2**3**2
```

#### Update

* a++
* a--
* --a
* ++a

#### Unary

* delete a.b
* void foo();
* typeof a
* +a
* -a
* ~a
* !a
* await a

*****

## Realm

>Realm的概念：ECMAScript代码运行之前会与一个叫Realm的“域”关联。“域”的组成是由一组内置对象、一个ECMAScript宿主对象、和在该全局环境下加载的所有ECMAScript代码，以及相关状态和资源组成

[ecma-262-Realm](http://www.ecma-international.org/ecma-262/11.0/index.html#sec-code-realms)

内置对象又分为：固有对象，原生对象，普通对象。
宿主对象：window、global。

获取所以固有对象：

``` javaScript
var set = new Set();
var objects = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect];
objects.forEach(o => set.add(o));

for(var i = 0; i < objects.length; i++) {
    var o = objects[i]
    for(var p of Object.getOwnPropertyNames(o)) {
        var d = Object.getOwnPropertyDescriptor(o, p)
        if( (d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
            if(!set.has(d.value))
                set.add(d.value), objects.push(d.value);
        if( d.get )
            if(!set.has(d.get))
                set.add(d.get), objects.push(d.get);
        if( d.set )
            if(!set.has(d.set))
                set.add(d.set), objects.push(d.set);
    }
}

```