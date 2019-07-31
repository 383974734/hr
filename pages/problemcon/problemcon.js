// pages/problemcon/problemcon.js

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
    //当前详情ID
    questionID: "",

    showDialogs: false,
    tips: '张三',
    //titleArr  标签数组
    titleArr: [],
    json: {},
    userJson: {},
    answerIdTemp: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var memberidT = wx.getStorageSync('memberid');
    this.setData({
      questionID: options.questionID,
      memberId: options.memberId,
      memberidT: memberidT,
    })
    
    this.loadData();
    this.getuserInfo();
    wx.setNavigationBarTitle({
      title: '问题',
    })
  },

  /**
   * 接口调用
   */
  loadData: function(e) {
    const that = this;
    // var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: this.data.memberId,
      questionID: this.data.questionID,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getQuestionDetail, data, token).then(
      res => {
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;
          that.setData({
            json: json.data,
            // titleArr: json.data.questionDetail.questionLabel.split('|'),
          })
          if (json.data.questionDetail.questionLabel != '') {
            that.setData({
              titleArr: json.data.questionDetail.questionLabel.split('|'),
            })
          }
        } else {
          util.toast(res.data.message);
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
    console.log(this.data.json)
    if (this.data.json.questionDetail.imageUrl == '') {
      return {
        title: this.data.userJson.realName + '邀请您一起来参加',
        imageUrl: '../../static/images/logo.png',
      }
    }else {
      return {
        title: this.data.userJson.realName + '邀请您一起来参加',
        // desc: '分享页面的内容',
        imageUrl: this.data.json.questionDetail.imageUrl,
        // path: '/pages/user/index?id=1'
      }
    }
    
    
    
  },

  /**
   * 回答问题按钮
   */
  industrybtn: function () {
    this.setData({
      showDialog: !this.data.showDialog,
      jfValue: '',
    })
  },

  //悬赏提示弹框
  industrybtns: function() {
    this.setData({
      showDialogs: !this.data.showDialogs,
    })
  },

  /**
   * 悬赏提示弹框确定
   */
  pushrecharges: function (e) {
    this.setData({
      showDialogs: !this.data.showDialogs,
    })
    console.log(this.data.answerIdTemp);
    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      answerId: this.data.answerIdTemp,
      memberId: memberid,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getBestAnswer, data, token).then(
      res => {
        console.log("选中最佳答案接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          that.setData({
            [item]: 1,
          })
        } else {
          util.toast(res.data.message);
        }
      }
    )
  },

  /**
    * 表单提交触发
    */
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e);
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      questionId: this.data.questionID,
      answerMessage: e.detail.value.problem,
      memberId: memberid,
      fromId: e.detail.formId,
    }
    // var datas = {
    //   "fromId": e.detail.formId,
    // }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getAnswerQuestion, data, token).then(
      res => {
        
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          console.log('回答问题');
          that.formCancelt();
          that.loadData();
          util.toast(res.data.message);
          // util.requestPost(api.getTemplateMessage, datas).then(
          //   res => {

          //   }
          // )
        } else {
          util.toast(res.data.message);
        }
      }
    )
  },

  /**
   * 表单重置触发
   */
  formReset() {
    console.log('form发生了reset事件')
  },


  zanBtn: function(e) {
    var indexData = this.data.json.answerList[e.currentTarget.dataset.indexsele];
    var index = e.currentTarget.dataset.indexsele;
    console.log("answerSelect:-------   " + indexData.answerSelect);

    // 下面这段话的语法我也是无语了  就是把要取出来的这个玩应变成字符串再赋值   不是不很无语
    var item = "json.answerList[" + index + "].answerSelect";

    var answerId = indexData.answerId;


    if (indexData.answerSelect != 0) {
      return;
    }

    this.setData({
      showDialogs: !this.data.showDialogs,
      answerIdTemp: answerId,
      tips: indexData.uname,
    });
    return;

    

    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      answerId: answerId,
      memberId: memberid,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getBestAnswer, data, token).then(
      res => {
        console.log("选中最佳答案接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          that.setData({
            [item]: 1,
          })
        } else {
          util.toast(res.data.message);
        }
      }
    )
  },

  /**
   * 取消回答
   */
  formCancelt: function () {
    this.setData({
      showDialog: !this.data.showDialog,
      jfValue: '',
    })
  },

})