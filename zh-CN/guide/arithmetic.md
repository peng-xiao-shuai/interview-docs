# 算法
## diff算法
### diff 基础算法核心
```javascript
// 旧数据和新数据
let oldChildren = [{sel: 'div', key: 'a'}, {sel: 'a', key: 'b'}, {sel: 'h1', key: 'c'}],
    newChildren = [{sel: 'a', key: 'b'}, {sel: 'div', key: 'c'}, {sel: 'div', key: 'd'}, {sel: 'div', key: 'e'}]

// 存储下标 键值为 key值。类型 {[key: string | number]: number}
let oldKeyToIdx = undefined
let idxInOld = undefined

// 声明四个变量分别是，旧前指针变量、新前指针变量、旧后指针变量、新后指针变量
let oldStartIndex = 0,
    oldEndIndex = oldChildren.length - 1,
    newStartIndex = 0,
    newEndIndex = newChildren.length - 1

// 声明新旧节点变量
let oldStartNode = oldChildren[oldStartIndex],
    newStartNode = newChildren[newStartIndex]，
    oldEndNode = oldChildren[oldEndIndex],
    newEndNode = newChildren[newEndIndex]

// 循环
while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
  // 匹配规则
  if (oldChildren[oldStartIndex] == newChildren[newStartIndex]) { // 先匹配旧前和新前
    ... // 逻辑
    oldStartNode = oldChildren[++oldStartIndex]
    newStartNode = newChildren[++newStartIndex]
  } else if (oldChildren[oldEndIndex] == newChildren[newEndIndex]) { // 匹配旧后和新后
    ... // 逻辑
    oldEndNode = oldChildren[--oldEndIndex]
    newEndNode = newChildren[--newEndIndex]
  } else if (oldChildren[oldStartIndex] == newChildren[newEndIndex]) { // 匹配旧前和新后
    ... // 逻辑
    oldStartNode = oldChildren[++oldStartIndex]
    newEndNode = newChildren[--newEndIndex]
  } else if (oldChildren[oldEndIndex] == newChildren[newStartIndex]) { // 匹配旧后和新前
    ... // 逻辑
    oldEndNode = oldChildren[--oldEndIndex]
    newStartNode = newChildren[++newStartIndex]
  } else { // 都不满足

    // 判断是否存在 oldKeyToIdx， while 第一次循环是 oldKeyToIdx 是 undefined
    if (oldKeyToIdx === undefined) {
      // 先获取所有旧数组中下标 用旧数组中 key 为键值 下标为数据值
      oldKeyToIdx = {}
      for (let i = oldStartIndex; i <= oldEndIndex; ++i) {
        const key = oldChildren[i]?.key;
        if (key !== undefined) {
          oldKeyToIdx[key] = i;
        }
      }
    }
    // 查找 oldKeyToIdx 旧 Key 中是否存在 newStartNode（新前节点）key
    idxInOld = oldKeyToIdx[newStartNode.key];
    if (idxInOld == undefined) { // 说明旧中没有新节点的key就创建
      ... // 逻辑
    } else {
      ... // 逻辑
    }
    newStartNode = newChildren[++newStartIndex]
  }
}

// 这一步是匹配新数组中某一项在旧数组中没有
if (newStartIndex <= newEndIndex) {
  for(let i = newStartIndex; i <= newEndIndex; i++) {
    ... // 逻辑
  }
}
// 这一步是匹配旧数组中某一项在新数组中没有
if (oldStartIndex <= oldEndIndex) {
  for(let i = oldStartIndex; i <= oldEndIndex; i++) {
    ... // 逻辑
  }
}

```

### diff算法中的 `vnode` (手写步骤)
<br/>

**1. 定义一个函数生成 `vnode` 数据结构**
<details>
<summary>展开查看</summary>

