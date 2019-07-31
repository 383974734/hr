// pages/newbalance/newbalance.js

const app = getApp()
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //0：H币  1：积分
    type: 0,
    mp: 0,
    inputMp: 0,
    json: {},
    list: [],
    listH: [],
    page: 1,
    jsonText: {},

    // 飘起来的输入框
    jfValue: "",
    // 飘起来的view
    showDialog: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '账户',
    })
    // this.loadData();
    this.loadDataCurrency();
    this.loadDataText();


    var a = 2221222122.675414;
    var b = a.toFixed(a.toString().split(".")[1].length).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');//使用正则替换，每隔三个数加一个','
    console.log('使用正则替换，每隔三个数加一个'); 
    console.log(b); 

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

    util.requestPost(api.getCheckExchangeMp, data, token).then(
      res => {
        wx.hideLoading();
        console.log("可兑换H币接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;

          that.setData({
            mp: json.data.point,
          })
        } else {
          util.toast(res.data.message);
        }
      }
    )
  },

  /**
   * 请求接口
   */
  loadDataText: function (e) {
    console.log("我的接口是否走成功了");
    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getPerInfo, data, token).then(
      res => {
        console.log("我的接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;

          that.setData({
            jsonText: json.data
          })
          
        } else {
          if (res.data.code == 700) {
            wx.setStorageSync('isLogin', 'login_n');
            console.log("退出登录按钮点击事件");

            wx.reLaunch({
              url: '../index/index',
            })
          }
        }
      }
    )

  },

  /**
   * 调用积分接口
   */
  loadDatIntegral: function (e) {
    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getMypointHistorynew, data, token).then(
      res => {
        console.log("接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;
          that.setData({
            json: json.data
          })
        } else {
          util.toast(res.data.message);
        }
      }
    )


    /*
    type=2是用户H币兑换积分,
    type=3是用户积分兑换H币,
    type=5是正常消费积分,
    type=4是买积分

    */
  },

  /**
   * 请求H币接口
   */
  loadDataCurrency: function (e) {
    
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
      limit: "15",
      page: this.data.page,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getPointHistory, data, token).then(
      res => {
        wx.hideLoading();
        /**
         * H币增减,1是加,2是减
         */
        console.log("接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;
          that.data.listH = that.data.listH.concat(json.data);
          that.setData({
            listH: that.data.listH
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
    this.loadData();
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
      listH: [],
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
    util.requestPost(api.getPointHistory, data, token).then(
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
          that.data.listH = that.data.listH.concat(json.data);

          that.setData({
            listH: that.data.listH
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
    util.requestPost(api.getPointHistory, data, token).then(
      res => {
        console.log(res);
        var json = res.data;
        if (res.data.code == 200 && res.data.success) {

          // 回调函数
          var moment_list = that.data.listH;

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
      })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  clickLBtn: function() {
    this.setData({
      type: 0,
      page: 1,
      // 让数组变成一个空数组
      listH: [],
    })
    this.loadDataCurrency();
  },

  clickRBtn: function () {
    this.setData({
      type: 1,
    })
    this.loadDatIntegral();
  },

  /**
   * 点击进入H币和积分互相兑换页面
   */
  pushClick: function(e) {
    // if(this.data.type == 0) {
    //   wx.navigateTo({
    //     url: '../balance/balance?mp=' + this.data.mp,
    //   })
    // }
  },

  /**
   * 点击充值H币
   */
  pushHbalance: function (e) {
    wx.navigateTo({
      url: '../exchange/exchange?title=' + '可兑换积分',
    })
  },


  /**
   * 点击充值积分币
   */
  pushJbalance: function (e) {
    wx.navigateTo({
      url: '../exchange/exchange?title=' + '可兑换H币',
    })
  },


  /**
   * 积分充值事件
   */
  industrybtn: function () {
    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
      limit: "1",
      page: '1',
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getMessageList, data, token).then(
      res => {
        if (res.data.code == 200 && res.data.success) {
          console.log("积分充值事件");
          this.setData({
            showDialog: !this.data.showDialog,
            jfValue: '',
            paymoney: "支付金额0元",
          })
        } else {
          console.log('失败了');
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
          }
        }
      }
    )
  },


  /**
   * 充值事件
   */
  pushrecharge: function (e) {
    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
      limit: "1",
      page: '1',
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getMessageList, data, token).then(
      res => {
        if (res.data.code == 200 && res.data.success) {
          console.log(this.data.mp)
          if (this.data.mp == '0' || this.data.mp == '') {
            util.toast('请输入积分')
            return;
          }
          this.setData({
            showDialog: !this.data.showDialog
          })
          wx.navigateTo({
            url: '../recharge/recharge?mp=' + this.data.inputMp,
          })
        } else {
          console.log('失败了');
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
          }
        }
      }
    )
  },

  /**
   * input 输入
   */
  inputClick: function (e) {
    console.log(e.detail.value);
    this.setData({
      inputMp: e.detail.value,
      paymoney: "支付金额" + (e.detail.value / this.data.jsonText.multiple) + "元",
    })
  },

  inputBindinput: function (e) {
    console.log(e.detail.value);
    this.setData({
      inputMp: e.detail.value,
      paymoney: "支付金额" + (e.detail.value / this.data.jsonText.multiple) + "元",
    })
  },

})