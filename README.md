# m-observer

> 对 MutationObserver 的封装

## 安装

```
npm install m-observer
```

## 使用

```html
<div id="demo"></div>
```

```js
import { observeAll } from "m-observer"

function callback(mutations, observer) {
    for (let mutation of mutaitons) {
        if (mutation.type === "childList") {
            console.log("A child node has been added or removed.")
        } else if (mutation.type === "attributes") {
            console.log("The " + mutation.attributeName + " attribute was modified.")
        }
    }
}

observeAll("#demo", callback)

// or
const target = document.querySelector("#demo")
observerAll(target, callback)
```

## Script

> 使用 `script` 的方式引入需要先在 GitHub 上获取到 `.min.js` 文件

```html
<div id="demo"></div>
<script src="m-observer/dist/index.min.js"></script>
<script>
    MObserver.observeAll("#demo", function (mutations) {
        // do something
    })
</script>
```

## API

### 标准 API

| FN              | 说明                                                                         |
| :-------------- | :--------------------------------------------------------------------------- |
| observe         | 绑定监听，自定义配置项。回调函数的第一个参数为 MutationRecord[]。            |
| observeAll      | 绑定监听，监听所有变化。回调函数的第一个参数为 MutationRecord[]。            |
| attribute       | 绑定监听，监听 attribute 变化。回调函数的第一个参数为 MutationRecord[]。     |
| attributeFilter | 绑定监听，监听指定 attribute 变化。回调函数的第一个参数为 MutationRecord[]。 |
| childList       | 绑定监听，监听节点的增减变化。回调函数的第一个参数为 MutationRecord[]。      |
| character       | 绑定监听，监听文本变化。回调函数的第一个参数为 MutationRecord[]。            |

### 变种 API

> 变种 API 与 标准 API 相互对应，唯一的区别就是回调函数的第一个参数数据不同。

| FN               | 说明                                                                       |
| :--------------- | :------------------------------------------------------------------------- |
| eobserve         | 绑定监听，自定义配置项。回调函数的第一个参数为 MutationRecord。            |
| eobserveAll      | 绑定监听，监听所有变化。回调函数的第一个参数为 MutationRecord。            |
| eattribute       | 绑定监听，监听 attribute 变化。回调函数的第一个参数为 MutationRecord。     |
| eattributeFilter | 绑定监听，监听指定 attribute 变化。回调函数的第一个参数为 MutationRecord。 |
| echildList       | 绑定监听，监听节点的增减变化。回调函数的第一个参数为 MutationRecord。      |
| echaracter       | 绑定监听，监听文本变化。回调函数的第一个参数为 MutationRecord。            |

### 管理 API

| FN         | 说明                           |
| :--------- | :----------------------------- |
| reconnect  | 重连监听，用于断开后的重新连接 |
| disconnect | 断开监听，断开后可重连         |
| remove     | 移除监听，移除后不可重连       |

## API 详解

### observe/eobserve

#### `observe(target, callback, option)`

-   target

    -   描述：需要被兼容的节点
    -   类型：`string`/`Element`/`Node`

-   callback

    -   描述：监听到变化时执行的回调函数
    -   类型：`(mutations: MutationRecord[], observer: MutationObserver) => void`

-   option
    -   描述：监听配置项
    -   类型：[`MutationObserverInit`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)

#### `eobserve(target, eachcall, option)`

-   target

    -   描述：需要被兼容的节点
    -   类型：`string`/`Element`/`Node`

-   eachcall

    -   描述：监听到变化时执行的回调函数
    -   类型：`(mutations: MutationRecord, observer: MutationObserver) => void`

-   option
    -   描述：监听配置项
    -   类型：[`MutationObserverInit`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)

#### demo

```js
import { observe, eobserve } from "m-observe"

const option = {
    subtree: true,
    childList: true
}

observe('#demo1' (mutations) => {
    for (let mutation of mutaitons) {
        // do something
    }
}, option)

eobserve('#demo2', (mutation) => {
    // do something
}, option)
```

### observeAll/eobserveAll

#### `observeAll(target, callback[, filter])`

-   target

    -   描述：需要被兼容的节点
    -   类型：`string`/`Element`/`Node`

-   callback

    -   描述：监听到变化时执行的回调函数
    -   类型：`(mutations: MutationRecord[], observer: MutationObserver) => void`

-   filter
    -   描述：`MutationObserverInit.attributeFilter`
    -   类型：`Array<string>`
    -   默认值：`undefined`

#### `eobserveAll(target, eachcall[, filter])`

-   target

    -   描述：需要被兼容的节点
    -   类型：`string`/`Element`/`Node`

-   eachcall

    -   描述：监听到变化时执行的回调函数
    -   类型：`(mutations: MutationRecord, observer: MutationObserver) => void`

-   filter
    -   描述：`MutationObserverInit.attributeFilter`
    -   类型：`Array<string>`
    -   默认值：`undefined`

#### demo

```js
import { observeAll, eobserveAll } from "m-observe"


observeAll('#demo1' (mutations) => {
    for (let mutation of mutaitons) {
        // do something
    }
})

eobserveAll('#demo2', (mutation) => {
    // do something
}, ['title', 'src', 'style', 'link', 'alt'])
```

### attribute/eattribute

#### `attribute(target, callback[, subtree])`

-   target

    -   描述：需要被兼容的节点
    -   类型：`string`/`Element`/`Node`

-   callback

    -   描述：监听到变化时执行的回调函数
    -   类型：`(mutations: MutationRecord[], observer: MutationObserver) => void`

-   subtree
    -   描述：是否将监视范围扩展至目标节点整个节点树中的所有节点
    -   类型：`boolean`
    -   默认值：`false`

