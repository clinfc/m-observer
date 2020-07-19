/**
 * 对 MutationObserver 的封装，简化其使用方式
 */
class MObserver {
  
  #cache
  
  #prefix = 'zc'
  
  constructor() {
    this.#cache = new Map()
  }
  
  get prefix() {
    return this.#prefix
  }
  
  set prefix(value) {
    this.#prefix = typeof value === 'string' && value.length ? value : 'zc'
  }
  
  /**
   * MutationObser 支持的配置项
   * 
   * https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit
   */
  get #config() {
    return {
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
  }
  
  /**
   * 生成唯一字符串
   */
  get uuid() {
    return [
      Math.random().toString(16).slice(2),
      new Date().getTime().toString(16),
      Math.random().toString(16).slice(2),
    ].join('').slice(2, 34)
  }
  
  get #dataset() {
    return `${this.prefix}Mobserver`
  }
  
  /**
   * 获取 target / 判断 target 的有效性
   * 
   * @param {Element|String} target 
   * @return {Elment}
   */
  getTarget(target) {
    if (typeof target === 'string') {
      target = document.querySelector(target)
    }
    if (!target || !(target instanceof HTMLElement)) {
      throw new Error('无效的 target！')
    }
    return target
  }
  
  /**
   * 获取 HTML 标签绑定的 cacheKey
   * @param {Element|String} target 
   */
  getCacheKey(target) {
    target = this.getTarget(target)
    let cacheKey = target.dataset[this.#dataset]
    if (!cacheKey) {
      cacheKey = this.uuid
      target.dataset[this.#dataset] = cacheKey
    }
    return cacheKey
  }
  
  /**
   * 鉴定绑定
   * 
   * @param {Element|String} target 需要监听的 Element 元素
   * @param {Function} callback
   * @param {String} name  当前绑定的 MutationObserver 实例名
   * @return {Object} 返回包含有 MutationObserver实例名 和 MutationObserver实例 的对象
   */
  #observer(target, callback, name) {
    let cacheKey = this.getCacheKey(target)
    let observer = new MutationObserver(callback || function(list) {
      console.log(list)
    })
    let mos = this.#cache.get(cacheKey) || {}
    name = name || cacheKey
    mos[name] = observer
    this.#cache.set(cacheKey, mos)
    return { name, observer }
  }
  
  /**
   * 告诉观察者停止观察变动
   * 
   * @param {Element|String} target  
   * @param {String|null} name MutationObserver 实例名。如果 name 为 null，则停止观察绑定的全部 MutationObserver 实例 
   * @return {Boolean}
   */
  disconnect(target, name = '') {
    let cacheKey = this.getCacheKey(target)
    let mos = this.#cache.get(cacheKey)
    if (mos) {
      if (name === null) {
        Object.values(mos).forEach(mo => {
          mo.disconnect()
        })
        return true
      }
      if (name && mos[name]) {
        mos[name].disconnect()
        return true
      }
    }
    return false
  }
  
  /**
   * 返回已检测到但尚未由观察者的回调函数处理的所有匹配DOM更改的列表，使变更队列保持为空
   * 
   * @param {Element|String} target  
   * @param {String|null} name MutationObserver 实例名。如果 name 为 null，则停止观察绑定的全部 MutationObserver 实例 
   * @return {Object} 返回一个由 MutationObserver实例名为键 和 MutationRecord对象列表为值 构成的一个对象
   */
  takeRecords(target, name = '') {
    let cacheKey = this.getCacheKey(target)
    let mos = this.#cache.get(cacheKey)
    let temp = {}
    if (mos) {
      if (name === null) {
        for(let mo in mos) {
          temp[mo] = mos[mo].takeRecords()
        }
      }
      if (name && mos[name]) {
        temp[name] = mos[name].takeRecords()
      }
    }
    return temp
  }
  
  #observe(target, callback, config, name) {
    target = this.getTarget(target)
    
    let ob = this.#observer(target, callback, name)
    ob.observer.observe(target, config)
    
    return ob
  }
  
  /**
   * 对 MutationObserver.prototype.observe 的封装
   */
  observe(target, callback, config = {}, name = '') {
    config = Object.assign(this.#config, config || {})
    return this.#observe(target, callback, config, name)
  }
  
  attributes(target, callback, config = {}, name = '') {
    config = Object.assign(config || {}, { attributes: true })
    return this.#observe(target, callback, config, name)
  }
  
  childList(target, callback, config = {}, name = '') {
    config = Object.assign(config || {}, { childList: true })
    return this.#observe(target, callback, config, name)
  }
  
  subtree(target, callback, config = {}, name = '') {
    config = Object.assign(config || {}, { subtree: true })
    return this.#observe(target, callback, config, name)
  }
  
  character(target, callback, config = {}, name = '') {
    config = Object.assign(config || {}, { characterData: true, characterDataOldValue: true })
    return this.#observe(target, callback, config, name)
  }
}

export default new MObserver()