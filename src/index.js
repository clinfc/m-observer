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
function setData(el, callback, config, observer) {
  let data = initData(el)
  let old = data.get(callback)
  if (old && old.observer) {
    old.observer.disconnect()
  }
  data.set(callback, { callback, config, observer })
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
 * @return {observer} MutationObserver实例
 */
export function observe(target, callback, config) {
  let el = selector(target)
  if (!fns.isFunction(callback)) {
    throw new Error('无效的观察回到函数！')
  }
  let observer = new MutationObserver(callback)
  observer.observe(el.el, config)
  setData(el, callback, config, observer)
  return observer
}

/**
 * 监听元素的属性值变更
 * 
 * @param {Element|Node|String} target 被监听的节点  
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @param {Boolean} subtree 是否观察子节点
 * @return {observer} MutationObserver实例
 */
export function attribute(target, callback, subtree = false) {
  let config = {
    subtree: !!subtree,
    attributes: true,
    attributeOldValue: true
  }
  return observe(target, callback, config)
}

/**
 * 监听元素的特定属性名称
 * 
 * @param {Element|Node|String} target 被监听的节点
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @param {Array} filter 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知
 * @param {Boolean} subtree 是否观察子节点
 * @return {observer} MutationObserver实例
 */
export function attributeFilter(target, callback, filter, subtree = false) {
  let config = {
    subtree: !!subtree,
    attributes: true,
    attributeFilter: filter,
    attributeOldValue: true
  }
  return observe(target, callback, config)
}

/**
 * 监视目标节点的子节点的添加或删除
 * 
 * @param {Element|Node|String} target 被监听的节点 
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @param {Boolean} subtree 是否观察子节点
 * @return {observer} MutationObserver实例
 */
export function childList(target, callback, subtree = false) {
  let config = {
    subtree: !!subtree,
    childList: true,
  }
  return observe(target, callback, config)
}

/**
 * 监视指定目标节点或子节点树中节点所包含的字符数据的变化
 * 
 * @param {Element|Node|String} target 被监听的节点
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @return {observer} MutationObserver实例
 */
export function character(target, callback) {
  let config = {
    subtree: true,
    characterData: true,
    characterDataOldValue: true,
  }
  return observe(target, callback, config)
}

/**
 * 从MutationObserver的通知队列中删除所有待处理的通知，并将它们返回到MutationRecord对象的新Array中
 * 
 * @param {Element|Node|String} target  
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @return {Array}
 */
export function takeRecords(target, callback) {
  let el = selector(target)
  let { observer } = getData(el, callback)
  if (observer instanceof MutationObserver) {
    return observer.takeRecords()
  }
  return []
}

/**
 * 告诉观察者停止观察变动，返回还未处理的通知
 * 
 * @param {Element|Node|String} target 被监听的节点 
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @return {Array}
 */
export function disconnect(target, callback) {
  let el = selector(target)
  let { observer } = getData(el, callback)
  let temp = []
  if (observer) {
    temp = observer.takeRecords()
    observer.disconnect()
  }
  return temp
}

/**
 * 告诉观察者重新开始观察行为
 * 
 * @param {Element|Node|String} target 被监听的节点 
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @return {observer} MutationObserver实例
 */
export function reconnect(target, callback) {
  let el = selector(target)
  let { observer, config } = getData(el, callback)
  if (!(observer instanceof MutationObserver)) {
    throw new Error('该监听器不存在（未定义或已被移除）！')
  }
  observer.observe(el.el, config)
  return observer
}

/**
 * 移除观察者，返回还未处理的通知
 * 
 * @param {Element|Node|String} target 被监听的节点 
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @return {Array}
 */
export function remove(target, callback) {
  let el = selector(target)
  let { observer } = getData(el, callback, true)
  if (observer instanceof MutationObserver) {
    let temp = observer.takeRecords()
    observer.disconnect()
    return temp
  }
  return []
}