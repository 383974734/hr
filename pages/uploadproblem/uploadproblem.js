// pages/uploadproblem/uploadproblem.js

const app = getApp()
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      avatar: "../../static/images/add_img.png",
    },

    // 此页面 页面内容距最顶部的距离
    navheight: app.globalData.height,

    json: {},
    temp: '',
    name_focus: false,
    input_str: '',
    public: true,
    // 飘起来的view
    showDialog: false,
    showDialogSub: false,
    // 飘起来的输入框
    jfValue: "",
    //提示信息
    subtit: '悬赏不能为0',

    reward: "悬赏积分",
    tit: "",
    tits: '标题（50字以内）',
    textv: "",
    textvs: '问题详述（200字以内）'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发布问题',
    })
    this.loadData();
  },

  /**
   * 请求接口
   */
  loadData: function (e) {
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


  /**
    * 表单提交触发
    */
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：2222', e.detail.value)
    var formidStr = e.detail.formId;
    var datat = e.detail.value;
    //返回上一级关闭当前页面
    if (datat.tit == "") {
      util.toast('请填写标题');
      return;
    } else if (datat.textv == "") {
      util.toast('请填写详情');
      return;
    }

    this.setSubPopView();
    wx.setStorageSync('formSubmitID', e.detail.formId);
    wx.setStorageSync('formSubmit', e.detail.value);
    return;

    for (var key in datat) {
      if (key == 'imageUrl') {
        datat.remove(key);
        datat['imageUrl'] = this.data.user.avatar;
      } else {
        datat['imageUrl'] = this.data.user.avatar;
      }
    }

    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
      questionTitle: datat.tit,
      questionMessage: datat.textv,
      imageUrl: that.data.user.avatar,
      questionMp: that.data.reward,
      fromId: formidStr,
    }

    var datas = {
      "fromId": formidStr,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getCreateQuestion, data, token).then(
      res => {
        console.log("发布问题接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          util.toast(res.data.message);
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            tit: "",
            textv: "",
            jfValue: "",
            reward: "悬赏积分",
            "user.avatar": "../../static/images/add_img.png",
          })

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

  /**
  * 上传图片按钮
  */

  //点击图片选择手机相册或者电脑本gtrtgrf地图片
  changeAvatar: function (e) {
    
    var than = this;
    wx.chooseImage({
      count: 1,// 默认9
      sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '玩命加载中',
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        util.requestPostFile(api.getUpload, tempFilePaths[0]).then(
          res => {
            // 隐藏加载框
            wx.hideLoading();
            console.log(res);
            console.log(res.data);
            console.log(JSON.parse(res.data))
            var json = JSON.parse(res.data)
            if (json.success && json.code == 200) {
              
              //成功
              console.log("接口是否走成功了");
              than.setData({
                'user.avatar': json.data
              })
              console.log(than.user.avatar);
            } else {
              //失败了
              
              util.toast(json.message);
            }
          }
        )

      }
    })
  },

  //标题输入框
  inputBindinputTit: function() {
    console.log(e.detail.value);
  },

  //详情输入框
  inputBindinputText: function () {
    console.log(e.detail.value);
  },


  //input输入框文字
  inputBindinput: function (e) {
    console.log(e.detail.value);

    this.setData({
      reward: e.detail.value == '' ? "悬赏积分" : e.detail.value,
      subtit: e.detail.value == '' ? "悬赏不能为0" : "",
    })
  },

  //确定按钮
  pushrecharge: function (e) {
    if (this.data.reward == '0' || this.data.reward == '') {
      util.toast('请输入悬赏积分')
      this.setData({
        reward: "悬赏积分",
      })
      return;
    } else if (this.data.reward > this.data.json.mp){
      util.toast('积分不足')
      this.setData({
        reward: "悬赏积分",
      })
      return;
    }
    this.setpop();
  },

  //取消按钮
  industrybtn: function(e) {
    this.setpop();
    console.log('搜嘎我走了')
    // this.setData({
    //   jfValue: "",
    //   tit: "",
    //   textv: "",
    //   reward:  "悬赏积分",
    //   subtit: "悬赏不能为0",
    // })
  },
 
  //赏金按钮
  rewardBtn: function(e) {
    this.setpop();
  },
  
  setpop: function() {
    this.setData({
      showDialog: !this.data.showDialog,
      public: this.data.showDialog,
    })
  },



  // 提示弹框是否出现
  setSubPopView: function () {

    this.setData({
      showDialogSub: !this.data.showDialogSub,
      public: this.data.showDialogSub,
    })
  },


  /**
    * 提示取消
    */
  industrybtnsub: function () {
    this.setData({
      showDialogSub: !this.data.showDialogSub,
      public: this.data.showDialogSub,
    })
  },

  /**
   * 提示确定
   */
  pushrechargesub: function (e) {
    const that = this;
    this.setData({
      showDialogSub: !this.data.showDialogSub,
      public: this.data.showDialogSub,
    })



    var datat = wx.getStorageSync('formSubmit');
    var formidStr = wx.getStorageSync('formSubmitID');

    for (var key in datat) {
      if (key == 'imageUrl') {
        datat.remove(key);
        datat['imageUrl'] = this.data.user.avatar;
      } else {
        datat['imageUrl'] = this.data.user.avatar;
      }
    }

    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
      questionTitle: datat.tit,
      questionMessage: datat.textv,
      imageUrl: that.data.user.avatar === "../../static/images/add_img.png" ? "" : that.data.user.avatar,
      questionMp: that.data.reward,
      fromId: formidStr,
    }
    // console.log(data);
    // return;

    var datas = {
      "fromId": formidStr,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getCreateQuestion, data, token).then(
      res => {
        console.log("发布问题接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          util.toast(res.data.message);
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            tit: "",
            textv: "",
            tits: '标题（50字以内）',
            textvs: '问题详述（200字以内）',
            jfValue: "",
            reward: "悬赏积分",
            "user.avatar": "../../static/images/add_img.png",
          })

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


  //失去焦点时获取里面评论内容
  bindTextAreaBlur: function (e) {
    console.log("失去焦点时获取里面评论内容"),
    console.log(e.detail.value)
    this.setData({
      tits: e.detail.value,
    })
  },

  bindTextAreaBlurs: function (e) {
    console.log("失去焦点时获取里面评论内容"),
    console.log(e.detail.value)
    this.setData({
      textvs: e.detail.value,
    })
  },
  
  listenerPhoneInput:  function (e) {  // 用户名input  获得焦点。 可填写内容
    console.log(e);
    this.setData({
      name_focus:  true,
      // input_str:  e.detail.value,
    });
  },

  bindChange: function (e) {   //  存入input用户名，密码
    console.log(e);
    // inputContent[e.currentTarget.id] = e.detail.value
    this.setData({
      name_focus: false,
      input_str:  e.detail.value,
    });
  },


})