```typescript
export interface VNodeData {
  class?: string[];
  id?: string;
  key?: string | number;
  [key: string]: any;
}

export interface VNode {
  sel?: string;
  data?: VNodeData;
  children?: VNode[];
  elm?: Node;
  text?: string;
  key: VNodeData['key'];
}

/**
 * 生成虚拟节点结构
 * @param sel 标签名
 * @param data 虚拟节点数据
 * @param children 虚拟节点子集
 * @param text 虚拟节点内容
 * @param elm 真实节点
 * @example
 * vnode('div', {key: 'a'}, undefined, 'Hello World', undefined)
 * @returns {VNode}
 */
export const vnode = (sel, data:VNodeData = {}, children:VNode['children']  = undefined, text: VNode['text'] = undefined, elm:VNode['elm'] = undefined): VNode => {
  let key = data?.key
  return {
    sel,
    data,
    children,
    text,
    elm,
    key,
  }
}
```
</details>

**2. 定义一个 h 函数通过传参生成 `vnode` 数据结构**
<details>
<summary>展开查看</summary>

```typescript
/**
 * h 函数
 * @author: peng-xiao-shuai
 * @date: 2023-03-30 12:26:14
 * @last Modified by: peng-xiao-shuai
 * @last Modified time: 2023-03-30 12:26:14
 */
import { vnode, VNode, VNodeData } from './vnode';
export type VNodeElem = VNode | string | number | boolean | null | undefined
export type VNodeContent = VNodeElem | VNodeElem[]
/**
 * @param sel 标签名称
 * @example
 * h('div')
 */
export function h(sel: string): VNode
/**
 * @param sel 标签名称
 * @param {VNodeData} data 虚拟节点数据
 * @example
 * h('div', {key: '1'})
 */
export function h(sel: string, data?: VNodeData): VNode
/**
 * @param sel 标签名称
 * @param {VNodeContent} content 虚拟节点内容数组
 * @example
 * h('div', 'Hello World')
 * h('div', ['Hello World', 1, h('span', 1)])
 */
export function h(sel: string, content?: VNodeContent): VNode
/**
 * @param sel 标签名称
 * @param {VNodeData} data 虚拟节点数据
 * @param {VNodeContent} content 虚拟节点内容数组
 * @example
 * h('div', {key: '1'}, 'Hello World')
 */
export function h(sel: string, data?: VNodeData, content?: VNodeContent): VNode
export function h(sel: string, d?: any, c?: any) {
  if (sel == '') {
    console.error(`sel 不能为 ""`);
    return
  }

  let data = {},
      children: VNode['children'],
      text: VNode['text'],
      elm: VNode['elm']

  if (c == undefined) {
    /**
    if 判断是否对象并且不为 null
      if 判断是否是数组
        数组类型直接赋值给 children = d
      else if 是否存在 sel（标签）参数
        存在说明是 VNodeContent 类型 children = [d]
      else 否则则是 直接赋值给 data = d
    else 不是对象则赋值给 text = d
    */
    if (typeof d == 'object' && d !== null) {
      if (Array.isArray(d)) {  // 满足说明 d 是 VNodeContent 类型
        children = d
      } else if (d.sel){ // 满足说明 d 是 VNodeContent 类型否则就是 VNodeData
        children = [d]
      } else {
        data = d
      }
    } else { // d 是内容
      text = d
    }
  } else {
    data = d
    if (typeof c == 'object' && c !== null) {
      if (Array.isArray(c)) {  // 满足说明 c 是 VNodeContent 类型
        children = c
      } else { // 满足说明 c 是 VNodeContent
        children = [c]
      }
    } else { // c 是内容
      text = c
    }
  }

  // 此时的 children 可能为 (number | string | object)[]
  if (children !== undefined) {
    for (let i in children) {
      if (typeof children[i] !== 'object') {
        children[i] = vnode(undefined, {}, undefined, children[i] as any)
      }
    }
  }

  return vnode(sel, data, children, text, elm)
}
```
</details>

**3. 定义一个创建虚拟节点转换函数 `elemToVNode` （作用：将真实节点转换虚拟节点**
<details>
<summary>展开查看</summary>

