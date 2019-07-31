// pages/personnelcon/personnelcon.js

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
    memberId: "",
    resumeID: "",
    
    titlist: [],

    coninfo:[{
      tit: "姓名",
      name: "resumeName",
    },
    {
      tit: "性别",
      name: "resumeSex",
    },
    {
      tit: "电话",
      name: "resumePhone",
    },
    {
      tit: "行业",
      name: "resumeIndustry",
    },
    {
      tit: "职位",
      name: "resumePosition",
    },
    // {
    //   tit: "文件简历",
    //   name: "resume",
    // },
    {
      tit: "备注",
      name: "remark",
    },
    ],

    info: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '详情',
    })
    var that = this;
    that.setData({
      memberId: options.memberId,
      resumeID: options.resumeID,
    })
    that.loadData();
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
      memberId: this.data.memberId,
      resumeID: this.data.resumeID,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getResumeDetail, data, token).then(
      res => {
        wx.hideLoading();
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;
          if (json.data.resumeSex == '1') {
            json.data.resumeSex = '男'
          }else {
            json.data.resumeSex = '女'
          }
          that.setData({
            info: json.data,
          })
          if (json.data.resumeLabel != '') {
            that.setData({
              titlist: json.data.resumeLabel.split(','),
            })
          }
          console.log(that.data.titlist);
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