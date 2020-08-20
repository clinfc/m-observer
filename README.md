# m-observer

> 对 MutationObserver 的简单封装

### 相关文档

[MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

[MutationRecord](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord)

[MutationObserverInit](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)


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

attribute('#demo', function(mutationRecord, observer) {
  console.log(mutationRecord)
})
// or
const demo = document.querySelector('#demo')
attribute(demo, function(mutationRecord, observer) {
  console.log(mutationRecord)
})
```

# 在 Script 中使用

### Example
```html
<div id="demo"></div>

<script src="./js/m-observer/dist/index.min.js"></script>
<script>
  MObserver.attribute('#demo', function(mutationRecord, observer) {
    console.log(mutationRecord)
  })
</script>
```

# 批量操作

```html
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
```
```js
import { attribute } from 'm-observer'

let boxs = document.querySelectorAll('.box')
for(let box of boxs) {
  attribute(box, function(mutationRecord) {
    console.log(mutationRecord)
  })
}
```



# API

```JS
import * as MObserver from 'm-observer'

MObserver.observe(target, callback, config)

MObserver.attribute(target, callback[, subtree])

MObserver.attributeFilter(target, callback, filter[, subtree])

MObserver.childList(target, callback[, subtree])

MObserver.character(target, callback)

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
`target`|需要观察变动的节点|`String`/`Element`/`Node`|
`callback`|当观察到变动时执行的回调函数|`Function<mutationRecord[, observer]>`|
`config`|观察器的配置，详见[MutationObserverInit](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)|`Object`|

### 示例

```js
import { observe } from 'm-observer'

// 观察器的配置（需要观察什么变动）
// 更多配置项见：https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit
const config = { attributes: true, subtree: true }

observe('#demo', function(mutationRecord) {
  console.log(mutationRecord)
}, config)
```



## attribute(target, callback[, subtree])

观察受监视元素的 *属性值* 的变更

### 参数

参数|说明|类型|默认值
:-|:-|:-|:-
`target`|需要观察变动的节点|`String`/`Element`/`Node`|
`callback`|当观察到变动时执行的回调函数|`Function<[mutationRecord[, observer]]>`|
`subtree`|是否将监视范围扩展至目标节点整个节点树中的所有节点|`Boolean`|`false`

### 示例

```js
import { attribute } from 'm-observer'

attribute('#demo', function(mutationRecord) {
  console.log(mutationRecord)
}, true)
```



## attributeFilter(target, callback, filter[, subtree])

观察受监视元素的 *指定属性值* 的变更

### 参数

参数|说明|类型|默认值
:-|:-|:-|:-
`target`|需要观察变动的节点|`String`/`Element`/`Node`|
`callback`|当观察到变动时执行的回调函数|`Function<[mutationRecord[, observer]]>`|
`filter`|要监视的特定属性名称的数组|`Array`|
`subtree`|是否将监视范围扩展至目标节点整个节点树中的所有节点|`Boolean`|`false`

### 示例

```js
import { attributeFilter } from 'm-observer'

attributeFilter('#demo', function(mutationRecord) {
  console.log(mutationRecord)
}, ['title'])
```



## childList(target, callback[, subtree])

监视目标节点添加或删除新的子节点

### 参数

参数|说明|类型|默认值
:-|:-|:-|:-
`target`|需要观察变动的节点|`String`/`Element`/`Node`|
`callback`|当观察到变动时执行的回调函数|`Function<[mutationRecord[, observer]]>`|
`subtree`|是否将监视范围扩展至目标节点整个节点树中的所有节点|`Boolean`|`false`

### 示例

```js
import { childList } from 'm-observer'

childList('#demo', function(mutationRecord) {
  console.log(mutationRecord)
})
```



## character(target, callback)

监视指定目标节点或子节点树中节点所包含的字符数据的变化

### 参数

参数|说明|类型|默认值
:-|:-|:-|:-
`target`|需要观察变动的节点|`String`/`Element`/`Node`|
`callback`|当观察到变动时执行的回调函数|`Function<[mutationRecord[, observer]]>`|

### 示例

```js
import { character } from 'm-observer'

character('#demo', function(mutationRecord) {
  console.log(mutationRecord)
})
```



## disconnect、reconnect

* disconnect：暂停观察者观察活动
  * 阻止 MutationObserver 实例继续接收的通知，该观察者对象包含的回调函数不会再被调用
  * 语法：`disconnect(target, callback)`

* reconnect：重启观察者观察活动
  * 重新允许 MutationObserver 实例继续接收的通知，该观察者对象包含的回调函数将继续被调用
  * 语法：`reconnect(target, callback)`


### 参数

参数|说明|类型|默认值
:-|:-|:-|:-
`target`|需要观察变动的节点|`String`/`Element`/`Node`|
`callback`|当观察到变动时执行的回调函数|`Function<[mutationRecord[, observer]]>`|

### 示例

```js
import { attribute, disconnect, reconnect } from 'm-observer'

function listener(mutationRecord) {
  console.log(mutationRecord)
}

attribute('#demo', listener)

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
`target`|需要观察变动的节点|`String`/`Element`/`Node`|
`callback`|当观察到变动时执行的回调函数|`Function<[mutationRecord[, observer]]>`|

### 示例

```js
import { attribute, remove } from 'm-observer'

function listener(mutationRecord) {
  console.log(mutationRecord)
}
attribute('#demo', listener)
// 永久性停用观察者
remove('#demo', listener)
```