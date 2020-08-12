import * as fns from './fns.js'

class element {
  
  constructor(target) {
    if (target instanceof element) {
      this.el = target.el
    }
    else if (fns.isString(target)) {
      this.el = document.querySelector(target)
    }
    else if (fns.isNode(target) || fns.isElement(target)) {
      this.el = target
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
  data(key, value = undefined) {
    let dataSource = this.el.dataSource
    if (!dataSource) {
      dataSource = new Map()
      this.el.dataSource = dataSource
    }
    if (value !== undefined) {
      dataSource.set(key, value)
      return this
    }
    return dataSource.get(key)
  }
}

export default function selector(target) {
  return new element(target)
}