// pages/myproblem/myproblem.js

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
    type: 0,
    page: 1,
    list: [],
    condition: '',
    // 飘起来的view
    showDialog: false,
    deleMid: '',
    deleQuestionid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的问题',
    })
    this.loadData();
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
      condition: that.data.condition,
      limit: "15",
      page: this.data.page,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getMyQuestion, data, token).then(
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
      condition: that.data.condition,
      limit: "15",
      page: this.data.page,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getMyQuestion, data, token).then(
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
      condition: that.data.condition,
      limit: "15",
      page: this.data.page,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getMyQuestion, data, token).then(
      res => {
        var json = res.data;
        console.log(res);

        if (res.data.code == 200 && res.data.success) {

          // 回调函数
          var moment_list = that.data.list;

          for (var i = 0; i < json.data.length; i++) {
            moment_list.push(json.data[i]);
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

  },


  addbtn: function (res) {
    wx.navigateTo({
      url: '../uploadproblem/uploadproblem',
    })
  },

  /**
   * 点击cell  进入详情事件  
   */
  cellpush: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '../problemcon/problemcon?questionID=' + e.currentTarget.dataset.questionid + '&memberId=' + e.currentTarget.dataset.memberid,
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
    
  },

  /**
   * 删除
   */
  deleBtn: function(e) {
    this.setData({
      showDialog: !this.data.showDialog
    })
    

    console.log(e);
    var memberId = e.currentTarget.dataset.memberid;
    var questionId = e.currentTarget.dataset.questionid;

    this.setData({
      deleMid: memberId,
      deleQuestionid: questionId,
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
      questionId: this.data.deleQuestionid,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getDeleteMyQuestion, data, token).then(
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

  

})