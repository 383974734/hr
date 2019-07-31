// pages/enrollees/enrollees.js

const app = getApp()

var util = require("../../utils/util.js");
var api = require("../../utils/api.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    trainId: '',
    tit: '',
    page: 1,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.setNavigationBarTitle({
      title: '已报名',
    })
    this.setData({
      trainId: options.trainId
    })
    this.loadData();
  },

  /**
   * 接口调用
   */
  loadData: function (e) {


    const that = this;
    var data = {
      limit: '50',
      page: that.data.page,
      trainId: that.data.trainId,
    }
    console.log(data);
    var token = wx.getStorageSync('token')
    util.requestPost(api.getAttendTrainResults, data, token).then(
      res => {
        console.log('参加过此次培训的人接口走成功了');
        wx.hideLoading();
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;
          that.data.list = that.data.list.concat(json.data.attendTrainResults);

          that.setData({
            list: that.data.list,
            tit: json.data.attendTrainResultsCount,
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
    const that = this;
    console.log('触发下拉刷新'),
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();
    // var that = this;
    // 隐藏导航栏加载框
    // wx.hideNavigationBarLoading();
    // 停止下拉动作
    // wx.stopPullDownRefresh();

    // 设置数据
    that.setData({
      page: 1,
      // 让数组变成一个空数组
      list: [],
    })

    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })

    var data = {
      limit: '50',
      page: that.data.page,
      trainId: that.data.trainId,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getAttendTrainResults, data, token).then(
      res => {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        // 隐藏加载框
        wx.hideLoading();
        console.log("招聘列表接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;
          that.data.list = that.data.list.concat(json.data.attendTrainResults);

          that.setData({
            list: that.data.list,
            tit: json.data.attendTrainResultsCount,
          })
        } else {
          util.toast(res.data.message);
        }
      }
    )

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })

    // 页数+1
    // 设置数据
    that.setData({
      page: this.data.page + 1
    })


    var data = {
      limit: '50',
      page: that.data.page,
      trainId: that.data.trainId,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getAttendTrainResults, data, token).then(
      res => {
        var json = res.data;
        console.log(res);

        if (res.data.code == 200 && res.data.success) {

          // 回调函数
          var moment_list = that.data.list;

          for (var i = 0; i < json.data.length; i++) {
            moment_list.push(json.data.attendTrainResults[i]);
          }
          console.log("招聘列表接口是否走成功了");

          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
          // 隐藏加载框
          wx.hideLoading();
        } else {
          util.toast(res.data.message);
        }
      }
    )

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})