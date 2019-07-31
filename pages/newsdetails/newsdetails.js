// pages/newsdetails/newsdetails.js

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
    messageId: "",
    json: {},
    con: {
      img: "../../static/images/problem_list_img.png",
      tit: "请问各位，谁知道南岗区养老保险电话 是多少？",
      problem: "小伙们，请问各位，谁知道南岗区养老保险电话 是多少？小伙们，请问各位，谁知道南岗区养老保险电话 是多少？小伙们，请问各位，谁知道南岗区养老保险电话 是多少？小伙们，请问各位，谁知道南岗区养老保险电话 是多少？小伙们，请问各位，谁知道南岗区养老保险电话 是多少？小伙们，请问各位，谁知道南岗区养老保险电话 是多少？小伙们，请问各位，谁知道南岗区养老保险电话 是多少？s",
      time: "2019年03月28日09:53:33",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      messageId: options.messageId
    })
    wx.setNavigationBarTitle({
      title: '消息详情',
    })
    
    that.loadData();
  },

  /**
   * 调用接口
   */
  loadData:function(e) {
    const that = this;
    console.log("协会消息接口是否走成功了");
    var data = {
      messageId: this.data.messageId,
    }
    util.requestPost(api.getAssociationMessageDetail, data).then(
      res => {
        console.log("接口是否走成功了");
        console.log(res);
        if (res.data.success && res.data.code == 200) {
          //成功
          var json = res.data;
          that.setData({
            json: json.data
          })
        } else {
          //失败了
          util.toast(res.data.message);
        }
      }
    ).catch()

    var json = {
      "code": 200,
      "data": {
        "id": "1",
        "imageUrl": "",
        "message": "招聘",
        "messageDate": "2019-03-16 13:09:15",
        "messageId": 124235423,
        "messageTitle": "招聘程序员",
        "statue": 1
      },
      "message": "请求成功",
      "success": true
    }

    that.setData({
      json: json.data
    })
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