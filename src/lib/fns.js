// 空函数
export function emptyFn() {}

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