```typescript
import { VNode, vnode, VNodeData } from "./vnode";

// 类型保护
const isElement = (node: Node): node is Element => {
  return node.nodeType == 1
}

/**
 * 真实节点转换虚拟节点
 * @param {Node} node
 * @example
 * elemToVNode(document.getElementById("app")!)
 * @returns {VNode}
 */
export const elemToVNode = (node: Node): VNode => {
  let children = node.childNodes
  let vNodeChildren: VNode[] | undefined = undefined // 虚拟节点子集

  // 对子集数据操作
  if (children.length) {
    vNodeChildren = []
    for(let element of children) {
      if(element.nodeType == 1) { // 标签节点进行再次判断

        // 标签节点下存在文字时 标签节点下将会有一个text子节点，这种情况下子节点将不需要，值直接放在 text中
        if (element.childNodes.length == 1 && element.childNodes[0].nodeType == 3) {
          vNodeChildren.push(vnode((<Element>element).tagName.toLowerCase(), {}, undefined, element.childNodes[0].nodeValue!.trim(), element))
        } else { // 递归函数
          vNodeChildren.push(elemToVNode(element)!)
        }
      } else if (element.nodeType == 3 && element.nodeValue!.trim() != '') { // 文本节点直接添加到子集数组中
        vNodeChildren.push(vnode(undefined, {}, undefined, element.nodeValue!.trim(), undefined))
      } else {
        // console.log('其他类型或者值为空', element.nodeType, element.nodeValue);
      }
    }
  }

  // 对当前 node 进行操作
  if (isElement(node)) {
    // 获取标签名和id、class属性
    let sel = node.tagName.toLowerCase()
    const data: VNodeData = {}
    let cl = node.getAttribute('class')

    // 获取id
    if (node.id) {
      // sel += '#' + node.id
      data.id = node.id
    }

    // 获取class名称
    if (cl) {
      // sel += "." + cl.split(" ").join(".")
      data.class = cl.split(' ')
    }
    return vnode(
      sel,
      data,
      vNodeChildren,
      undefined,
      node
    )
  } else if (node.nodeValue) {
    return vnode(
      undefined,
      {},
      undefined,
      node.nodeValue,
      node
    )
  } else {
    return vnode(
      '',
      {},
      undefined,
      undefined,
      node
    )
  }
}
```
</details>

**4. 定义一个创建真实节点转换函数 `createElem` （作用：将虚拟节点转换真实节点）**
<details>
<summary>展开查看</summary>

```typescript
import { VNode, vnode, VNodeData } from "./vnode";

/**
 * 虚拟节点创建真实节点
 * @param {VNode} vnode 虚拟节点
 * @example
 * createElem(h('div', {}, ['1', h('span', 'span')]))
 * @returns {HTMLElement}
 */
export const createElem = (vnode: VNode): HTMLElement => {
  const domNode = document.createElement(vnode.sel!)
  if (vnode.data?.id) {
    domNode.id = vnode.data?.id
  }
  if (vnode.data?.class) {
    domNode.className = vnode.data?.class.join(' ')
  }

  // 递归将children改为真实节点
  vnode.children?.forEach(item => {
    if (item.sel) {
      item.elm = domNode.appendChild(createElem(item))
    } else {
      item.elm = domNode.appendChild(document.createTextNode(item.text!))
    }
  })

  // 这里直接使用 domNode.textContent
  if (vnode.text) {
    domNode.textContent = vnode.text
  }

  return domNode
}
```
</details>

**5. 定义一个 patchVNode 函数 （作用：比较两个虚拟节点）**
- 如果连个节点完全一样则退出函数
- 判断 `oldVNode.elm` 是否存在，没有则创建真实节点赋值给 `elm`
- 将 `oldVNode.elm` 赋值给 `newVNode.elm`
- 判断 `newVNode.text` 是否存在
- - 存在则将 `newVNode.text` 赋值给 `newVNode.elm.textContent`
- 否则继续判断（`else if`判断）旧节点和新节点是否都存在子集
- - 存在则进入 `diffVNode` 函数
- 否则继续判断新节点是否存在子集
- - 存在将 `newVNode.elm` 清空（这里清空 `newVNode.elm` 是因为在上面，`newVNode.elm` 值是 `oldVNode.elm` 赋值的），在循环`newVNode.children` 给 `newVNode.elm` 添加子集
- `else` 以上都不满足则进入文字替换，将 `newVNode.text` 赋值给 `newVNode.elm.textContent`

