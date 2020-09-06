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

MObserver.observe(target, callback, config[, isRecordList])

MObserver.observeAll(target, callback[, filter[, isRecordList]])

MObserver.attribute(target, callback[, subtree[, isRecordList]])

MObserver.attributeFilter(target, callback, filter[, subtree[, isRecordList]])

MObserver.childList(target, callback[, subtree[, isRecordList]])

MObserver.character(target, callback)

MObserver.disconnect(target, callback)

MObserver.reconnect(target, callback)

MObserver.remove(target, callback)
```



## observe(target, callbck, config[, isRecordList])

配置MutationObserver在DOM更改匹配给定选项时，通过其回调函数开始接收通知

config [配置项](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)中，childList，attributes 或者 characterData 三个属性之中，至少有一个必须为 true，否则会抛出 TypeError 异常

### 参数

* target
  * 说明：需要观察变动的节点
  * 类型：`String`/`Element`/`Node`
  * 必选：`true`
* callback
  * 说明：当观察到变动时执行的回调函数
  * 类型：`Function<mutationRecord[, observer]>` 或 `Function<mutationRecordList[, observer]>`（`isRecordList`为`true`时）
  * 必选：`true`
* config
  * 说明：观察器的配置，详见[MutationObserverInit](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)
  * 类型：`Object`
  * 必选：`true`
* isRecordList
  * 说明：设置回调函数的第一个参数是 `mutationReacord` 还是 `mutationReacordList`。当为 `true` 时，回调函数第一个参数为 `mutationReacordList`
  * 类型：`Boolean`
  * 必选：`false`
  * 默认值：`false`

### 示例

```js
import { observe } from 'm-observer'

// 观察器的配置（需要观察什么变动）
// 更多配置项见：https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit
const config = { attributes: true, subtree: true }

observe('#demo', function(mutationRecord) {
  console.log(mutationRecord)
}, config)

// 或

observe('#demo', function(mutationRecordList) {
  console.log(mutationRecordList)
}, config, true)
```


## observeAll(target, callbck[, filter[, isRecordList]])

MutationObserverInit 字典配置项（除 attributeFilter 外）都被设置为 true

### 参数

* target
  * 说明：需要观察变动的节点
  * 类型：`String`/`Element`/`Node`
  * 必选：`true`
* callback
  * 说明：当观察到变动时执行的回调函数
  * 类型：`Function<mutationRecord[, observer]>` 或 `Function<mutationRecordList[, observer]>`（`isRecordList`为`true`时）
  * 必选：`true`
* filter
  * 说明：`MutationObserverInit` 中 `attributeFilter` 配置项，详见[MutationObserverInit](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)
  * 类型：`Array`
  * 必选：`false`
  * 默认值：`undefined`
* isRecordList
  * 说明：设置回调函数的第一个参数是 `mutationReacord` 还是 `mutationReacordList`。当为 `true` 时，回调函数第一个参数为 `mutationReacordList`
  * 类型：`Boolean`
  * 必选：`false`
  * 默认值：`false`

### 示例

```js
import { observeAll } from 'm-observer'

observeAll('#demo', function(mutationRecord) {
  console.log(mutationRecord)
})

// 或

observeAll('#demo', function(mutationRecordList) {
  console.log(mutationRecordList)
}, ['title', 'style'])

// 或

observeAll('#demo', function(mutationRecordList) {
  console.log(mutationRecordList)
}, null, true)
```



## attribute(target, callback[, subtree[, isRecordList]])

观察受监视元素的 *属性值* 的变更

### 参数

* target
  * 说明：需要观察变动的节点
  * 类型：`String`/`Element`/`Node`
  * 必选：`true`
* callback
  * 说明：当观察到变动时执行的回调函数
  * 类型：`Function<mutationRecord[, observer]>` 或 `Function<mutationRecordList[, observer]>`（`isRecordList`为`true`时）
  * 必选：`true`
* subtree
  * 说明：是否将监视范围扩展至目标节点整个节点树中的所有节点
  * 类型：`Boolean`
  * 必选：`false`
  * 默认值：`false`
* isRecordList
  * 说明：设置回调函数的第一个参数是 `mutationReacord` 还是 `mutationReacordList`。当为 `true` 时，回调函数第一个参数为 `mutationReacordList`
  * 类型：`Boolean`
  * 必选：`false`
  * 默认值：`false`

### 示例

```js
import { attribute } from 'm-observer'

