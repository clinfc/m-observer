import * as fns from './fns.js'

class element {
  
  // 缓存元素节点的数组
  #elem
  
  get el() {
    return this.#elem
  }
  
  constructor(target) {
    if (target instanceof element) {
      this.#elem = target.el
    }
    else if (fns.isString(target)) {
      this.#elem = document.querySelector(target)
    }
    else if (fns.isNode(target) || fns.isElement(target)) {
      this.#elem = target
    }
    if (!this.el) {
      throw new Error('无效的监听对象！')
    }
  }
  
  /**
   * 绑定数据
   * @param {any} key 键
   * @param {any} value 值
   */
  data(key, value) {
    let dataSource = this.el.dataSource
    if (!dataSource) {
      dataSource = new Map()
      this.el.dataSource = dataSource
    }
    if (value) {
      dataSource.set(key, value)
      return this
    }
    return dataSource.get(key)
  }
}

export default function selector(target) {
  return new element(target)
}