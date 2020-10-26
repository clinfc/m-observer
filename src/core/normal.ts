/**
 * @author fangzhicong
 * @deprecated 标准的
 */

import { Selecter, $ } from "../util/dom-query"
import { data, EachCallback } from "../util/data"

/**
 * 绑定监听，自定义配置项。回调函数的第一个参数为 MutationRecord[]
 * @param target 被监听的 Element/Node 元素
 * @param callback 监听到变化时执行的回调
 * @param option 监听配置项
 */
export function observe(target: Selecter, callback: MutationCallback, option: MutationObserverInit) {
    // 如果该回调已被绑定过，移除历史绑定
    remove(target, callback)
    const query = $(target)

    // 绑定监听
    const observer = new MutationObserver(callback)
    observer.observe(query.target, option)

    // 缓存数据
    data(query, callback, { callback, observer, option })
}

/**
 * 绑定监听，监听所有变化。回调函数的第一个参数为 MutationRecord[]
 * @param target 被监听的 Element/Node 元素
 * @param callback 监听到变化时执行的回调
 * @param filter attributeFilter
 */
export function observeAll(target: Selecter, callback: MutationCallback, filter?: string[]) {
    const option: MutationObserverInit = {
        subtree: true,
        childList: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
    }
    if (Array.isArray(filter)) {
        option.attributeFilter = filter
    }
    observe(target, callback, option)
}

/**
 * 绑定监听，监听 attribute 变化。回调函数的第一个参数为 MutationRecord[]
 * @param target 被监听的 Element/Node 元素
 * @param callback 监听到变化时执行的回调
 * @param subtree 是否将监视范围扩展至目标节点整个节点树中的所有节点
 */
export function attribute(target: Selecter, callback: MutationCallback, subtree: boolean = false) {
    const option: MutationObserverInit = {
        subtree: subtree,
        attributes: true,
        attributeOldValue: true,
    }
    observe(target, callback, option)
}

/**
 * 绑定监听，监听指定 attribute 变化。回调函数的第一个参数为 MutationRecord[]
 * @param target 被监听的 Element/Node 元素
 * @param callback 监听到变化时执行的回调
 * @param filter attributeFilter
 * @param subtree 是否将监视范围扩展至目标节点整个节点树中的所有节点
 */
export function attributeFilter(target: Selecter, callback: MutationCallback, filter: string[], subtree: boolean = false) {
    const option: MutationObserverInit = {
        subtree: subtree,
        attributes: true,
        attributeOldValue: true,
        attributeFilter: filter,
    }
    observe(target, callback, option)
}

/**
 * 绑定监听，监听节点的增减变化。回调函数的第一个参数为 MutationRecord[]
 * @param target 被监听的 Element/Node 元素
 * @param callback 监听到变化时执行的回调
 * @param subtree 是否将监视范围扩展至目标节点整个节点树中的所有节点
 */
export function childList(target: Selecter, callback: MutationCallback, subtree: boolean = false) {
    const option: MutationObserverInit = {
        subtree: subtree,
        childList: true,
    }
    observe(target, callback, option)
}

/**
 * 绑定监听，监听文本变化。回调函数的第一个参数为 MutationRecord[]
 * @param target 被监听的 Element/Node 元素
 * @param callback 监听到变化时执行的回调
 */
export function character(target: Selecter, callback: MutationCallback) {
    const option: MutationObserverInit = {
        subtree: true,
        characterData: true,
        characterDataOldValue: true,
    }
    observe(target, callback, option)
}

/**
 * 重连监听
 * @param target DOM 节点 / DOM 节点选择器
 * @param call 监听回调
 */
export function reconnect(target: Selecter, call: MutationCallback | EachCallback) {
    const query = $(target)
    const cache = data(query, call)
    if (cache) {
        const { observer, option } = cache
        observer.observe(query.target, option)
    } else {
        throw new Error("该监听器不存在")
    }
}

/**
 * 断开监听，断开后可重连
 * @param target DOM 节点 / DOM 节点选择器
 * @param call 监听回调
 */
export function disconnect(target: Selecter, call: MutationCallback | EachCallback) {
    const cache = data($(target), call)
    if (cache) {
        const { observer, callback } = cache
        let mutations = observer.takeRecords()
        mutations.length && callback(mutations, observer)
        observer.disconnect()
    }
}

/**
 * 移除监听，移除后不可重连
 * @param target DOM 节点 / DOM 节点选择器
 * @param call 监听回调
 */
export function remove(target: Selecter, call: MutationCallback | EachCallback) {
    const cache = data($(target), call, null)
    if (cache) {
        const { observer, callback } = cache
        let mutations = observer.takeRecords()
        mutations.length && callback(mutations, observer)
        observer.disconnect()
    }
}
