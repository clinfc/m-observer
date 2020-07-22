# m-observer

对 MutationObserver 的封装，简化其使用方式


# 安装

### npm 安装

```
npm install m-observer -S
```


# 使用

### 

```js
import MObserver from 'm-observer'

const observer = new MObserver()
observer.attribute('#editor', function(mutationList, observer) {
  console.log(mutationList)
}, 'editor-attribute')
```

### script

```html
<div id="test">
  <div id="editor" contenteditable="true"></div>
</div>

<script src="./dist/index.min.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
  let test = document.querySelector('#test')
  
  let observer = new MObserver()
  // 观察 #test 节点的 title 属性
  observer.attribute(test, function(mutationList, observer) {
    console.log(mutationList);
  }, 'test-title')
  
  // 监视指定目标（#editor）节点或子节点树中节点所包含的字符数据的变化
  observer.character('#editor', function(mutationList, observer) {
    console.log(mutationList)
  }, 'editor-charcater')
</script>
```

# API

更多细节请参考 
[MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 和 
[MutationObserverInit](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)

API|说明|用法|返回值
:-|:-|:-|:-
`get prefix`|获取被观察节点的 `dataset` 属性的前缀|`let prefix = observer.prefix`|`String`
`set prefix`|设置被观察节点的 `dataset` 属性的前缀|`observer.prefix = 'zc'`|
`uuid`|生成 32 位长度的字符串|`observer.uuid()`
`observe`|观察指定节点。childList，attributes 或者 characterData 三个属性之中，至少有一个必须为 true，否则会抛出 TypeError 异常|`observer.observe(target, callback, config, name)`|`{ name, observer }`
`observeAll`|观察指定节点。childList，attributes 或者 characterData 三个属性均为 true|`observer.observeAll(target, callback, filter, name)`|`{ name, observer }`
`attribute`|观察指定节点的 attribute 属性|`observer.attribute(target, callback, name)`|`{ name, observer }`
`attributeChild`|观察指定节点及其后代节点的 attribute 属性|`observer.attributeChild(target, callback, name)`|`{ name, observer }`
`attributeFilter`|观察指定节点特定的 attribute 属性|`observer.attributeFilter(target, callback, filter, name)`|`{ name, observer }`
`attributeFilterChild`|观察指定节点及后代节点特定的 attribute 属性|`observer.attributeFilterChild(target, callback, filter, name)`|`{ name, observer }`
`node`|观察指定节点的 子节点 的添加或删除|`observer.node(target, callback, name)`|`{ name, observer }`
`nodeChild`|观察指定节点的 子节点和后代节点 的添加或删除|`observer.nodeChild(target, callback, name)`|`{ name, observer }`
`character`|监视指定节点或子节点树中节点所包含的字符数据的变化|`observer.character(target, callback, name)`|`{ name, observer }`
`takeRecords`|返回已检测到但尚未由观察者的回调函数处理的所有匹配DOM更改的列表，使变更队列保持为空。当 name 为 null 时，清空 target 的所有观察者的未处理函数列队|`observer.takeRecords(target, name)`|`{ name: MutationRecordArray }`
`disconnect`|暂停观察者。当 name 为 null 时，暂停 target 的所有观察者|`observer.disconnect(target, name)`|`true`/`false`
`reconnect`|重启观察者。在停止对节点进行观察后，可通过此方法重新开启观察。当 name 为 null 时，重启 target 的所有观察者|`observer.reconnect(target, name)`|`true`/`false`
`remove`|注销观察者。当 name 为 null 时，注销 target 的所有观察者|`observer.remove(target, name)`|`true`/`false`
`clear`|注销所有观察者|`observer.clear()`|`true`/`false`


### 参数说明

参数|说明|类型|默认值
:-|:-|:-|:-
`target`|被观察的 HTML 节点|`String`：节点选择器；`Element`：节点对象|
`callback`|当观察到变动时执行的回调函数|`Function`|
`config`|观察器的配置，详情参考 [MutationObserverInit](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit)|`Object`|`{}`
`filter`|MutationObserverInit.attributeFilter 的值|`Array`|`[]`
`name`|绑定的 MutationObserver 实例的变量名|`String`|`observer.uuid()`

> 备注：必须确保 name 的唯一性，否则之前的 MutationObserver 实例存在被覆盖的风险，被覆盖的实例将被注销


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

observer.attributeFilter(test, function(mutationList, observer) {
  console.log(mutationList)
}, ['title'], 'test-attribute-filter')

// 自定义观察
observer.observe('#editor', function(mutationList, observer) {
  console.log(mutationList)
}, {
  attributes: true,
  childList: true,
  subtree: true
}, 'editor-observe')

// 终止自定义观察
observer.disconnect('#editor', 'editor-observe')
```

## demo

更多详情请查看 [demo](https://github.com/clinfc/m-observer/tree/master/demo)