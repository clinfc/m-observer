# m-observer

> 对 MutationObserver 的简单封装

# 在 NPM 中使用

### Install
```
npm install m-observer -S
```

### Example
```html
<div id="demo"></div>
```
```js
const { attribute } = require('m-observer')

attribute('#demo', function(mutationsList, observer) {
  console.log(mutationsList)
})
// or
const demo = document.querySelector('#demo')
attribute(demo, function(mutationsList, observer) {
  console.log(mutationsList)
})
```

# 在 Script 中使用

### Example
```html
<div id="demo"></div>

<script src="./js/m-observer/dist/index.min.js"></script>
<script>
  MObserver.attribute('#demo', function(mutationsList, observer) {
    console.log(mutationsList)
  })
</script>
```


# API

```JS
import * as MObserver from 'm-observer'

MObserver.observe(target, callback, config)

MObserver.attribute(target, callback[, subtree])

MObserver.attributeFilter(target, callback, filter[, subtree])

MObserver.childList(target, callback[, subtree])

MObserver.character(target, callback)

MObserver.takeRecords(target, callback)

MObserver.disconnect(target, callback)

MObserver.reconnect(target, callback)

MObserver.remove(target, callback)
```



## observe(target, callbck, config)

配置MutationObserver在DOM更改匹配给定选项时，通过其回调函数开始接收通知

config [配置项](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)中，childList，attributes 或者 characterData 三个属性之中，至少有一个必须为 true，否则会抛出 TypeError 异常

### 参数

参数|说明|类型|默认值
:-|:-|:-|:-
`target`|需要观察变动的节点|`String/Element/Node`|
`callback`|当观察到变动时执行的回调函数|`Function<mutationsList[, observer]>`|
`config`|观察器的配置|`Object`|

### 示例

```js
import { observe } from 'm-observer'

// 观察器的配置（需要观察什么变动）
// 更多配置项见：https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit
const config = { attributes: true, subtree: true }

observe('#demo', function(mutationsList) {
  console.log(mutationsList)
}, config)
```



## attribute(target, callback[, subtree])

观察受监视元素的 *属性值* 的变更

### 参数

参数|说明|类型|默认值
:-|:-|:-|:-
`target`|需要观察变动的节点|`String/Element/Node`|
`callback`|当观察到变动时执行的回调函数|`Function<[mutationsList[, observer]]>`|
`subtree`|是否将监视范围扩展至目标节点整个节点树中的所有节点|`Boolean`|`false`

### 示例

```js
import { attribute } from 'm-observer'

attribute('#demo', function(mutationsList) {
  console.log(mutationsList)
}, true)
```



## attributeFilter(target, callback, filter[, subtree])

观察受监视元素的 *指定属性值* 的变更

### 参数

参数|说明|类型|默认值
:-|:-|:-|:-
`target`|需要观察变动的节点|`String/Element/Node`|
`callback`|当观察到变动时执行的回调函数|`Function<[mutationsList[, observer]]>`|
`filter`|要监视的特定属性名称的数组|`Array`|
`subtree`|是否将监视范围扩展至目标节点整个节点树中的所有节点|`Boolean`|`false`

### 示例

```js
import { attributeFilter } from 'm-observer'

attributeFilter('#demo', function(mutationsList) {
  console.log(mutationsList)
}, ['title'])
```



## childList(target, callback[, subtree])

监视目标节点添加或删除新的子节点

### 参数

参数|说明|类型|默认值
:-|:-|:-|:-
`target`|需要观察变动的节点|`String/Element/Node`|
`callback`|当观察到变动时执行的回调函数|`Function<[mutationsList[, observer]]>`|
`subtree`|是否将监视范围扩展至目标节点整个节点树中的所有节点|`Boolean`|`false`

### 示例

```js
import { childList } from 'm-observer'

childList('#demo', function(mutationsList) {
  console.log(mutationsList)
})
```



## character(target, callback)

监视指定目标节点或子节点树中节点所包含的字符数据的变化

### 参数

参数|说明|类型|默认值
:-|:-|:-|:-
`target`|需要观察变动的节点|`String/Element/Node`|
`callback`|当观察到变动时执行的回调函数|`Function<[mutationsList[, observer]]>`|

### 示例

```js
import { character } from 'm-observer'

character('#demo', function(mutationsList) {
  console.log(mutationsList)
})
```



## takeRecords、disconnect、reconnect

* takeRecords：
  * 从MutationObserver的通知队列中删除所有待处理的通知，并将它们返回到MutationRecord对象的新Array中
  * 语法：`takeRecords(target, callback)`

* disconnect：暂停观察者观察活动
  * 阻止 MutationObserver 实例继续接收的通知，该观察者对象包含的回调函数不会再被调用
  * 语法：`disconnect(target, callback)`

* reconnect：重启观察者观察活动
  * 重新允许 MutationObserver 实例继续接收的通知，该观察者对象包含的回调函数将继续被调用
  * 语法：`reconnect(target, callback)`


### 参数

参数|说明|类型|默认值
:-|:-|:-|:-
`target`|需要观察变动的节点|`String/Element/Node`|
`callback`|当观察到变动时执行的回调函数|`Function<[mutationsList[, observer]]>`|

### 示例

```js
import { attribute, takeRecords, disconnect, reconnect } from 'm-observer'

function listener(mutationsList) {
  console.log(mutationsList)
}

attribute('#demo', listener)

// 此方法最常见的使用场景是在断开观察者之前立即获取所有未处理的更改记录，以便在停止观察者时可以处理任何未处理的更改。
let mutationsList = takeRecords('#demo', listener)
listener(mutationsList)

// 暂停观察者观察活动
disconnect('#demo', listener)

// 重启观察者观察活动
reconnect('#demo', listener)
```



## remove(target, callback)

停止观察变动并永久性移除观察者，调用此方法后，无法通过 `reconnect` 重启观察者

### 参数

参数|说明|类型|默认值
:-|:-|:-|:-
`target`|需要观察变动的节点|`String/Element/Node`|
`callback`|当观察到变动时执行的回调函数|`Function<[mutationsList[, observer]]>`|

### 示例

```js
import { attribute, remove } from 'm-observer'

function listener(mutationsList) {
  console.log(mutationsList)
}
attribute('#demo', listener)
// 永久性停用观察者
remove('#demo', listener)
```