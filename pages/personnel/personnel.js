// pages/personnel/personnel.js

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
    condition: '',

    titlist:[{
      tit: "好看的"
    },
    {
      tit: "漂亮的"
    },
    {
      tit: "IT"
    },
    {
      tit: "餐饮"
    },],
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '人才库',
    })
    // this.loadData();
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
    var data = {
      condition: that.data.condition,
      limit: "15",
      page: this.data.page,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getResumeList, data, token).then(
      res => {
        wx.hideLoading();
        console.log("人才库列表接口是否走成功了");
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
      condition: that.data.condition,
      limit: "15",
      page: this.data.page,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getResumeList, data, token).then(
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
      condition: that.data.condition,
      limit: "15",
      page: this.data.page,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getResumeList, data, token).then(
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

  /**
   * 点击加号 跳转添加简历页面
   */
  addbtn: function(res) {
    wx.navigateTo({
      url: '../personneladd/personneladd',
    })
  },


  /**
   * 点击列表cell事件
   */
  listpush: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '../personnelcon/personnelcon?memberId=' + e.currentTarget.dataset.memberid + '&resumeID=' + e.currentTarget.dataset.resumeid,
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
  },

  /**
   * 删除按钮
   */
  // deleBtn: function(e) {
  //   const that = this;

  //   var memberId = e.currentTarget.dataset.memberid;
  //   var resumeId = e.currentTarget.dataset.resumeid;
      
  //   var data = {
  //     memberId: memberId,
  //     resumeId: resumeId,
  //   }
  //   var token = wx.getStorageSync('token')
  //   util.requestPost(api.getDeleteMyresume, data, token).then(
  //     res => {
  //       console.log("删除简历接口是否走成功了");
  //       console.log(res);
  //       if (res.data.code == 200 && res.data.success) {
  //         that.onPullDownRefresh();
  //       } else {
  //         util.toast(res.data.message);
  //       }

  //     }
  //   )

  // },









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
      memberId: this.data.memberId,
      resumeId: this.data.resumeId,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getDeleteMyresume, data, token).then(
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
    var resumeId = e.currentTarget.dataset.resumeid;

    this.setData({
      memberId: memberId,
      resumeId: resumeId,
    })


  },
})