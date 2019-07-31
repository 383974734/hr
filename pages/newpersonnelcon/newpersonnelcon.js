// pages/newpersonnelcon/newpersonnelcon.js

const app = getApp()
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobwantedID: '',
    json: {},
    // 飘起来的view
    showDialog: false,
    titleArr: ['互联网设计师设计', '互联网设计师设计', '互联网设计师设计'],
    subtit:[
      {
        tit: '3年',
        subtit: '工作经验',
      },
      {
        tit: '哈尔滨',
        subtit: '工作地点',
      },
      {
        tit: '本科',
        subtit: '学历',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.setNavigationBarTitle({
      title: '详情',
    })
    this.setData({
      jobwantedID: options.jobwantedID,
    })
    this.loadData();
  },

  /**
   * 调用接口
   */
  loadData: function (e) {
    const that = this;
    var data = {
      jobwantedID: that.data.jobwantedID,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getJobwantedResoult, data).then(
      res => {
        console.log("通知详情接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;
          var temp = json.data.worklife == '0' ? "应届" : json.data.worklife + '年';
          var arr = [temp, json.data.resumeArea, json.data.academicDegree];
          for (var i = 0; i < arr.length; i++) {
            that.data.subtit[i].tit = arr[i];
          }

          that.setData({
            json: json.data,
            subtit: that.data.subtit
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

  clickTel:function() {

    this.setData({
      showDialog: !this.data.showDialog
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
    wx.makePhoneCall({
      phoneNumber: this.data.json.jobwantedPhone,
    })
  },
})