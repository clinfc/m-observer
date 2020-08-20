import * as fns from './lib/fns.js'
import selector from './lib/dom.js'

// 缓存器的键名
const observerKey = 'm-observer'

// 初始化缓存器
function initData(el) {
  let mo = el.data(observerKey)
  // 初始化
  if (!mo) {
    mo = new Map()
    el.data(observerKey, mo)
  }
  return mo
}

// 保存数据
function setData(el, callback, data) {
  let da = initData(el)
  let old = da.get(callback)
  if (old && old.observer) {
    let list = old.observer.takeRecords()
    old.callback(list, old.observer)
    old.observer.disconnect()
  }
  da.set(callback, data)
}


// 获取数据
function getData(el, callback, clean = false) {
  let data = initData(el)
  let temp = data.get(callback)
  // 清理数据
  if (clean) {
    data.delete(callback)
  }
  return temp || {}
}

/**
 * childList，attributes 或者 characterData 三个属性之中，至少有一个必须为 true，否则会抛出 TypeError 异常
 * 
 * @param {Element|Node|String} target 被监听的节点  
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @param {Object} config MutationObserverInit字典配置项
 */
export function observe(target, callback, config) {
  let el = selector(target)
  if (!fns.isFunction(callback)) {
    throw new Error('无效的观察回到函数！')
  }
  let fn = function(mutationsList, ob) {
    for(let mutationRecord of mutationsList) {
      callback(mutationRecord, ob)
    }
  }
  let observer = new MutationObserver(fn)
  observer.observe(el.el, config)
  setData(el, callback, { config, fn, observer })
}

/**
 * 监听元素的属性值变更
 * 
 * @param {Element|Node|String} target 被监听的节点  
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @param {Boolean} subtree 是否观察子节点
 */
export function attribute(target, callback, subtree = false) {
  let config = {
    subtree: !!subtree,
    attributes: true,
    attributeOldValue: true
  }
  observe(target, callback, config)
}

/**
 * 监听元素的特定属性名称
 * 
 * @param {Element|Node|String} target 被监听的节点
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @param {Array} filter 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知
 * @param {Boolean} subtree 是否观察子节点
 */
export function attributeFilter(target, callback, filter, subtree = false) {
  let config = {
    subtree: !!subtree,
    attributes: true,
    attributeFilter: filter,
    attributeOldValue: true
  }
  observe(target, callback, config)
}

/**
 * 监视目标节点的子节点的添加或删除
 * 
 * @param {Element|Node|String} target 被监听的节点 
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @param {Boolean} subtree 是否观察子节点
 */
export function childList(target, callback, subtree = false) {
  let config = {
    subtree: !!subtree,
    childList: true,
  }
  observe(target, callback, config)
}

/**
 * 监视指定目标节点或子节点树中节点所包含的字符数据的变化
 * 
 * @param {Element|Node|String} target 被监听的节点
 * @param {Function} callback 当观察到变动时执行的回调函数
 */
export function character(target, callback) {
  let config = {
    subtree: true,
    characterData: true,
    characterDataOldValue: true,
  }
  observe(target, callback, config)
}

/**
 * 告诉观察者停止观察变动，返回还未处理的通知
 * 
 * @param {Element|Node|String} target 被监听的节点 
 * @param {Function} callback 当观察到变动时执行的回调函数
 */
export function disconnect(target, callback) {
  let el = selector(target)
  let { observer, fn } = getData(el, callback)
  if (fns.isMO(observer)) {
    let list = observer.takeRecords()
    fn(list, observer)
    observer.disconnect()
  }
}

/**
 * 告诉观察者重新开始观察行为
 * 
 * @param {Element|Node|String} target 被监听的节点 
 * @param {Function} callback 当观察到变动时执行的回调函数
 */
export function reconnect(target, callback) {
  let el = selector(target)
  let { observer, config } = getData(el, callback)
  if (!fns.isMO(observer)) {
    throw new Error('该监听器不存在（未定义或已被移除）！')
  }
  observer.observe(el.el, config)
}

/**
 * 移除观察者，返回还未处理的通知
 * 
 * @param {Element|Node|String} target 被监听的节点 
 * @param {Function} callback 当观察到变动时执行的回调函数
 */
export function remove(target, callback) {
  let el = selector(target)
  let { observer, fn } = getData(el, callback, true)
  if (fns.isMO(observer)) {
    let list = observer.takeRecords()
    fn(list, observer)
    observer.disconnect()
  }
}