<details>
<summary>展开查看</summary>

```typescript
import { createElem } from "./transform";
import { VNode } from "./vnode";

const isDef = <T>(val: T) => {
  return val !== undefined
}

/**
 * 比较虚拟节点数组
 * @param {VNode} oldVNode 旧的虚拟节点数组
 * @param {VNode} newVNode 新的虚拟节点数组
 */
const patchVNode = (oldVNode: VNode, newVNode: VNode) => {
  if (oldVNode === newVNode) { // 一样直接退出
    return
  }
  if (!oldVNode.elm) { // 避免oldVNode.elm 不存在的情况
    oldVNode.elm = createElem(oldVNode)
  }

  newVNode.elm = oldVNode.elm
  if (isDef(newVNode.text)) {  // 是否有text存在则将旧节点的textContent替换
    newVNode.elm.textContent = newVNode.text!
  } else if (isDef(oldVNode.children) && isDef(newVNode.children)) { // 都存在子集交给diff去判断
    diffVNode(oldVNode.elm!, oldVNode.children!, newVNode.children!)
  } else if (isDef(newVNode.children)) { // 旧节点不存在子集 新节点存在，添加子集
    newVNode.elm!.textContent = ''
    newVNode.children?.forEach(elem => {
      newVNode.elm!.appendChild(createElem(elem))
    })
  } else { // 文字替换
    newVNode.elm.textContent = newVNode.text!
  }
}
```
</details>

**6. 定义一个 `diffVNode` 函数（也就是 `diff` 算法，去比较子节点，结合 `diff` 基础核心进行阅读）**
<details>
<summary>展开查看</summary>

```typescript
// 我这里是将 diffVNode、patch、patchVNode、sameVnode、isDef、isVNode放在一个函数所以，没有使用import

/**
 * diff 节点数组
 * @param {Node} parentElm oldCh数组的父级真实节点
 * @param {(VNode|undefined)[]} oldCh 旧的虚拟节点数组
 * @param {VNode[]} newCh 新的虚拟节点数组
 */
const diffVNode = (parentElm: Node, oldCh: (VNode|undefined)[], newCh: VNode[]) => {
  // 定义指针
  let oldStartIdx = 0,
      oldEndIdx = oldCh.length - 1,
      newStartIdx = 0,
      newEndIdx = newCh.length - 1
  // 定义节点
  let oldStartVNode = oldCh[0],
      oldEndVNode = oldCh[oldCh.length - 1],
      newStartVNode = newCh[0],
      newEndVNode = newCh[newCh.length - 1]
  let oldKeyMap: {[key: string | number]: number} = {}
  let oldInIdx: number | undefined = undefined

  while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVNode == undefined) {
      // console.log('旧前undefined');
      oldStartVNode = oldCh[++oldStartIdx]
    } else if (oldEndVNode == undefined) {
      oldEndVNode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVNode, newStartVNode)) { // 旧前新前
      // console.log('旧前新前');
      patchVNode(oldStartVNode, newStartVNode)
      oldStartVNode = oldCh[++oldStartIdx]
      newStartVNode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVNode, newEndVNode)) { // 旧后新后
      // console.log('旧后新后');
      patchVNode(oldEndVNode, newEndVNode)
      oldEndVNode = oldCh[--oldEndIdx]
      newEndVNode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVNode, newEndVNode)) { // 旧前新后
      // console.log('旧前新后');
      patchVNode(oldStartVNode, newEndVNode)
      parentElm.insertBefore(newEndVNode.elm!, null)
      oldStartVNode = oldCh[++oldStartIdx]
      newEndVNode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVNode, newStartVNode)) { // 旧后新前
      // console.log('旧后新前');
      patchVNode(oldEndVNode, newStartVNode)
      parentElm.insertBefore(newStartVNode.elm!, oldStartVNode.elm!)
      oldEndVNode = oldCh[--oldEndIdx]
      newStartVNode = newCh[++newStartIdx]
    } else {
      // console.log('都不满足');
      if (oldKeyMap == undefined) { // while 循环时第一次必定为 undefined
        oldCh.forEach((item, index) => {
          if (item && item.key !== undefined) oldKeyMap![item.key] = index
        })
      }

      oldInIdx = newStartVNode.key ? oldKeyMap[newStartVNode.key] : undefined
      if (oldInIdx) {
        if (oldCh[oldInIdx]?.sel == newStartVNode.sel) { // sel 相同则不进行在创建标签
          patchVNode(oldCh[oldInIdx]!, newStartVNode)
          parentElm.insertBefore(oldCh[oldInIdx]?.elm!, oldStartVNode.elm!)
        } else {
          parentElm.insertBefore(createElem(newStartVNode), oldStartVNode.elm!)
        }

        oldCh[oldInIdx] = undefined
      } else {
        parentElm.insertBefore(createElem(newStartVNode), oldStartVNode.elm!)
      }

      newStartVNode = newCh[++newStartIdx]
    }
  }

  if (newStartIdx <= newEndIdx) {
    const before = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm! : null

    for (let i = newStartIdx; i <= newEndIdx; i++) {
      parentElm.insertBefore(createElem(newCh[i]), before)
    }
  }
  if (oldStartIdx <= oldEndIdx) {
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      parentElm.removeChild(oldCh[i]?.elm!)
    }
  }
}
```
</details>

