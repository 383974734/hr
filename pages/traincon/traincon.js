// pages/traincon/traincon.js

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
    // 飘起来的view
    showDialog: false,
    showDialogPop: false,
    trainId: '',
    popstr: '',
    //提示审核功能：标题
    popTit: '亲，您的资料已在审核中',
    //提示审核功能：账号是否审核中
    popExamine: false,
    //提示审核功能：是否显示
    popShowDialog: false,
    json: {
      joinState: '1',
    },
    userJson: {},

    // 页面的初始数据: isshare = 0, 表示不是从分享进入, isshare = 1 表示是从分享进入
    isshare: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      // title: '培训详情',
      title: '活动详情',
    })
    console.log(options);
    //可以在页面 onLoad 中去获取页面 url 中的参数( 下面 onShareAppMessage 函数中配置)
    if (options.isshare == 1) {
      console.log('是分享进入');
      this.setData({
        isshare: options.isshare,
        trainId: options.trainId
      })
    }else {
      this.setData({
        trainId: options.trainId
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadData();
    this.getuserInfo();
  },


  /**
   * 接口调用
   */
  loadData: function (e) {


    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
      trainId: this.data.trainId,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getTrainDetail, data, token).then(
      res => {
        wx.hideLoading();
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;
          that.setData({
            json: json.data,
          })
        } else {
          console.log(res.data.message)
          util.toast(res.data.message);
          wx.navigateTo({
            url: '../index/index?isshare=1',
          })
        }
      }
    )
  },

  /**
   * 请求接口
   */
  getuserInfo: function (e) {


    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getPerInfo, data, token).then(
      res => {
        wx.hideLoading();
        console.log("我的接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;

          that.setData({
            userJson: json.data,
          })
        } else {
          // util.toast(res.data.message);
          
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
    if (this.data.json.trainImageurlTitle == '') {
      return {
        path: '/pages/home/traincon/traincon?isshare=1&trainId=' + this.data.trainId,
        title: this.data.userJson.realName + '邀请您一起来参加',
        imageUrl: '../../static/images/logo.png',
      }
    } else {
      return {
        path: '/pages/home/traincon/traincon?isshare=1&trainId=' + this.data.trainId,
        title: this.data.userJson.realName + '邀请您一起来参加',
        imageUrl: this.data.json.trainImageurlTitle,
      }
    }
  },



  btnClick: function(e) {
    this.setData({
      showDialog: !this.data.showDialog
    })
  },

  /**
  * 积分充值事件
  */
  industrybtn: function () {
    this.setData({
      showDialog: !this.data.showDialog
    })
  },

  /**
   * 充值事件
   */
  pushrecharge: function (e) {
    this.setData({
      showDialog: !this.data.showDialog
    })

    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
      trainId: this.data.trainId,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getFfollowTrain, data, token).then(
      res => {
        console.log(res);//joinState:1 未参加过    0参加过
        if (res.data.code == 200 && res.data.success) {
          that.loadData();
        } else {
          if (res.data.code == 666) {
            //需要完善资料
            that.setData({
              popTit: res.data.message,
              popExamine: false,
              popShowDialog: true,
            })

          } else if (res.data.code == 777) {
            //审核中
            that.setData({
              popTit: res.data.message,
              popExamine: true,
              popShowDialog: true,
            })
          }else {
            // util.toast(res.data.message);
            that.pushrecharges();
            that.setData({
              popstr: res.data.message,
            })
          }
          
        }
      }
    )
  },

  /**
   * 充值失败
   */
  pushrecharges: function (e) {
    this.setData({
      showDialogPop: !this.data.showDialogPop
    })
  },

  /**
   * 点击有趣人头像跳转页面
   */
  modularpush: function(e) {
    wx.navigateTo({
      url: '../enrollees/enrollees?trainId=' + this.data.trainId,
    })
  }

})