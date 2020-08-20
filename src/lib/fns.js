// 类型判断：函数
export function isFunction(target) {
  return typeof target === 'function'
}

// 类型判断：字符串
export function isString(target) {
  return typeof target === 'string'
}

// 类型判断：Node 节点
export function isNode(target) {
  return target instanceof Node
}

// 类型判断：Element 元素
export function isElement(target) {
  return target instanceof Element
}

// 类型判断：MutationObserver 实例
export function isMO(target) {
  return target instanceof MutationObserver
}