import * as fns from './lib/fns.js'
import selector from './lib/dom.js'

const observeKey = 'm-observer'

const CONFIG = {
  // 设为 true 以观察受监视元素的属性值变更。默认值为 false
  attributes: true,
  // 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知。无默认值
  // attributeFilter: [],
  // 当监视节点的属性改动时，将此属性设为 true 将记录任何有改动的属性的上一个值。有关观察属性更改和值记录的详细信息。无默认值
  attributeOldValue: true,
  // 设为 true 以监视目标节点（如果 subtree 为 true，则包含子孙节点）添加或删除新的子节点。默认值为 false
  childList: true,
  // 设为 true 以将监视范围扩展至目标节点整个节点树中的所有节点。MutationObserverInit 的其他值也会作用于此子树下的所有节点，而不仅仅只作用于目标节点。默认值为 false
  subtree: true,
  // 设为 true 以监视指定目标节点或子节点树中节点所包含的字符数据的变化。无默认值
  characterData: true,
  // 设为 true 以在文本在受监视节点上发生更改时记录节点文本的先前值。无默认值
  characterDataOldValue: true,
}

function initData(el) {
  let mo = el.data(observeKey)
  // 初始化
  if (!mo) {
    mo = new Map()
    el.data(observeKey, mo)
  }
  return mo
}

/**
 * 缓存 监听器实例
 * 
 * @param {element} el
 * @param {any} name
 * @param {MutationObserver} observe
 * @param {Object} option
 */
function setData(el, name, observe, option) {
  let mo = initData(el)
  // 如果已存在同名监听器，销毁旧监听器
  let old = mo.get(name)
  if (old && old.observe) {
    old.observe.disconnect()
  }
  mo.set(name, { observe, option })
}

/**
 * 获取 监听器实例
 * @param {element} el
 * @param {any} name
 */
function getData(el, name) {
  let mo = initData(el)
  return mo.get(name) || {}
}

/**
 * 获取 监听器实例，并删除缓存
 * @param {element} el
 * @param {any} name
 */
function spliceData(el, name) {
  let mo = initData(el)
  let temp = mo.get(name)
  if (temp) {
    mo.delete(name)
    return temp
  }
  return {}
}

/**
 * @param {element} el
 */
function spliceAllData(el) {
  let mo = initData(el)
  let temp = []
  mo.forEach((v, k) => {
    temp.push([k, v])
  })
  mo.clear()
  return temp
}

/**
 * childList，attributes 或者 characterData 三个属性之中，至少有一个必须为 true，否则会抛出 TypeError 异常
 * 
 * @param {Element|Node|String} target 被监听的节点  
 * @param {any} name MutationObserver实例的标记名称
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @param {Object} config MutationObserverInit字典配置项
 * @return {observer} MutationObserver实例
 */
export function observe(target, name, callback, config) {
  let el = selector(target)
  if (!fns.isFunction(callback)) {
    callback = fns.emptyFn
  }
  let ob = new MutationObserver(callback)
  ob.observe(el.el, config)
  setData(el, name, ob, {
    fn: callback,
    config: config
  })
  return ob
}

/**
 * 监听 target 的所有配置项
 * 
 * @param {Element|Node|String} target 被监听的节点  
 * @param {any} name MutationObserver实例的标记名称
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @param {Array} filter 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知
 * @return {observer} MutationObserver实例
 */
export function observeAll(target, name, callback, filter = null) {
  let config = Object.assign({}, CONFIG, Array.isArray(filter) && filter.length ? { attributeFilter: filter } : {})
  return observe(target, name, callback, config)
}

/**
 * 监听元素的属性值变更
 * 
 * @param {Element|Node|String} target 被监听的节点  
 * @param {any} name MutationObserver实例的标记名称
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @return {observer} MutationObserver实例
 */
export function attribute(target, name, callback) {
  let config = {
    attributes: true,
    attributeOldValue: true
  }
  return observe(target, name, callback, config)
}

/**
 * 监听元素及其后代元素的属性值变更
 * 
 * @param {Element|Node|String} target 被监听的节点  
 * @param {any} name MutationObserver实例的标记名称
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @return {observer} MutationObserver实例
 */
export function attributeChild(target, name, callback) {
  let config = {
    subtree: true,
    attributes: true,
    attributeOldValue: true
  }
  return observe(target, name, callback, config)
}

