# 面试八股文
## HTML
### `<!DOCTYPE html>` 的作用
::: demo
<!DOCTYPE html>唯一作用是将启用标准模式,在以前更早的标准中可能会有其他的意义,但是现在只有区分标准模式和怪异模式的用途
:::
### 元数据内容有哪些 [参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Content_categories#%E5%85%83%E6%95%B0%E6%8D%AE%E5%86%85%E5%AE%B9)
::: demo
`base、link、script、meta、style、noscript、title` 标签
:::

### 页面导入样式 link 和 `@import` 的区别
::: demo
1. `link` 的兼容性比 `@import` 好
2. 加载顺序,先加载 link 标签,后加载 `@import`
:::

### title 和 h1 b 和 strong, i 和 em 区别
::: demo
`title` 是整个网页的标题,概括了网页的信息,可以告诉搜索引擎或者用户,我们网页的内容主题是什么
`h1` 也是标题标签,但是更常用于文章的标题

`b` 物理标签,用来给文字加粗,只有文字加粗样式效果
`strong` 语意标签,用于强调字符语气（在一些无障碍网页阅读时,语气会中一些）

`i` 物理标签,只是样式倾斜
`em` 语意标签,有强调的语气

`strong` 和 `em` 都有利于`seo`优化

语意标签还有 `del ins address`
:::

### img 标签`title`和`alt` 区别
::: demo
1. `title` 是鼠标悬浮在图片上显示的文字, `alt` 是图片加载失败显示文字
2. `alt` 更有利于 seo查询
:::

## H5
### 什么是语义化标签
::: demo
用于进行网页构建的标签,他们不会影响页面效果,只是对网站页面结构规范化。
优点：
1. 利于`seo`优化,更容易被爬虫抓取
2. 可阅读性和维护性更高
缺点：
不支持 `IE8` 及以下浏览器,需要使用 `htmlshiv.js` 兼容
:::

### 什么是自适应
::: demo
自适应浏览器更具用户设备,分辨率,尺寸等因素自动调整网页的布局和内容展现方式。
:::
### 什么是响应式
::: demo
响应式是一种网页设计布局,更具不同的浏览器环境展现相对应的布局。
:::

## CSS
### 单冒号和双冒号区别
::: demo
单冒号是伪类,双冒号是伪元素。当然伪元素也可以用单冒号和双冒号都可以,规范使用双冒号。
:::

### `em` 和`rem`区别
::: demo
`em` 是针对父元素的 `font-size`, `rem` 是针对于根元素的 `font-size`
:::

### `CSS` 盒子模型
::: demo
有两种盒子模型
1. 标准盒子模型组成 `margin、border、padding、content`
2. 怪异盒子（`IE`盒子模型） `margin、content` （`border、padding、content`）

且可以使用 `CSS` 进行转换
  `box-sizing`: `border-box` 转为`IE`盒子
  细节： 当`padding`大于等于宽度或高度时会将`content`撑大,小于时盒子大小以宽度高度为准
  `box-sizing`: `content-box` 转为标准模型
:::

### line-height 和 height 区别
::: demo
`line-height` 规定每行文字高度,行数越多盒子高度越大,没有定义`padding、margin、border`时 盒子高度等于 行高 * 行数
`height` 规定盒子基础高度,在标准盒子模型中没有`padding、margin、border`时 `height` 定义的值就是盒子高度,在`IE`盒子模型中 只要`padding`和`border` Y轴方向值相加不大于高度那么该盒子高度为 `height` 定义的值
:::

### 选择器
::: demo
常用的
通配`（*）`id`（#）`class`（.）`标签`（div）`后代`（div span）`子集`（div > span）`相邻`（div span + span）`属性`（a[href]）`

优先级
`!important` > 内联 > `id` > `class` > 标签 > 通配
:::

### BFC规范（全称 block formatting content）块级格式化上下文
::: demo
理解：`BFC` 主要是页面上隔离的独立容器,容器里面的子元素不会影响到外部元素
原则：如果一个元素具有`BFC`条件,那么它自身内部元素再怎么变换也不会影响到外部元素
创造`BFC`条件：
  使用 `overflow`
  `float` 值非`none`
  `position` 绝对地位
  `display` 值设置为,`inline-block、table-cell`等
