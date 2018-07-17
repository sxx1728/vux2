
export default {
  fetch (key) {
    let ua = navigator.userAgent
    let loginAts = ua.match(/LoginAt\/([a-zA-Z0-9]+)/)
    let realKey = key
    if (loginAts) {
      realKey = loginAts[1] + key
    }
    console.log(realKey)
    return JSON.parse(window.localStorage.getItem(realKey))
  },
  save (key, items) {
    let ua = navigator.userAgent
    let loginAts = ua.match(/LoginAt\/([a-zA-Z0-9]+)/)
    let realKey = key
    if (loginAts) {
      realKey = loginAts[1] + key
    }
    window.localStorage.setItem(realKey, JSON.stringify(items))
  }
}
