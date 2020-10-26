/**
 * @author fangzhicong
 * @deprecated 变种的
 */

import { remove } from "./normal"
import { Selecter, $ } from "../util/dom-query"
import { data, EachCallback } from "../util/data"

function packgingCall(eachcall: EachCallback) {
    return function (mutations: MutationRecord[], observer: MutationObserver) {
        for (let mutation of mutations) {
            eachcall(mutation, observer)
        }
    }
}

/**
 * 绑定监听，自定义配置项。回调函数的第一个参数为 MutationRecord
 * @param target 被监听的 Element/Node 元素
 * @param callback 监听到变化时执行的回调
 * @param option 监听配置项
 */
export function eobserve(target: Selecter, eachcall: EachCallback, option: MutationObserverInit) {
    // 如果该回调已被绑定过，移除历史绑定
    remove(target, eachcall)

    // 封装成标准的回到
    const callback = packgingCall(eachcall)

    const query = $(target)

    // 绑定监听
    const observer = new MutationObserver(callback)
    observer.observe(query.target, option)

    // 缓存数据
    data(query, eachcall, { callback, observer, option })
}

/**
 * 绑定监听，监听所有变化。回调函数的第一个参数为 MutationRecord
 * @param target 被监听的 Element/Node 元素
 * @param callback 监听到变化时执行的回调
 * @param filter attributeFilter
 */
export function eobserveAll(target: Selecter, eachcall: EachCallback, filter?: string[]) {
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
    eobserve(target, eachcall, option)
}

/**
 * 绑定监听，监听 attribute 变化。回调函数的第一个参数为 MutationRecord
 * @param target 被监听的 Element/Node 元素
 * @param callback 监听到变化时执行的回调
 * @param subtree 是否将监视范围扩展至目标节点整个节点树中的所有节点
 */
export function eattribute(target: Selecter, eachcall: EachCallback, subtree: boolean = false) {
    const option: MutationObserverInit = {
        subtree: subtree,
        attributes: true,
        attributeOldValue: true,
    }
    eobserve(target, eachcall, option)
}

/**
 * 绑定监听，监听指定 attribute 变化。回调函数的第一个参数为 MutationRecord
 * @param target 被监听的 Element/Node 元素
 * @param callback 监听到变化时执行的回调
 * @param filter attributeFilter
 * @param subtree 是否将监视范围扩展至目标节点整个节点树中的所有节点
 */
export function eattributeFilter(target: Selecter, eachcall: EachCallback, filter: string[], subtree: boolean = false) {
    const option: MutationObserverInit = {
        subtree: subtree,
        attributes: true,
        attributeOldValue: true,
        attributeFilter: filter,
    }
    eobserve(target, eachcall, option)
}

/**
 * 绑定监听，监听节点的增减变化。回调函数的第一个参数为 MutationRecord
 * @param target 被监听的 Element/Node 元素
 * @param callback 监听到变化时执行的回调
 * @param subtree 是否将监视范围扩展至目标节点整个节点树中的所有节点
 */
export function echildList(target: Selecter, eachcall: EachCallback, subtree: boolean = false) {
    const option: MutationObserverInit = {
        subtree: subtree,
        childList: true,
    }
    eobserve(target, eachcall, option)
}

/**
 * 绑定监听，监听文本变化。回调函数的第一个参数为 MutationRecord
 * @param target 被监听的 Element/Node 元素
 * @param callback 监听到变化时执行的回调
 */
export function echaracter(target: Selecter, eachcall: EachCallback) {
    const option: MutationObserverInit = {
        subtree: true,
        characterData: true,
        characterDataOldValue: true,
    }
    eobserve(target, eachcall, option)
}
