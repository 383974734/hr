// pages/balance/balance.js
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
    mp: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '账户',
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
    }
    var token = wx.getStorageSync('token')

    util.requestPost(api.getCheckExchangeMp, data, token).then(
      res => {
        wx.hideLoading();
        console.log("可兑换H币接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;

          that.setData({
            mp: json.data.point,
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
    this.loadData();
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
   * 点击记录事件
   */
  pushRecord: function(e) {
    wx.navigateTo({
      url: '../record/record',
    })
  },


  /**
   * 点击充值H币
   */
  pushHbalance: function(e) {
    wx.navigateTo({
      url: '../exchange/exchange?title=' + '可兑换积分',
    })
  },


  /**
   * 点击充值积分币
   */
  pushJbalance: function(e) {
    wx.navigateTo({
      url: '../exchange/exchange?title=' + '可兑换H币',
    })
  },
 


})