/**
 * 监听元素的特定属性名称
 * 
 * @param {Element|Node|String} target 被监听的节点  
 * @param {any} name MutationObserver实例的标记名称
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @param {Array} filter 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知
 * @return {observer} MutationObserver实例
 */
export function attributeFilter(target, name, callback, filter) {
  let config = {
    attributes: true,
    attributeFilter: filter,
    attributeOldValue: true
  }
  return observe(target, name, callback, config)
}

/**
 * 监听元素及其后代元素的特定属性名称
 * 
 * @param {Element|Node|String} target 被监听的节点  
 * @param {any} name MutationObserver实例的标记名称
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @param {Array} filter 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知
 * @return {observer} MutationObserver实例
 */
export function attributeFilterChild(target, name, callback, filter) {
  let config = {
    subtree: true,
    attributes: true,
    attributeFilter: filter,
    attributeOldValue: true
  }
  return observe(target, name, callback, config)
}

/**
 * 监视目标节点的子节点的添加或删除
 * 
 * @param {Element|Node|String} target 被监听的节点  
 * @param {any} name MutationObserver实例的标记名称
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @return {observer} MutationObserver实例
 */
export function node(target, name, callback) {
  return observe(target, name, callback, { childList: true })
}

/**
 * 监视目标节点的后代节点的添加或删除
 * 
 * @param {Element|Node|String} target 被监听的节点  
 * @param {any} name MutationObserver实例的标记名称
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @return {observer} MutationObserver实例
 */
export function nodeChild(target, name, callback) {
  let config = {
    subtree: true,
    childList: true,
  }
  return observe(target, name, callback, config)
}

/**
 * 监视指定目标节点或子节点树中节点所包含的字符数据的变化
 * 
 * @param {Element|Node|String} target 被监听的节点  
 * @param {any} name MutationObserver实例的标记名称
 * @param {Function} callback 当观察到变动时执行的回调函数
 * @return {observer} MutationObserver实例
 */
export function character(target, name, callback) {
  let config = {
    subtree: true,
    characterData: true,
    characterDataOldValue: true,
  }
  return observe(target, name, callback, config)
}

/**
 * 从MutationObserver的通知队列中删除所有待处理的通知，并将它们返回到MutationRecord对象的新Array中
 * 
 * @param {Element|Node|String} target  
 * @param {any} name MutationObserver实例的标记名称
 * @return {Array}
 */
export function takeRecords(target, name) {
  let el = selector(target)
  let { observe } = getData(el, name)
  if (observe) {
    return observe.takeRecords()
  }
  return []
}

/**
 * 告诉观察者停止观察变动，返回还未处理的通知
 * 
 * @param {Element|Node|String} target 被监听的节点 
 * @param {any} name MutationObserver实例的标记名称
 * @return {Array}
 */
export function disconnect(target, name) {
  let el = selector(target)
  let { observe } = getData(el, name)
  let temp = []
  if (observe) {
    temp = observe.takeRecords()
    observe.disconnect()
  }
  return temp
}

/**
 * 告诉观察者重新开始观察行为
 * 
 * @param {Element|Node|String} target 被监听的节点 
 * @param {any} name MutationObserver实例的标记名称
 * @return {observer} MutationObserver实例
 */
export function reconnect(target, name) {
  let el = selector(target)
  let { observe, option } = getData(el, name)
  if (!observe) {
    throw new Error('该监听器不存在（未定义或已被移除）！')
  }
  observe.observe(el.el, option.config)
  return observe
}

/**
 * 移除观察者，返回还未处理的通知
 * 
 * @param {Element|Node|String} target 被监听的节点 
 * @param {any} name MutationObserver实例的标记名称
 * @return {Array}
 */
export function remove(target, name) {
  let el = selector(target)
  let { observe } = spliceData(el, name)
  if (observe) {
    let temp = observe.takeRecords()
    observe.disconnect()
    return temp
  }
  return []
}

/**
 * 移除所有观察者
 * 
 * @param {Element|Node|String} target 被监听的节点
 */
export function clear(target) {
  let el = selector(target)
  let values = spliceAllData(el)
  values.forEach(row => {
    row[1].observe.disconnect()
  })
}