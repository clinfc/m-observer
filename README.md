# MObserver

> 对 MutationObserver 的封装，简化其使用方式


# 安装

### npm 安装

```
npm install m-observer -S
```


# 使用

### 

```js
import MObserver from 'm-observer'

MObserver.attribute('#editor', function(mutationList, observer) {
  console.log(mutationList)
})
```

### script

```html
<div id="test">
  <div id="editor" contenteditable="true"></div>
</div>

<script src="./dist/index.min.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
  let test = document.querySelector('#test')
  // 监听 #test 节点的 title 属性
  MObserver.attribute(test, function(mutationList, observer) {
    console.log(mutationList);
  }, 'test-title')
  
  // 监视指定目标（#editor）节点或子节点树中节点所包含的字符数据的变化
  MObserver.character('#editor', function(mutationList, observer) {
    console.log(mutationList)
  })
</script>
```

# API

更多细节请参考 
[MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 和 
[MutationObserverInit](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)

API|说明|用法|返回值
:-|:-|:-|:-
`get prefix`|获取被监听节点的 `dataset` 属性的前缀|`let prefix = MObserver.prefix`|`String`
`set prefix`|设置被监听节点的 `dataset` 属性的前缀|`MObserver.prefix = 'zc'`|
`uuid`|生成 32 位长度的字符串|`MObserver.uuid()`
`observe`|监听指定节点。childList，attributes 或者 characterData 三个属性之中，至少有一个必须为 true，否则会抛出 TypeError 异常|`MObserver.observe(target, callback, config, name)`|`{ name, observer }`
`observeAll`|监听指定节点。childList，attributes 或者 characterData 三个属性均为 true|`MObserver.observeAll(target, callback, filter, name)`|`{ name, observer }`
`attribute`|监听指定节点的 attribute 属性|`MObserver.attribute(target, callback, name)`|`{ name, observer }`
`attributeChild`|监听指定节点及其后代节点的 attribute 属性|`MObserver.attributeChild(target, callback, name)`|`{ name, observer }`
`attributeFilter`|监听指定节点特定的 attribute 属性|`MObserver.attributeFilter(target, callback, filter, name)`|`{ name, observer }`
`attributeFilterChild`|监听指定节点及后代节点特定的 attribute 属性|`MObserver.attributeFilterChild(target, callback, filter, name)`|`{ name, observer }`
`node`|监听指定节点的 子节点 的添加或删除|`MObserver.node(target, callback, name)`|`{ name, observer }`
`nodeChild`|监听指定节点的 子节点和后代节点 的添加或删除|`MObserver.nodeChild(target, callback, name)`|`{ name, observer }`
`character`|监视指定节点或子节点树中节点所包含的字符数据的变化|`MObserver.character(target, callback, name)`|`{ name, observer }`
`takeRecords`|返回已检测到但尚未由观察者的回调函数处理的所有匹配DOM更改的列表，使变更队列保持为空|`MObserver.takeRecords(target, name)`|`{ name: MutationRecordArray }`
`disconnect`|停止对节点的监听|`MObserver.disconnect(target, name)`|`true`/`false`


### 参数说明

参数|说明|类型|默认值
:-|:-|:-|:-
`target`|被监听的 HTML 节点|`String`：节点选择器；`Element`：节点对象|
`callback`|当观察到变动时执行的回调函数|`Function`|
`config`|观察器的配置（需要观察什么变动），详情参考 [MutationObserverInit](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)|`Object`|`{}`
`filter`|MutationObserverInit.attributeFilter 的值|`Array`|`[]`
`name`|绑定的 MutationObserver 实例的变量名|`String`|`MObserver.uuid()`

> 备注：必须确保 name 的唯一性，否则之前的 MutationObserver 实例存在被覆盖的风险。如果被覆盖，被覆盖的实例在 disconnect 和 takeRecords 将无法被访问到


### 返回值说明

名称|说明
:-|:-
`name`|与参数的 name 同意
`observer`|本次绑定的 MutationObserver 实例
`MutationRecordArray`|参考 [MutationRecord](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord)


### 示例

* html

```html
<style type="text/css">
  #test {
    width: 800px;
    height: 500px;
    margin: auto;
    border: 1px solid green;
    border-radius: 5px;
  }
  #editor {
    width: 500px;
    height: 300px;
    margin: 100px auto;
    border: 1px solid red;
    border-radius: 5px;
  }
</style>

<div id="test">
  <div id="editor" contenteditable="true"></div>
</div>
```

* JavaScript

```js
let test = document.querySelector('#test')
MObserver.attributeFilter(test, function(mutationList, observer) {
  console.log(mutationList)
}, ['title'], 'test-attribute-filter')

// 自定义监听
MObserver.observe('#editor', function(mutationList, observer) {
  console.log(mutationList)
}, {
  attributes: true,
  childList: true,
  subtree: true
}, 'editor-observe')

// 终止自定义监听
MObserver.disconnect('#editor', 'editor-observe')
```