:::

### IFC规范（全称 inline formatting content）行内级格式化上下文
::: demo
什么是`IFC：`行内级格式化上下文用来规定行内级盒子的格式化规则
创造`IFC`条件：
  `IFC` 只有在一个块级元素中仅包含内联级别元素时才会生成。
布局规则：
  内部的盒子会在水平方向上一个一个排列,这些盒子垂直方向的起点是顶部开始
  摆放这些盒子的时候,每个盒子水平方向的`padding、margin、border`都会被计算在内
  垂直方向上可以使用 `vertical-align` 进行对齐
:::
### 雪碧图优缺点
::: demo
优点：减少`http`请求
缺点：维护比较差,例如图片位置更改或者进行修改
:::
### 用户从浏览器输入地址后发生了什么？
::: demo
***前话 浏览器会根据你输入的部分地址,然后去读取缓存,缓存中存在和你输入的地址相仿的则会再地址栏下方提示,如果没有则不提示
输入完成后,会效验地址是否合法,不合法则会使用默认引擎去搜索该字符串***

1. 浏览器解析`URL`
<img src="/4615dcc00d8f9e4758565335a0fd1fc69b5cd6.png" width="300px" style="display: block"/>
浏览器首先对于 `URL` 解析出,协议、域名、端口（http为`80`,https为`443）、`路径、参数

2. 域名解析
<img src="/5.8eb24cb5.jpg" width="500px" style="display: block"/>
首先询问浏览器 DNS 缓存,缓存中没有在向本地`Hosts`文件中查找,再去本地 DNS 解析缓存器中,最后在向本地 DNS 服务器发起请求（这段查询是递归查询, 这个过程中任何一步找到了都会结束查找流程。）

**以上都没找到时**
<img src="/464291-20170703113844956-354755333.jpg" width="500px" style="display: block"/>

