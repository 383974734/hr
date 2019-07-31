// pages/recruitcon/recruitcon.js

const app = getApp()
var util = require("../../utils/util.js");
var api = require("../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    // 此页面 页面内容距最顶部的距离
    navheight: app.globalData.height,
    jobId: '',
    json: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '招聘详情',
    })
    this.setData({
      jobId: options.jobId
    })
    this.loadData();
  },

  /**
   * 调用接口
   */
  loadData: function (e) {
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    const that = this;
    var data = {
      jobId: that.data.jobId,
    }

    util.requestPost(api.getJobRecruitInfo, data).then(
      res => {
        wx.hideLoading();
        console.log("招聘详情接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          //成功
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

  
})