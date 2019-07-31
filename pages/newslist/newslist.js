// pages/newslist/newslist.js

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
    page: 1,
    list: [],
    condition: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '协会消息',
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
      condition: that.data.condition,
      limit: "15",
      page: this.data.page,
    }
    util.requestPost(api.getAssociationMessageList, data).then(
      res => {
        wx.hideLoading();
        console.log("接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;
          that.data.list = that.data.list.concat(json.data);

          that.setData({
            list: that.data.list
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
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
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


    var memberid = wx.getStorageSync('memberid');
    var data = {
      condition: that.data.condition,
      limit: "15",
      page: this.data.page,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getAssociationMessageList, data, token).then(
      res => {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        // 隐藏加载框
        wx.hideLoading();
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;
          that.data.list = that.data.list.concat(json.data);

          that.setData({
            list: that.data.list
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


    var memberid = wx.getStorageSync('memberid');
    var data = {
      condition: that.data.condition,
      limit: "15",
      page: this.data.page,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getAssociationMessageList, data, token).then(
      res => {
        console.log(res);
        var json = res.data;
        if (res.data.code == 200 && res.data.success) {
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
          // 隐藏加载框
          wx.hideLoading();
          // 回调函数
          var moment_list = that.data.list;

          for (var i = 0; i < json.data.length; i++) {
            moment_list.push(json.data[i]);
          }

          
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

  },

  /**
   * cell 点击
   */
  cellpush: function(e) {
    wx.navigateTo({
      url: '../newsdetails/newsdetails?messageId=' + e.currentTarget.dataset.id,
    })
  },

  /**
  * 搜索点击完成是触发事件
  */
  searchClick: function (e) {
    console.log('搜索点击完成是触发事件');
    console.log(e.detail.value);
    this.setData({
      condition: e.detail.value
    });
    this.onPullDownRefresh();
  }
})