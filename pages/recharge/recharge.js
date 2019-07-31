// pages/recharge/recharge.js
const app = getApp()
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 此页面 页面内容距最顶部的距离
    navheight: app.globalData.height,
    // 飘起来的view
    showDialog: false,
    son: {},
    json:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mp = options.mp;
    console.log("打印值：------------------------");
    console.log(mp);
    this.setData({
      mp: mp,
    })
    this.loadData();
    wx.setNavigationBarTitle({
      title: '积分充值',
    })
  },

  /**
   * 请求接口
   */
  loadData: function (e) {
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
      mp: that.data.mp,
    }
    util.requestPost(api.getCreateOrder, data).then(
      res => {
        wx.hideLoading();
        console.log("创建订单是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;

          that.setData({
            json: json.data
          })
        } else {
          util.toast(res.data.message);
        }
      }
    )

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 去支付
   */
  gotopay: function(e) {
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    const that = this;
    var data = {
      orderId: that.data.json.orderId,
    }
    util.requestPost(api.getPay, data).then(
      res => {
        wx.hideLoading();
        console.log("去支付是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          

          var json = res.data.data;
          console.log(json);
          wx.requestPayment({
            timeStamp: json.timeStamp,
            nonceStr: json.nonceStr,
            package: json.package,
            signType: json.signType,
            paySign: json.sign,
            success: res => {
              console.log(res);
              if (res.errMsg == "requestPayment:ok") {
                that.setData({
                  showDialog: !that.data.showDialog
                })
                var datas = {
                  fromId: "",
                }
                util.requestPost(api.getTemplateMessage, datas).then(
                  res => {

                  }
                )
              }
            },
            fail: error => {
              if (error.errMsg == 'requestPayment:fail cancel') {
                util.toast('放弃支付');
              }
            }
          })

        } else {
          util.toast(res.data.message);
        }
      }
    )
    this.industrybtn();
  },

  /**
   * 取消充值
   */
  popview: function(e) {
    wx.navigateBack();
  },

  /**
  * 积分充值事件
  */
  industrybtn: function () {
    console.log("积分充值事件");
  },

  /**
   * 充值成功确定按钮
   */
  pushrecharge: function (e) {
    wx.navigateBack();
  },


  pay: function () {
    
  }

})