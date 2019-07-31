//app.js


var util = require("/utils/util.js");
var api = require("/utils/api.js");

App({

  onLaunch: function () {
    wx.getSystemInfo({
      success: res => {
        //状态栏的高度
        this.globalData.height = res.statusBarHeight;
        console.log("状态栏的高度高度是多少：" + this.globalData.height);
        this.globalData.screenHeight = res.screenHeight;
        this.globalData.screenWidth = res.screenWidth;
        console.log("屏幕高度是多少：" + this.globalData.screenHeight);
        this.globalData.windowHeight = res.windowHeight;
      }, fail(err) {
        console.log(err);
      }
    })

    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 提前向用户发起授权请求
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.record']) {
          // wx.authorize({
          //   scope: 'scope.userInfo',
          //   success() {
          //     console.log('用户已经同意小程序使用用户信息')
          //     // 用户已经同意小程序使用用户信息，后续调用 scope.userInfo 接口不会弹窗询问
          //     wx.startRecord()
          //   }
          // })
        }
      }
    })

    // 登录
    wx.login({
      success(res) {
        if (res.code) {
          wx.setStorageSync('wxcode', res.code);
          var data = {
            code: res.code,
          }
          // util.requestPost(api.getWechID, data).then(
          //   res => {
          //     console.log("获取openid的接口是否走成功了");
          //     console.log(res);
          //     if (res.data.success && res.data.code == 200) {
          //       //成功
          //       wx.setStorageSync('openid', res.data.data.openid);
          //       wx.setStorageSync('unionid', res.data.data.unionid);
          //       console.log('获取用户个人信息1')

          //     } else {
          //       //失败了
          //       util.toast(res.data.message);
          //     }
          //   }
          // )
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
      // success: res => {
      //   // 发送 res.code 到后台换取 openId, sessionKey, unionId
      // }
      
    })
  },

  onShow: function(e) {
    console.log('场景值 **----**' + e);
    console.log('场景值' + e.scene);
  },

  onLoad: function(options) {
    console.log('app.js获取二维码参数');
    console.log(options);
    const scene = decodeURIComponent(options.scene);
    console.log(scene);
  },

  globalData: {
    userInfo: null,
    share: false,  // 分享默认为false
    height: 0,//状态栏的高度
    screenHeight: 0,//屏幕高度
    screenWidth: 0, //屏幕宽度
    windowHeight: 0,//可使用窗口高度
  }
})