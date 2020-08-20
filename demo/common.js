// 将 mutationList 显示到页面
function showMutationList(target, data = {}) {
  let el = document.querySelector(target)
  let temp = {}
  for (let k in data) {
    if (['addedNodes', 'removedNodes'].includes(k)) {
      temp[k] = []
      data[k].forEach(e => {
        temp[k].push(e.outerHTML)
      })
    } else if ('target' === k) {
      temp[k] = data[k].outerHTML
    } else if (['previousSibling', 'nextSibling'].includes(k)) {
      if (data[k]) {
        temp[k] = data[k].outerHTML
      } else {
        temp[k] = `${data[k]}`
      }
    } else {
      temp[k] = `${data[k]}`
    }
  }
  el.innerText = JSON.stringify(temp, undefined, 2)
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
