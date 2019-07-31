// pages/exchange/exchange.js
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
    title: "",
    // 飘起来的view
    showDialog: false,
    json: {},
    number: "",
    //弹出提示框标题头
    popTitle: "",
    //弹出提示框提示文字
    popMessage: "",
    exchangeNumber: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      title: options.title,
    })
    wx.setNavigationBarTitle({
      title: '',
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
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
    }
    var token = wx.getStorageSync('token')
    
    if (that.data.title == "可兑换H币") {
      util.requestPost(api.getCheckExchangeMp, data, token).then(
        res => {
          wx.hideLoading();
          console.log("可兑换H币接口是否走成功了");
          console.log(res);
          if (res.data.code == 200 && res.data.success) {
            var json = res.data;

            that.setData({
              json: json.data,
              exchangeNumber: json.data.intouconvertible,
              number: json.data.pointRange + "H币 = " + json.data.mpRange + "积分"
            })
          } else {
            util.toast(res.data.message);
          }
        }
      )
    }else {
      util.requestPost(api.getCheckExchangePoint, data, token).then(
        res => {
          wx.hideLoading();
          console.log("可兑换积分接口是否走成功了");
          console.log(res);
          if (res.data.code == 200 && res.data.success) {
            var json = res.data;

            that.setData({
              json: json.data,
              exchangeNumber: json.data.intouconvertible,
              number: json.data.mpRange + "积分 = " + json.data.pointRange + "H币"
            })
          } else {
            util.toast(res.data.message);
          }
        }
      )
    }
    
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

  /**
   * 充值
   */
  btnclick: function(e) {
    this.industrybtn();
  },

  /**
  * 积分充值事件
  */
  industrybtn: function () {
    console.log("积分充值事件");

    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var token = wx.getStorageSync('token')
    if (that.data.title == "可兑换H币") {//用户H币兑换积分
      var data = {
        Mp: this.data.exchangeNumber,
        memberId: memberid,
      }
      util.requestPost(api.getExchangeMp, data, token).then(
        res => {
          console.log("接口是否走成功了");
          console.log(res);
          if (res.data.success && res.data.code == 200) {
            //成功
            var json = res.data;
            this.setData({
              showDialog: !this.data.showDialog,
              popTitle: 'H币兑换成功',
              popMessage: '+' + this.data.exchangeNumber + 'H币',
            })
          } else {
            //失败了
            this.setData({
              showDialog: !this.data.showDialog,
              popTitle: 'H币兑换失败',
              popMessage: res.data.message,
            })
          }
        }
      ).catch();
    } else {
      var data = {
        point: this.data.exchangeNumber,
        memberId: memberid,
      }
      util.requestPost(api.getExchangePointn, data, token).then(//用户积分兑换H币
        res => {
          console.log("接口是否走成功了");
          console.log(res);
          if (res.data.success && res.data.code == 200) {
            //成功
            var json = res.data;
            this.setData({
              showDialog: !this.data.showDialog,
              popTitle: '积分兑换成功',
              popMessage: '+' + this.data.exchangeNumber + '积分',
            })
          } else {
            //失败了
            this.setData({
              showDialog: !this.data.showDialog,
              popTitle: '积分兑换失败',
              popMessage: res.data.message,
            })
          }
        }
      ).catch();
    }
  },

  /**
   * 充值事件
   */
  pushrecharge: function (e) {
    this.setData({
      showDialog: !this.data.showDialog
    })
    console.log(this.data.popTitle);
    if (this.data.popTitle == '积分兑换失败' && this.data.popTitle == '积分兑换成功') {
      
    }else {
      wx.navigateBack();
    }
  },


  // 拿到手机号
  getPhone: function (e) {
    var val = e.detail.value;
    this.setData({
      exchangeNumber: val
    });
  }
})