// pages/integral/integral.js
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
    json: {},


    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
    wx.setNavigationBarTitle({
      title: '积分',
    })
  },

  /**
   * 调用接口
   */
  loadData: function(e) {
    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getMypointHistorynew, data, token).then(
      res => {
        console.log("接口是否走成功了");
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


    /*
    type=2是用户H币兑换积分,
    type=3是用户积分兑换H币,
    type=5是正常消费积分,
    type=4是买积分

    */
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

  }
})