**7. 定义 `patch` 函数去比较传入的值 （ `patch` 函数接收两个参数，一个旧节点，一个新节点）**

`patch` 函数逻辑

- 如果旧节点参数是真实节点，则将真实节点转换为虚拟节点
  （当旧节点和新节点都是虚拟节点时去比较两个节点不同）

*`oldNode newNode` 都是虚拟节点后：*
- 两个节点一样时（简单判断的话可以判断两个节点的 `sel` 和 `key` 是否相等,相等则一样）
  节点一样将旧节点的elm赋值给新节点的elm属性，在执行 `patchVNode` 函数
- `else`
  给 `newNode.elm` 赋值真实节点（真实节点由 `createElem(newVNode)` 创建），通过旧节点获取父级节点在通过父级节点的 `insertBefore` 函数将新节点移动到旧节点位置，在删除旧节点。

*return `newNode.elm` （ `elm` 为真实节点）*
<details>
<summary>展开查看</summary>

```typescript
import { createElem, elemToVNode } from "./transform";
import { VNode } from "./vnode";

const sameVnode = (oldVNode: VNode, newVNode: VNode) => {
  const isSel = oldVNode.sel == newVNode.sel
  const isKey = oldVNode.key == newVNode.key

  return isSel && isKey
}

const isVNode = (node: Element | Node | VNode): node is VNode => {
  return (<VNode>node).sel !== undefined
}
/**
 * 替换节点
 * @param {Element | Node | VNode} oldNode 旧节点(如果旧节点为虚拟节点，那么旧节点将不会渲染到页面)
 * @param newVNode 新虚拟节点
 * @example
 * patch(document.getElementById("app")!, h('h1', {id: 'a'}, 121))
 * @returns {Node}
 */
export const patch = (oldNode: Element | Node | VNode, newVNode: VNode): Node => {
  if (!isVNode(oldNode)) {
    oldNode = elemToVNode(oldNode)
  } else {
    oldNode.elm = createElem(oldNode)
  }

  // 创建新节点
  const oldElm = oldNode.elm!
  if (sameVnode(oldNode, newVNode)) { // 标签 和 key 相同情况
    newVNode.elm = oldElm
    patchVNode(oldNode, newVNode)

  } else { // 不同直接删除和新增节点
    // console.log('标签或key不同');
    newVNode.elm = createElem(newVNode)
    // 将新节点移动到旧节点位置
    oldElm.parentNode?.insertBefore(newVNode.elm, oldElm)
    oldElm.parentNode?.removeChild(oldElm)
  }

  return newVNode.elm!
}
```
</details>

`vnode` 新老节点完全替换规则
1. 没有 `key` 并且 `sel 标签` 不同则暴力删除和新增
