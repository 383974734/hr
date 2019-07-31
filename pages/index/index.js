//index.js
//mm: sunting1990
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js");
var api = require("../../utils/api.js");
var userInfo = null;
Page({
  data: {

    // 此页面 页面内容距最顶部的距离
    navheight: app.globalData.height, 
    screenWidth: app.globalData.screenWidth,
    screenHeight: app.globalData.screenHeight,
    phone: "",
    flag: true,

    
    AuthorizedLogin: '授权登录',
    UserPhone: '手机号授权',
    lee: "",
    isshare: 0,//用来判断是否是微信分享进入的页面

    inviteCode: "",
    focus: false,//true,
    disabled: false,
    agreement: true,
    // 飘起来的view
    showDialog: true,

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  //事件处理函数
  bindViewTap: function() {
    wx.setNavigationBarTitle({
      title: 'HR私享汇圈',
    })
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  
  onLoad: function (options) {
    if (options.isshare == 1) {
      this.setData({
        isshare: options.isshare
      })
    }else {
      this.loginData(options);
    }    
  },


  /**
   *  微信校验登录接口   这个是在登录的情况下 才会走的接口   为了获取 token和 memberid
   */
  loginData: function (options) {
    var isLogin = wx.getStorageSync('isLogin');
    console.log(isLogin);
    if (isLogin == "login_y") {
      wx.switchTab({
        url: '../home/home',
      })
    }else {
      console.log('获取二维码参数');
      console.log(options);
      if (options.scene) {
        //获取二维码的携带的链接信息
        console.log('获取二维码的携带的链接信息');
        let scene = decodeURIComponent(options.scene)
        console.log(scene)
        this.setData({
          //获取链接中的参数信息
          inviteCode: scene
        })
      }
    }
  },



  getUserInfo: function(e) {
    console.log('这个地方还会走啊')
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  phoneInput: function (e) {
    wx.setStorageSync('phone', e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },

  sendCode: function (e) {
    if (this.data.agreement != true) {
      util.toast("请阅读用户服务协议");
      return;
    }
    if (this.data.phone.length == 0) {
      util.toast('手机号不能为空');
      return;
    } else if (!(/^1[34578]\d{9}$/.test(this.data.phone))) {
      util.toast('手机号输入错误');
      return;
    }
    var that = this
    that.setData({
      disabled: true
    })
    if (e.detail.errMsg == "getUserInfo:ok") {
      
      //用户同意授权获取信息
      userInfo = e.detail.rawData;
      
      wx.setStorageSync('userInfo', userInfo);
      
      var data = {
        phone: this.data.phone,
        type: '登录'
      }


      console.log("走获取验证码接口");
      // 获取验证码接口
      util.requestPost(api.getVerificationCode, data).then(
        res => {
          console.log("取验证码接口是否走成功了");
          that.setData({
            disabled: false
          })

          if (res.data.success && res.data.code == 200) {
            //成功
            wx.navigateTo({
              url: '../revcode/revcode?inviteCode=' + that.data.inviteCode,
            })

          } else {
            //失败了
            wx.showModal({
              title: 'HR私享汇圈',
              content: res.data.message,
            })
          }
        }
      ).catch(
        error => {
          
          that.setData({
            disabled: false
          })
        }
      )
    } else {
      this.setData({
        disabled: false
      })
      //用户未同意授权
      wx.showModal({
        title: 'hr私享圈',
        content: '用户需同意授权才可正常操作',
      })
    }
  },

  clearPhone: function () {
    this.setData({
      phone: "",
      focus: true
    })
  },


  /**
   * 跳转到注册页面
   */
  pushRegister: function(e) {

    wx.scanCode({
      success(res) {
        console.log('*******----扫码----******');
        console.log(res);
        console.log(res.path);
        console.log(res.path.split('='));
        console.log(res.path.split('=')[1]);
      }
    })
    return;
    if (this.data.agreement == true) {
      wx.navigateTo({
        // url: '../register/register',
        url: '../newregister/newregister',
      })
    }else {
      util.toast("请阅读用户服务协议");
    }
    
  },

  registertitpush: function() {
    wx.navigateTo({
      url: '../registertit/registertit',
    })
  },

  registertitsele: function() {
    this.setData({
      agreement: !this.data.agreement
    })
  },



  bindload: function (e) {
    console.log('返回值  binderror :' + e.detail.errMsg);
  },

  binderror: function (e) {
    console.log('返回值  binderror :' + e.detail.errMsg);
  },


  //获取用户信息
  bindGetUserInfo: function (e) {

    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      let user = e.detail.userInfo;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(user);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.data.lee
      if (that.data.lee == '') {
        
        wx.showToast({
          icon: "none",
          title: '请继续点击获取手机号',
        }),
          that.setData({
            isHide: true,
            flag: (!that.data.flag),
            lee: true,
            userinfo: user,
          })
        // that.wxlogin();
      } else if (!that.data.lee) {


      }
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
            
          }
        }
      });
    }
  },

  getPhoneNumber: function (e) { //点击获取手机号码按钮
  console.log(e)
    var that = this;
    that.data.lee
    if (that.data.lee == '') {
      wx.showToast({
        icon: "none",
        title: '请先点击获取用户信息',
      })
      return
    } else {
      wx.checkSession({
        success: function (res) {
          var ency = e.detail.encryptedData;
          var iv = e.detail.iv;

          var code = wx.getStorageSync('wxcode')

          if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
            wx.showModal({
              title: '警告',
              content: '您点击了拒绝授权，部分功能无法使用!!!',
              showCancel: false,
              confirmText: '返回授权',
              success: function (res) {
                // 用户没有授权成功，不需要改变 isHide 的值
                if (res.confirm) {
                  console.log('用户点击了“返回授权”');
                };
              }
            }),

              that.setData({
                flag: !that.data.fail,
                lee: '',
              });
          } else {
            wx.getUserInfo({
              success(res) {
                console.log('获取用户个人信息2')
                console.log(res);
                //授权成功
                var dataT = {
                  code: code,
                  encryptedData: ency,
                  iv: iv,
                  // rawData: res.rawData,
                  // signature: res.signature,
                }
                // 获取微信用户基本信息接口
                util.requestPost(api.getUserInfo, dataT).then(
                  res => {
                    console.log("获取微信用户基本信息接口");
                    console.log(res);
                    if (res.data.success && res.data.code == 200) {
                      //成功
                      wx.setStorageSync('wxInfo', res.data.data);
                      that.login();

                    } else {
                      //失败了
                      wx.showModal({
                        title: 'HR私享汇圈',
                        content: res.data.message,
                      })
                    }
                  }
                ).catch(
                  error => {

                    that.setData({
                      disabled: false
                    })
                  }
                )
              }
            })
            return;
            

            that.setData({

              lee: false,

            });
           
            //同意授权
            var userinfo = wx.getStorageSync('userInfo');

            console.log(userinfo);
          }
        },

        fail: function () {

          console.log("session_key 已经失效，需要重新执行登录流程");

        }

      });
    }

  },

  // 登录
  login: function() {
    var that = this;

    var wxinfo = wx.getStorageSync('wxInfo');
    var data = {
      imageUrl: this.data.userinfo.avatarUrl,
      inviteCode: this.data.inviteCode,
      openId: wxinfo.openid,
      phone: wxinfo.phoneNumber,
    }
    // 微信openid登陆或注册
    util.requestPost(api.getOpenidRegisterOrLogin, data).then(
      res => {
        console.log("微信openid登陆或注册");
        console.log(res);
        if (res.data.success && res.data.code == 200) {
          //成功
          wx.setStorageSync('isLogin', 'login_y')
          var json = res.data;
          wx.setStorageSync('memberid', json.data.memberId);
          wx.setStorageSync('token', json.data.token);
          if (that.data.isshare == 1) {
            wx.navigateBack({//返回
              
            })
          }else {
            wx.switchTab({
              url: '../home/home',
            })
          }
          

        } else {
          //失败了
          wx.showModal({
            title: 'HR私享汇圈',
            content: res.data.message,
          })
        }
      }
    ).catch(
      error => {
        that.setData({
          disabled: false
        })
      }
    )
  }
})
