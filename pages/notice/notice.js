// pages/notice/notice.js


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
    // 飘起来的view
    showDialog: false,
    deleMid: '',
    deleMessid: '',
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.setNavigationBarTitle({
      title: '通知',
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
      limit: "15",
      page: this.data.page,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getMessageList, data, token).then(
      res => {
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
    this.onPullDownRefresh();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },




  // 下拉刷新
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
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
      limit: "15",
      page: this.data.page,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getMessageList, data, token).then(
      res => {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        // 隐藏加载框
        wx.hideLoading();
        
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          console.log("接口是否走成功了");
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
      memberId: memberid,
      limit: "15",
      page: this.data.page,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getMessageList, data, token).then(
      res => {
        console.log("接口是否走成功了");
        console.log(res);
        var json = res.data;
        if (res.data.code == 200 && res.data.success) {
          // 回调函数
          var moment_list = that.data.list;

          for (var i = 0; i < json.data.length; i++) {
            moment_list.push(json.data[i]);
          }

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


  cellPush: function(e) {
    console.log('打印值');
    console.log(e);
    wx.navigateTo({
      url: '../noticecon/noticecon?messageID=' + e.currentTarget.dataset.messageid + '&memberId=' + e.currentTarget.dataset.memberid,
    })
  },


  /**
  * 取消
  */
  industrybtn: function () {
    this.setData({
      showDialog: !this.data.showDialog
    })
  },

  /**
   * 确定
   */
  pushrecharge: function (e) {
    const that = this;
    this.setData({
      showDialog: !this.data.showDialog
    })
    var data = {
      memberId: this.data.deleMid,
      messageId: this.data.deleMessid,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getDeleteMyMessage, data, token).then(
      res => {
        console.log("删除问题接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
          that.onPullDownRefresh();
        } else {
          util.toast(res.data.message);
        }

      }
    )
  },

  /**
   * 删除
   */
  deleBtn: function (e) {
    this.setData({
      showDialog: !this.data.showDialog
    })

    
    console.log(e);
    var memberId = e.currentTarget.dataset.memberid;
    var messageId = e.currentTarget.dataset.messageid;

    this.setData({
      deleMid: memberId,
      deleMessid: messageId,
    })

    
  },

  
})