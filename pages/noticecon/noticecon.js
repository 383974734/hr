// pages/noticecon/noticecon.js
const app = getApp()
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageID: '',
    memberId: '',
    json: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '通知',
    })
    this.setData({
      memberId: options.memberId,
      messageID: options.messageID,
    })
    this.loadData();
  },


  /**
   * 调用接口
   */
  loadData: function (e) {
    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: that.data.memberId, 
      messageID: that.data.messageID,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getMessageDetail, data, token).then(
      res => {
        console.log("通知详情接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;

          that.setData({
            json: json.data,
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

  }
})