// pages/my/my.js

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
    // 飘起来的输入框
    jfValue: "",
    //提示审核功能：标题
    popTit: '亲，您的资料已在审核中',
    //提示审核功能：账号是否审核中
    popExamine: false,
    //提示审核功能：是否显示
    popShowDialog: false,

    //我的数据
    json: {
      imageUrl: "../../static/images/user_img-placeholder.png",
    },
    // 支付金额
    paymoney: "支付金额0元",
    mp: 0,

    userImg: "../../static/images/user_img-placeholder.png",//"../../static/images/user_img.png",
    userName: "用户名",
    userSubTitle: "您的工作经验为空",
    classification: [{
      tit: "订单",
      img: "../../static/images/user_order.png",
    },
    {
      tit: "+H币",
      img: "../../static/images/user_hb.png",
    },
    {
      tit: "+积分",
      img: "../../static/images/user_money.png",
    },
    {
      tit: "通知",
      img: "../../static/images/user_noti.png",
    },],
    listRow: [{
      img: "../../static/images/user_problem.png",
      tit: "我的问题",
    }, {
      img: "../../static/images/user_release.png",
      tit: "我的发布",
    },
    {
      img: "../../static/images/user_integral.png",
      tit: "我的账户",
    },
    {
      img: "../../static/images/user-train.png",
      // tit: "我的培训",
      tit: "我的活动",
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.loadData();
    wx.setNavigationBarTitle({
      title: '我',
    })
  },

  /**
   * 请求接口
   */
  loadData: function(e) {
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
            json: json.data
          })
          if (json.data.messageState == '1') {
            that.setData({
              classification: [{
                tit: "订单",
                img: "../../static/images/user_order.png",
              },
              {
                tit: "+H币",
                img: "../../static/images/user_hb.png",
              },
              {
                tit: "+积分",
                img: "../../static/images/user_money.png",
              },
              {
                tit: "通知",
                img: "../../static/images/user_noti1.png",
              },],
              listRow: [{
                img: "../../static/images/user_problem.png",
                tit: "我的问题",
              }, {
                img: "../../static/images/user_release.png",
                tit: "我的发布",
              },
              {
                img: "../../static/images/user_integral.png",
                tit: "我的账户",
              },
              {
                img: "../../static/images/user-train.png",
                // tit: "我的培训",
                tit: "我的活动",
              }]
            })
          }else {
            that.setData({
              classification: [{
                tit: "订单",
                img: "../../static/images/user_order.png",
              },
              {
                tit: "+H币",
                img: "../../static/images/user_hb.png",
              },
              {
                tit: "+积分",
                img: "../../static/images/user_money.png",
              },
              {
                tit: "通知",
                img: "../../static/images/user_noti.png",
              },],
              listRow: [{
                img: "../../static/images/user_problem.png",
                tit: "我的问题",
              }, {
                img: "../../static/images/user_release.png",
                tit: "我的发布",
              },
              {
                img: "../../static/images/user_integral.png",
                tit: "我的账户",
              },
              {
                img: "../../static/images/user-train.png",
                // tit: "我的培训",
                tit: "我的活动",
              }]
            })
          }
        }else {
          if (res.data.code == 700) {
            wx.setStorageSync('isLogin', 'login_n');
            console.log("退出登录按钮点击事件");

            wx.reLaunch({
              url: '../index/index',
            })
          }else {
            // util.toast(res.data.message);
          }
        }
      }
    )

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
    wx.setBackgroundColor({
      backgroundColor: '#34a7fb', // 窗口的背景色为白色
    })
    console.log("必须走的方法吗1")
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
    return {
      title: this.data.json.realName + '邀请您 加入 HR私享圈',
      imageUrl: this.data.json.inviteImageUrl,
      success(e) {
        console.log('成功' + e);
      },
      fail(e) {
        console.log('失败' + e);
      },
      complete() {

      }
    }
  },


  /**
   * 退出登录
   */
  logoutClick: function () {
    // wx.setStorageSync('isLogin', 'login_n');
    // console.log("退出登录按钮点击事件");

    // wx.reLaunch({
    //   url: '../index/index',
    // })

    util.toast("分享事件");
  },

  /**
   * 点击cell事件
   */
  cellpush: function(e) {
    console.log(e);

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
          var index = e.currentTarget.dataset.index;
          switch (index) {
            case 0:
              console.log("点击我的问题");
              wx.navigateTo({
                url: '../myproblem/myproblem',
              })
              break;
            case 1:
              console.log("点击我的发布");
              wx.navigateTo({
                url: '../myrecruit/myrecruit?jobCompany=' + that.data.json.busName + '&businessAuth=' + that.data.json.businessAuth,
              })
              break;
            case 2:
              console.log("点击我的积分");
              wx.navigateTo({
                // url: '../integral/integral',
                url: '../newbalance/newbalance?mp=' + this.data.json.mp,
              })
              break;
            case 3:
              console.log("点击我的培训");
              wx.navigateTo({
                url: '../mytrain/mytrain',
              })
              break;
          }
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
   * 点击分类
   */
  headerpush: function(e) {
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
          var index = e.currentTarget.dataset.index;
          switch (index) {
            case 0:
              console.log("点击订单");
              wx.navigateTo({
                url: '../order/order',
              })
              break;
            case 1:
              console.log("点击H币");
              console.log(this.data.json.mp)
              wx.navigateTo({
                // url: '../balance/balance?mp=' + this.data.json.mp,
                url: '../exchange/exchange?title=' + '可兑换积分',
              })
              break;
            case 2:
              console.log("点击充积分");
              this.industrybtn();
              break;
            case 3:
              console.log("点击通知");
              wx.navigateTo({
                url: '../notice/notice',
              })
              break;
          }
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
   * 用户详情
   */
  pushUserInfo: function(e) {
    
    wx.navigateTo({
      // url: '../userinfo/userinfo?json=' + JSON.stringify(this.data.json),
      url: '../userinfo/userinfo',
    })
  },

  /**
   * 充值事件
   */
  pushrecharge: function(e) {
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
            url: '../recharge/recharge?mp=' + this.data.mp,
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
  inputClick: function(e) {
    console.log(e.detail.value);
    this.setData({
      mp: e.detail.value,
      paymoney: "支付金额" + (e.detail.value / this.data.json.multiple) + "元",
    })
  },

  inputBindinput: function(e) {
    console.log(e.detail.value);
    this.setData({
      mp: e.detail.value,
      paymoney: "支付金额" + (e.detail.value / this.data.json.multiple) + "元",
    })
  },
})