[参考](https://www.cnblogs.com/crazylqy/p/7110357.html)
本地 `DNS` 服务器将进行迭代查询`IP`,先查询`DNS`根服务器,根服务器则会返回一个域服务器地址,再去查询域服务器地址,域服务器会返回一个 域名解析服务器地址,告诉本地`DNS`服务器你可以去 域名解析服务器上去查询,最后查询域名解析服务器,这时域名服务器会返回`IP`信息,本地`DNS`服务器会将`IP`返回给用户电脑,还需要将对应关系缓存,以便于用户下次查询,直接返回结果,加速网络访问。

3. 建立`TCP`链接（三次握手）
<img src="/a6f70b382c00204eb05533e7db14749bfc1ee9.png" width="500px" style="display: block"/>

客户端向服务器发送 `SYN` 报文段请求连接 （客户端进入 `SYN_SEND` 状态）
服务器收到返回 `ACK + SYN` 报文段响应 （服务端进入 `SYN_RECV` 状态）
客户端在向服务器发送 `ACK` 报文段确认 (服务器客户端都进入 `ESTABLISHED` 状态)
最后进行数据传送
4. HTTP请求
<img src="/48620b3877f3b021a3a1971ce408ea3ffe4c94.png" width="500px" style="display: block"/>

建立连接后就进行数据通信过程,客户端发送`HTTP`请求报文到服务器。
**报文包括：请求行（方法：GET、POST等,资源路径,HTTP版本）、请求头、请求空行（标识请求头结束）、请求体。**

5. 服务器对请求做出响应,返回响应报文
<img src="/b53740e96792999a213656c99bbb1ddbcf96c5.png" width="500px" style="display: block"/>

收到客户端的请求报文后,服务器将对请求报文做相应的处理,然后返回响应报文。例如：客户端送请求报文想获取 index.html 文件信息,服务器则会去找相应的`index.html`文件,然后作为响应报文中的响应体返回给客户端。
**响应报文包括：响应行（HTTP版本,状态码,状态码描述）,响应头,响应空行（标识响应头结束）、响应体**

6. 浏览器解析渲染页面
通过请求获取到的`HTML`文件,获取代码后,浏览器在内存中开辟一块栈内存,给代码执行提供环境,同时分配一个主线程一行行解析和执行代码。

<!-- 此时的`HTML`文件还是字节,将字节转换为字符,此时的字符也就是我们编写的`HTML`代码,机器是看不懂的,在将字符`Token`化（Token化,其实是将字符标签转换为 起始标签和结束标签）,Token化之后在转换为节点对象,将节点对象连接在一起形成一个文本对象模型也就是`DOM`树 -->

**link/script/img/video请求后都会单独开辟一个新线程加载资源文件**
解析到了 link、script 等需要引入外部资源标签时会单独开辟新的线程进入任务队列去请求相应的资源文件,此时解析会继续向下执行
当`header`中存在`script`是会阻塞解析,会等`script`执行完成时在进行解析。
当遇到 style 内嵌样式时会等待所有的外部 CSS 资源下载完成,生成 CSSOM。
HTML 所有解析完成后,开始生成 DOM 树,在将`DOM`树和`CSSOM`进行结合生成 Render Tree（渲染树）,
根据生成的渲染树计算设备视图内确切的位置和大小（重排或者回流）
根据重排得到的几何信息得到节点的绝对像素（重绘）
将像素发送给`GPU`进行绘制,展示在页面


7. 断开 TCP 连接（四次挥手）
<img src="/253d33173161ef7707f4465bb9299f4f6649d3.png" width="500px" style="display: block"/>

客户端向服务器发送 `FIN` 报文段请求断开连接（客户端进入 `FIN_WAIT_1` 状态）
服务器收到客户端的 `FIN` 报文端后,服务器返回 ACK 报文段确认响应 （客户端进入 `FIN_WAIT_2` 状态）
服务器向客户端发送 `FIN` 报文表示将关闭连接 （服务端进入 `LAST_ACL` 状态）
客户端收到服务端的 `FIN` 报文段后发送 ACK 报文段确认关闭连接 （服务端进入 `TIME_WAIT` 状态）。客户端延时 1,`2MS` 后关闭连接
:::

### 性能优化
::: demo
- 减少`HTTP`网络请求次数和大小
- - 开启服务器的 `gzip` 压缩
- - 资源合并和压缩
- - 音视频就流文件（流文件只需要返回一部分,DOM就可以继续往下处理）
- 尽可能避免回流
- - 放弃传统的操作`dom`,使用 vue和`react` 因为他们使用了虚拟`dom`以及`diff`算法,很大程度上减少了重绘和回流
- - 分离读写,现代浏览器基本都有渲染队列机制,同一时间内,多次修改`dom`样式只会执行一次回流。但是你多次修改中读取`dom`属性,那么会格外增加回流次数。`（读取 dom 的 offset(top/left/width/height)、client(top/left/width/right),scroll(top/left/width/height)、currentStyle` 等属性会刷新渲染队列）
- - 动画效果能用`transform、opacity` 就不使用其他,因为 `transform、opacity` 可以开启 `GPU` 加速,不会引发回流和重绘
- - 动画中牺牲平滑度换区速度
- 将`script` 标签写在 body 后面,或者加上 `async` 或者 `defer`
- 善用缓存,使用缓存时应避免缓存 `html` 文件
- 按需加载
- - 组件路由懒加载
- - 图片懒加载
:::

### 重绘和回流
::: demo
回流（Reflow）：元素的大小或者位置发生改变会触发回流
重绘（Repaint）：元素位置和大小不变 其他样式发生改变触发重绘

回流一定触发重绘,重绘不一定触发回流
:::

## JS
### `[2,3] + [1,2]`值
::: demo
2,31,2
:::
### null 和 undefined 区别
::: demo
1. `typeof` `null` 是对象,而`undefined`是`undefined（null`原始类型是引用类型,`undefined` 是基本类型）
2. `Number` 转换 `null` 是 `0,undefined` 是 `NAN`
3. 设计先后顺序,先有`null` (作者借鉴了`JAVA`所有先设计的`null`, 后面因为`null`会被隐式转换0,所以后面设计了`undefined)`, 后有`undefined`
:::

### 那些是宏任务,那些是微任务
::: demo
宏任务：`setTimeout、setInterval`、[requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)（执行动画函数）
微任务：`Promise.then catch finally`	、[MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)（监视`DOM`改变函数）
:::

### 判断数组方式
::: demo
1. 使用 `Array.isArray`
2. 使用 `Object.prototype.toString.call([1,2]),call([1,2])` 中为对象类型会转换为 `[object object]` 而数组转换为 `[object array]`
3. 判断构造函数, `[].constructor.toString()` 为 `'function Array() { [native code] }'`
4. `[] instanceof Array`
5. `Array.prototype.isPrototypeOf([11])`
:::

### slice 和 splice
::: demo
`slice` 主要是用于截取数组,不会改变原数组,返回新数组
`splice` 用于删除,插入,替换,会改变原数组,返回删除的元素
:::

### 作用域
::: demo
1. 作用域内部可以访问外部变量,但是外部不能访问内部变量
2. 优先级：内部有同名的变量,优先访问内部,再去访问外部
3. **优先级：声明变量 > 声明普通函数 > 参数 > 变量提升**
```javascript
var a = 1
function b(e) {
  console.log(c) // c() {}
  function c() {
    console.log(d) // undefined
    var d = 1
  }
  console.log(e) // 123
  var e = 1
}
console.log(b(123))
console.log(a) // 1
```
:::

### var、let、const的区别
::: demo
共同点：都是可以创建一个变量
不同点：
1. `var`可以被变量提升,`let、const`不可以
2. `let、const`存在自身作用域,只能在作用域内使用,`var`则不存在
3. `let、var`可以直接使用等号赋值修改,而`const`不可以
4. `var`在同一个地方可以声明多个同名称的变量,而`let、const`不可以
:::

### 合并对象方法
::: demo
1. 使用 `es6` 中 `Object.assign` 函数
2. 使用展开操作符 ...
3. 封装函数
```javascript
let a = {a:1,b: 3}
let b = {b:2,c: 3}
const _a = (target, source) => {
  for(let key in source) {
    target[key] = source[key]
  }

  return target
}
_a(a, b)
```
:::

### 箭头函数和普通函数区别
::: demo
1. 箭头函数`this`指向区别,箭头函数中的`this`指向为外层第一个普通函数
2. 箭头函数的`this`在定义时就已经决定了,而函数的`this`是在调用时去寻找的
3. 箭头函数`this`不能修改（不能使用`call、bind、apply）`
4. 箭头函数没有原型`（prototype）`
5. 箭头函数没有 `arguments` 对象
6. 箭头函数不能使用 `new`

细节：
```javascript
const a = {
  b: function() {
    return function() {
      console.log(this) // this 指向`window`
    }
  }
}
a.b()()
// 因为在`a.b()`调用的时候是返回函数体,也就相当于如下函数,在进行调用,那么`this`为`window`
function() {
  console.log(this) // this 指向`window`
}
```
:::
### find 和 filter区别
::: demo
返回内容不同, `filter` 返回匹配上的浅拷贝新数组,如果都没有匹配上则返回空数组, `find` 返回数组中最近所匹配的浅拷贝内容,都没有匹配则返回`undefined`
:::

### bind、call、apply区别
::: demo
#### 共同点
都是改变函数的 `this` 指向
#### 不同点
1. 执行：`call、apply`都是立即执行,`bind` 则需要再加上括号调用才能立即执行
2. 参数：`call、bind`除去第一个参数后面参数都是罗列形式,`apply`只有两个参数,第二个为数组类型
3. 返回：`call、apply`调用后都是返回 `undefined` 而 `bind` 返回函数体
:::

### new 操作符做了什么
::: demo
1. 创建一个空对象 <!-- （使用 var obj = {} 或者 Object.Create({})） -->
2. 将空对象的原型指向构造函数原型（注意这里是原型,不是构造函数 `new Foo()` 时返回的是构造函数）<!-- 使用 Object.setPrototypeOf() 改变原型 -->
```javascript
function Foo() {}
console.log(Foo.prototype === new Foo().__proto__)
```
3. 将空对象作为构造函数上下文（改变`this`指向）<!-- 使用 foo.apply(obj, args) 改变`this`指向 -->
```javascript
function Foo() {
  console.log(this) // 当作为函数调用时（Foo()） this指向全局 Window, 作为类 new 时（new Foo() ）this 指向自身
  this.name = "Foo"
}
```
4. 做返回值判断
```javascript
function Foo() {
  this.name = "Foo"
  return 11. // 返回基本类型时 忽略返回值 返回引用类型时 new 操作符不生效。
}
```
:::

### 闭包
::: demo
1. 什么是闭包
在 `MDN` 上描述为,一个函数以及其捆绑的周边环境状态的引用组合。
简单来说,就是一个内部函数可以访问到外部函数的作用域。
2. 闭包缺点
变量会驻留在内存中,造成内存堆积,不会被垃圾回收机制进行回收
:::

### 原型和原型链
::: demo
1. 什么是原型
在 `Js` 中原型是 `prototype` 对象,表示类型之间的关系,这个就是原型。
原型解决了属性和方法的共享的问题
2. 什么是原型链
原型也有自己的的原型,当原型指向到 `Object` 对象时,就形成了一个原型指向的链条这个就是原型链。原型链的顶端是 `null`
3. 概念
`Js` 分为函数对象和普通对象,函数对象拥有`__proto__`和`prototype`,普通对象只有 `__proto__`。
内置的函数对象是 `Object、Function、Array` 等,他们之间的的 `__proto__` 相等,内置函数属性上的原型为 `Object.prototype`。
`Function` 是最顶层的构造器,`Object` 是最顶层的对象。从原型来说 `Function` 继承 `Object`, 从构造器来说 `Function` 构造了 `Object。`
:::

### 对象注意点
::: demo
1. 当对象把对象作为`key`值实际生成的是 `{[object object]: xxx}`
2. 对象查找属性|方法,对象自身 ===> 对象的构造函数 ===> 对象原型 ===> 对象构造函数原型 ===> Object
:::

### Js 继承方式
::: demo
1. `Class` 使用 `extends` 和 `super()`
2. 原型链继承,将 prototype 改为 另一个对象
3. 使用构造函数继承
```javascript
function Foo() {
  this.name = '西门'
}
function Bar() {
  Foo.call(this)
  this.age = 18
}
const user = new Bar()
console.log(user.name)
```
:::

### localStorage、sessionStorage、Cookie区别
::: demo
1. 存储的时间不同,`localStorage`属于持久化存储,浏览器或者窗口关闭依然存在,`sessionStorage`仅在浏览器窗口未关闭前有效,关闭后清空所有的存储,`cookie`仅在设置的过期时间之前有效,浏览器或者窗口关闭依然存在
2. `cookie`可以设置有效期,而`localStorage`,`sessionStorage`不可以设置有效期
3. 存储数据大小,已 chrome 浏览器举例,`cookie`大小为 4K, `localStorage`、`sessionStorage`大小为 5M
:::

## Vue2

### 生命周期,第一次执行有哪些,第二次执行有哪些
::: demo
默认生命周期：`beforeCreate、created、beforeMount、mounted、beforeUpdate、update、beforeDestroy、destroyed、errorCaptured`（错误捕获）
`keep-alive`新增:` activated、deactivated`

第一次执行为：`beforeCreate、created、beforeMount、mounted`,加入`keep` 缓存组件后`activated`
第二次执行：`activated`
:::

### v-show和`v-if`是干什么？有什么区别？
::: demo
`v-show` 隐藏与显示节点
`v-if` 删除与创建节点

共同点：都可以在控制元素显示隐藏达到视觉效果一致
不同点：`v-if` 主要是删除和创建节点,删除时节点在`dom`树上找不到,`v-show` 主要是对节点的`display`样式更改
:::

### v-if和`v-for` 优先级
::: demo
在 `V2` 中`v-if`的优先级要比`v-for`小
在 `V3` 中`v-if`的优先级要比`v-for`大
:::

### 组件通信,子传父,父传子
::: demo
子传父：`emits`（自定义事件）、`$parent`（调用父级实例,不推荐）
父传子：`props、$refs`（调用子组件实例）
:::

### data 和 props 优先级
::: demo
`props ==> methods ==> data ==> computed ==> watch`
:::
### $data 数据定义在`return` 内和 return 外区别
::: demo
1. 定义在`return` 内是会被`Object.defindProperty`劫持从而会存在 `get/set` 属性,可以通过`this.xx` 修改实现视图刷新
2. 定义在`return` 外部是不会被劫持所以不会存在 `get/set` 属性, 所以初始的时候可以在页面上拿到定义的值,但是你单独修改是不会刷新的。不过你和其他存在 `get/set` 属性的数据一起修改,是可以达到视图刷新的。
例如：
```javascript
handleClick () {
  this.a = xxx // 这里的 a是没有`get/set`的所以更新之后视图不会刷新
  但是你改成
  this.b = xx // b 存在`get/set`
  this.a = xx
  这样的话 a 数据会在视图更改。 因为b会走`get/set` 然后通知视图进行更新。单独一个`this.a` 更改是不会更新的。
}
```
:::
### computed computed 可以直接修改?
::: demo
使用`get/set`写法可以修改 `computed`
```javascript
computed: {
  str: {
    get() {
      return this.string.substring(1)
    },
    set(val) {
      this.string = val
    }
  }
}
```
:::
### computed 可以传参?
::: demo
```javascript
computed: {
  id() {
    return (row) => row.id
  }
}
```
:::
### computed 和 methods 区别
::: demo
`computed` 是计算属性函数
`methods` 是专门用于编写函数的对象

某种情况下`methods`也可以实现一些`computed`的效果。
但是如果你在页面上调用`N`次 `countFun()` 那么`methods` 就会执行多次,因为`methods` 没有缓存机制
但是由于 `computed` 拥有缓存机制,调用多次返回值一样的话,就只会执行一次
```javascript
computed: {
  count() {
    return this.num * this.price
  }
},
methods: {
  countFun() {
    return this.num * this.price
  }
}
```
:::

### 单项绑定
::: demo
`v-model` 为双向绑定
`v-bind` 为单项绑定
:::

## vue-router 路由
### 路由模式有哪些,区别是？
::: demo
路由模式有 `hash` (哈希) `history` (历史记录)
区别:
1. 地址栏地址表现差异,`hase` 使用 `##` 而 `history` 没有 `#`。`history` 刷新打开页面是会向服务器请求的,`hase` 则不会,`hase` 是访问`localhost`
2. 打包后 `hase` 直接从 `dist/index.html` 打开可以查看内容,而 `history` 看不到内容。因为 `hase` 和 `history` 的实现方式不一样
:::

### 路由传值
::: demo
路由传值主要由 `query` 和 `params` 方式
`params` 方式的话 需要通过 `name` 去跳转,不能使用 `path`。 而且对 `path` 路径有要求,假设你 `params` 需要传一个 `id`,那么你的`path`就需要加上 `:id`,否则 `params` 中是没有 `id` 属性的
`query` 方式的话没有要求直接可以传
:::
### $router 和 $route 区别
::: demo
`$router` 包含整个路由的属性和方法,例如 `push` 和 `back。`
`$route` 当前路由对象,这个对象上包含基本路由属性 例如 `path,name,query`等
:::
### 导航守卫
::: demo
导航守卫主要分为三大类,我常用的守卫功能是用于判断身份权限,改用户如果没有这个权限,则不允许进入该路由
1. 全局守卫 `beforeEach` 路由进入前 `afterEach` 路由进入后
2. 路由守卫  `beforeEnter` 某个路由进入前
3. 组件内守卫 `beforeRouteEnter` 路由进入前 `beforeRouteUpdate` 路由更新前 `beforeRouteLeave` 路由离开前
:::

## vuex 状态管理
### Vuex有哪些属性
::: demo
核心属性：
`state` 全局共享状态属性
`actions` 存放函数属性可以包含异步函数,并且提交`mutation`
`mutation` 存放同步函数属性,用于修改`state`中属性值
`getter` 主要是存放对`state`属性值二次计算
`modules` 用于对模块进行划分

辅助函数属性（辅助函数值只能读取不能修改）：
`mapState`
`mapActions`
`mapMutations`
`mapGetter`
:::

### Vuex的`getters`值修改
::: demo
`getter`值是不能修改的
:::

### Vuex持久化存储
::: demo
前端目前的持久化储存方案都是基于`localStorage`进行,所以`vuex`的持久化储存也是先存储到`localStorage`在从`localStorage`读取出来存储到`vuex`
:::