#### `eattribute(target, eachcall[, subtree])`

-   target

    -   描述：需要被兼容的节点
    -   类型：`string`/`Element`/`Node`

-   eachcall

    -   描述：监听到变化时执行的回调函数
    -   类型：`(mutations: MutationRecord, observer: MutationObserver) => void`

-   subtree
    -   描述：是否将监视范围扩展至目标节点整个节点树中的所有节点
    -   类型：`boolean`
    -   默认值：`false`

#### demo

```js
import { attribute, eattribute } from "m-observe"


attribute('#demo1' (mutations) => {
    for (let mutation of mutaitons) {
        // do something
    }
}, true)

eattribute('#demo2', (mutation) => {
    // do something
}, true)
```

### attributeFilter/eattributeFilter

#### `attributeFilter(target, callback, filter[, subtree])`

-   target

    -   描述：需要被兼容的节点
    -   类型：`string`/`Element`/`Node`

-   callback

    -   描述：监听到变化时执行的回调函数
    -   类型：`(mutations: MutationRecord[], observer: MutationObserver) => void`

-   filter

    -   描述：`MutationObserverInit.attributeFilter`
    -   类型：`Array<string>`

-   subtree
    -   描述：是否将监视范围扩展至目标节点整个节点树中的所有节点
    -   类型：`boolean`
    -   默认值：`false`

#### `eattributeFilter(target, eachcall, filter[, subtree])`

-   target

    -   描述：需要被兼容的节点
    -   类型：`string`/`Element`/`Node`

-   eachcall

    -   描述：监听到变化时执行的回调函数
    -   类型：`(mutations: MutationRecord, observer: MutationObserver) => void`

-   filter

    -   描述：`MutationObserverInit.attributeFilter`
    -   类型：`Array<string>`

-   subtree
    -   描述：是否将监视范围扩展至目标节点整个节点树中的所有节点
    -   类型：`boolean`
    -   默认值：`false`

#### demo

```js
import { attributeFilter, eattributeFilter } from "m-observe"

const filter = ['title', 'src', 'style', 'link', 'alt']

attributeFilter('#demo1' (mutations) => {
    for (let mutation of mutaitons) {
        // do something
    }
}, filter)

eattributeFilter('#demo2', (mutation) => {
    // do something
}, filter)
```

### childList/echildList

#### `childList(target, callback[, subtree])`

-   target

    -   描述：需要被兼容的节点
    -   类型：`string`/`Element`/`Node`

-   callback

    -   描述：监听到变化时执行的回调函数
    -   类型：`(mutations: MutationRecord[], observer: MutationObserver) => void`

-   subtree
    -   描述：是否将监视范围扩展至目标节点整个节点树中的所有节点
    -   类型：`boolean`
    -   默认值：`false`

#### `echildList(target, eachcall[, subtree])`

-   target

    -   描述：需要被兼容的节点
    -   类型：`string`/`Element`/`Node`

-   eachcall

    -   描述：监听到变化时执行的回调函数
    -   类型：`(mutations: MutationRecord, observer: MutationObserver) => void`

-   subtree
    -   描述：是否将监视范围扩展至目标节点整个节点树中的所有节点
    -   类型：`boolean`
    -   默认值：`false`

#### demo

```js
import { childList, echildList } from "m-observe"

childList('#demo1' (mutations) => {
    for (let mutation of mutaitons) {
        // do something
    }
}, true)

echildList('#demo2', (mutation) => {
    // do something
}, true)
```

### character/echaracter

#### `character(target, callback)`

-   target

    -   描述：需要被兼容的节点
    -   类型：`string`/`Element`/`Node`

-   callback

    -   描述：监听到变化时执行的回调函数
    -   类型：`(mutations: MutationRecord[], observer: MutationObserver) => void`

#### `echaracter(target, eachcall)`

-   target

    -   描述：需要被兼容的节点
    -   类型：`string`/`Element`/`Node`

-   eachcall

    -   描述：监听到变化时执行的回调函数
    -   类型：`(mutations: MutationRecord, observer: MutationObserver) => void`

#### demo

```js
import { character, echaracter } from "m-observe"

character('#demo1' (mutations) => {
    for (let mutation of mutaitons) {
        // do something
    }
}, true)

echaracter('#demo2', (mutation) => {
    // do something
}, true)
```

### reconnect/disconnect/remove

`reconnect(target, callback/eachcall)`

`disconnect(target, callback/eachcall)`

`remove(target, callback/eachcall)`

-   target

    -   描述：需要被兼容的节点
    -   类型：`string`/`Element`/`Node`

-   callback

    -   描述：监听到变化时执行的回调函数
    -   类型：`(mutations: MutationRecord[], observer: MutationObserver) => void`

-   eachcall

    -   描述：监听到变化时执行的回调函数
    -   类型：`(mutations: MutationRecord, observer: MutationObserver) => void`

#### demo

```js
import { reconnect, disconnect, remove, observeAll } from "m-observer"

function callback(mutations) {
    // do something
}

// 初次绑定监听器
observeAll("#demo", callback)

// 断开监听器
disconnect("#demo", callback)

// 重连监听器
reconnect("#demo", callback)

// 移除监听器
remove("#demo", callback)
```

```js
import { reconnect, disconnect, remove, eobserveAll } from "m-observer"

function eachcall(mutations) {
    // do something
}

// 初次绑定监听器
eobserveAll("#demo", eachcall)

// 断开监听器
disconnect("#demo", eachcall)

// 重连监听器
reconnect("#demo", eachcall)

// 移除监听器
remove("#demo", eachcall)
```