attribute('#demo', function(mutationRecord) {
  console.log(mutationRecord)
}, true)
```



## attributeFilter(target, callback, filter[, subtree[, isRecordList]])

观察受监视元素的 *指定属性值* 的变更

### 参数

* target
  * 说明：需要观察变动的节点
  * 类型：`String`/`Element`/`Node`
  * 必选：`true`
* callback
  * 说明：当观察到变动时执行的回调函数
  * 类型：`Function<mutationRecord[, observer]>` 或 `Function<mutationRecordList[, observer]>`（`isRecordList`为`true`时）
  * 必选：`true`
* filter
  * 说明：`MutationObserverInit` 中 `attributeFilter` 配置项，详见[MutationObserverInit](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)
  * 类型：`Array`
  * 必选：`true`
* subtree
  * 说明：是否将监视范围扩展至目标节点整个节点树中的所有节点
  * 类型：`Boolean`
  * 必选：`false`
  * 默认值：`false`
* isRecordList
  * 说明：设置回调函数的第一个参数是 `mutationReacord` 还是 `mutationReacordList`。当为 `true` 时，回调函数第一个参数为 `mutationReacordList`
  * 类型：`Boolean`
  * 必选：`false`
  * 默认值：`false`

### 示例

```js
import { attributeFilter } from 'm-observer'

attributeFilter('#demo', function(mutationRecord) {
  console.log(mutationRecord)
}, ['title'])
```



## childList(target, callback[, subtree[, isRecordList]])

监视目标节点添加或删除新的子节点

### 参数

* target
  * 说明：需要观察变动的节点
  * 类型：`String`/`Element`/`Node`
  * 必选：`true`
* callback
  * 说明：当观察到变动时执行的回调函数
  * 类型：`Function<mutationRecord[, observer]>` 或 `Function<mutationRecordList[, observer]>`（`isRecordList`为`true`时）
  * 必选：`true`
* subtree
  * 说明：是否将监视范围扩展至目标节点整个节点树中的所有节点
  * 类型：`Boolean`
  * 必选：`false`
  * 默认值：`false`
* isRecordList
  * 说明：设置回调函数的第一个参数是 `mutationReacord` 还是 `mutationReacordList`。当为 `true` 时，回调函数第一个参数为 `mutationReacordList`
  * 类型：`Boolean`
  * 必选：`false`
  * 默认值：`false`

### 示例

```js
import { childList } from 'm-observer'

childList('#demo', function(mutationRecord) {
  console.log(mutationRecord)
})
```



## character(target, callback[, isRecordList])

监视指定目标节点或子节点树中节点所包含的字符数据的变化

### 参数

* target
  * 说明：需要观察变动的节点
  * 类型：`String`/`Element`/`Node`
  * 必选：`true`
* callback
  * 说明：当观察到变动时执行的回调函数
  * 类型：`Function<mutationRecord[, observer]>` 或 `Function<mutationRecordList[, observer]>`（`isRecordList`为`true`时）
  * 必选：`true`
* isRecordList
  * 说明：设置回调函数的第一个参数是 `mutationReacord` 还是 `mutationReacordList`。当为 `true` 时，回调函数第一个参数为 `mutationReacordList`
  * 类型：`Boolean`
  * 必选：`false`
  * 默认值：`false`

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

* target
  * 说明：被绑定了观察器的节点
  * 类型：`String`/`Element`/`Node`
  * 必选：`true`
* callback
  * 说明：绑定观察器时的回调函数
  * 类型：`Function` 
  * 必选：`true`

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

* target
  * 说明：被绑定了观察器的节点
  * 类型：`String`/`Element`/`Node`
  * 必选：`true`
* callback
  * 说明：绑定观察器时的回调函数
  * 类型：`Function` 
  * 必选：`true`

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