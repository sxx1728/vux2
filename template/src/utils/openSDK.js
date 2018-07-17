let bridgeConfig = {
  bridgeWebViewDelay: 0.2 * 1000,
  callHandle: {}, // bridge android / ios
  silent: false
}

let $bridge = {
  registerHandler: function (name, callback) {
    if (bridgeConfig.silent) {
      console.log(name, 'register handler failure')
    }
  },
  callHandler: function (name, params, callback) {
    if (bridgeConfig.silent) {
      console.log(name, 'call handler webView failure')
    }
  }
}

// ============ device init operation start ===========
/* setup WebView Javascript Bridge for ios , ios 初始化 */
function setupWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge) }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'wvjbscheme://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
}

/* 用于创建桥接对象的函数 , android 初始化 */
function connectWebViewJavascriptBridge (callback) {
    // 如果桥接对象已存在，则直接调用callback函数
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else { // 否则添加一个监听器来执行callback函数
    document.addEventListener('WebViewJavascriptBridgeReady', function () {
      callback(WebViewJavascriptBridge)
    }, false)
  }
}

/* device detect for ios/android */
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
  setupWebViewJavascriptBridge(function (bridge) {
    $bridge = bridge
  })
} else if (/(Android)/i.test(navigator.userAgent)) {
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.init()
    $bridge = bridge
  })
}

let bridge = {
  registerHandler: function (name, callback) {
    if ($bridge['registerHandler']) {
      setTimeout(function () {
        $bridge.registerHandler(name, callback)
      }, bridgeConfig.bridgeWebViewDelay)
    } else {
      console.log("don't built-in WebView invoking ", name, '{registerHandler}')
    }
  },

  callHandler: function (name, params, callback) {
    if ($bridge['callHandler']) {
      $bridge.callHandler(name, params, function (data) {
        if (typeof callback === 'function') {
            /* 解决部分系统加载延迟导致 ios/android 不响应问题 */
          setTimeout(function () {
            callback(data)
          }, bridgeConfig.bridgeWebViewDelay)
        }
      })
    } else {
      console.log("don't built-in WebView invoking ", name, '{callHandler}')
    }
  }
}
var openSDK = {
  install: function (Vue) {
    Vue.prototype.$openSDK = this
    Vue.openSDK = this

        // config
    bridgeConfig.slient = Vue.config.slient
  },

  inHotTalk: function (failed) {
    let ua = navigator.userAgent
    console.log(ua)
    if (ua == null || ua.indexOf('HotTalk') < 0) {
      failed('请在HotTalk运行')
    }
  },

  login: function (appUid, succeed, failed) {
    this.inHotTalk(failed)
    setTimeout(function () {
      bridge.callHandler('nativeGetCode', { appUid: appUid }, succeed)
    }, 0.2 * 1000)
  },

  pay: function (data, succeed, failed) {
    this.inHotTalk(failed)
    try {
      bridge.registerHandler('paySucceed', succeed)
    } catch (err) {
      failed('registerHanler错误:' + err)
    }

    bridge.callHandler('nativePay', data, failed)
  },
  shareWx: function (wxStr, wxType, succeed, failed) {
    console.log('go in  sharewx !!!')
    this.inHotTalk(failed)
    setTimeout(function () {
      bridge.callHandler('nativeShare', { content: wxStr, type: wxType }, succeed)
    }, 0.2 * 1000)
  }
}

module.exports = openSDK
