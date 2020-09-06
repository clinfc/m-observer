function toString(data) {
  let temp = {}
  for (let k in data) {
    if (['addedNodes', 'removedNodes'].includes(k)) {
      temp[k] = []
      data[k].forEach(e => {
        temp[k].push(e.id ? `nodeId: ${e.id}` : `nodeName: ${e.nodeName}`)
      })
    } else if ('target' === k) {
      temp[k] = data[k].id ? `nodeId: ${data[k].id}` : `nodeName: ${data[k].nodeName}`
    } else if (['previousSibling', 'nextSibling'].includes(k)) {
      if (data[k]) {
        temp[k] = data[k].id ? `nodeId: ${data[k].id}` : `nodeName: ${data[k].nodeName}`
      } else {
        temp[k] = `${data[k]}`
      }
    } else {
      temp[k] = `${data[k]}`
    }
  }
  return temp
}

// 将 mutationList 显示到页面
function showMutationList(target, data = {}) {
  let el = document.querySelector(target)
  data = Array.isArray(data) ? data.map(item => toString(item)) : toString(data)
  el.insertAdjacentHTML('afterbegin', `<pre>${JSON.stringify(data, undefined, 2)}</pre>`)
}

// 停止观察
function disconnect(target, callback) {
  MObserver.disconnect(target, callback)
}

// 重新开始观察
function reconnect(target, callback) {
  MObserver.reconnect(target, callback)
}

// 移除观察
function remove(target, callback) {
  MObserver.remove(target, callback)
}
