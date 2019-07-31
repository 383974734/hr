// pages/revcode/revcode.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
var interval = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    inviteCode: "",
    time: "",
    length: 0,
    code_isFocus: true,//控制input 聚焦
    focus_status: [],
    code: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phone: wx.getStorageSync('phone'),
      inviteCode: options.inviteCode,
      time: 60
    })
    var that = this;
    var currentTime = 60
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: 0,
        })
      }
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  get_code: function (e) {
    var that = this;
    that.setData({
      code: e.detail.value
    });
    if (that.data.code.length == 0) {
      that.setData({
        focus_status: "100000"
      });
    }
    if (that.data.code.length == 1) {
      that.setData({
        length: e.detail.value.length,
        focus_status: "010000"
      });
    }
    if (that.data.code.length == 2) {
      that.setData({
        length: e.detail.value.length,
        focus_status: "001000"
      });
    }
    if (that.data.code.length == 3) {
      that.setData({
        length: e.detail.value.length,
        focus_status: "000100"
      });
    }
    if (that.data.code.length == 4) {
      that.setData({
        length: e.detail.value.length,
        focus_status: "000010"
      });
    }
    if (that.data.code.length == 5) {
      that.setData({
        length: e.detail.value.length,
        focus_status: "000001"
      });
    }
    if (that.data.code.length == 6) {
      that.setData({
        length: e.detail.value.length
      })
      var that = this;
      var user = null
      var datainfo = null
      user = JSON.parse(wx.getStorageSync('userInfo'))

      var wxinfo = wx.getStorageSync('wxInfo');
      datainfo = {
        inviteCode: that.data.inviteCode,
        phone: that.data.phone,
        openId: wxinfo.openid,
        verificationCode: that.data.code
      }

      // console.log("手机号和验证码登陆接口")
      console.log("手机号和验证码登陆或注册")
      // util.requestPost(api.getCheckloginNew, datainfo).then(
      util.requestPost(api.getRegisterOrLogin, datainfo).then(
        res => {
          console.log("手机号和验证码登陆登录成功")
          console.log(res)
          
          if (res.data.success && res.data.code == 200) {
            //成功
            wx.setStorageSync('isLogin', 'login_y')
            var json = res.data;
            wx.setStorageSync('memberid', json.data.memberId);
            wx.setStorageSync('token', json.data.token);

            wx.switchTab({
              url: '../home/home',
            })
          } else {
            //失败了
            wx.showModal({
              title: 'HR私享汇圈',
              content: res.data.message,
              success: function (res) {
                // wx.navigateBack()
              }
            })
          }
        }
      ).catch(
        error => {
          this.setData({
            loginDisabled: false
          })
        }
      )
    }
  },

  set_Focus: function () { //聚焦input
    var that = this
    that.setData({
      code_isFocus: true
    })
  },
})