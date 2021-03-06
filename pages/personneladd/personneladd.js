// pages/personneladd/personneladd.js

const app = getApp()
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      avatar: "../../static/images/user_img-placeholder.png",//"../../static/images/personneladd-img.png",
    },
    // 此页面 页面内容距最顶部的距离
    navheight: app.globalData.height,

    // 飘起来的view
    showDialog: false,
    showDialogSub: false,
    // 飘起来的输入框
    jfValue: "",

    resumeTitle: '',
    resumeName: '',
    resumePhone: '',
    industry: '',
    position: '',
    remark: '',
    resumeArea: '',

    sex: 1,
    radios: [
      {
        label: '女',
        value: '女',
      },
      {
        label: '男',
        value: '男',
      }
    ],
    // 行业
    industry: "",
    // 职位
    position: "",
    titlist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('industry', ''),
    wx.setStorageSync('position', ''),
    wx.setNavigationBarTitle({
      title: '发求职',
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
    var that = this;
    var industry = wx.getStorageSync("industry");
    var position = wx.getStorageSync("position");
    console.log("行业需要打印的值" + industry);
    that.setData({
      industry: industry,
      position: position,
    })
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

  /**
   * 性别选择的时候触发
   */
  check(e) {
    console.log(e)
    var that = this;
    var sex = e.currentTarget.dataset.index
    that.setData({
      sex: sex
    })
  },

  /**
    * 表单提交触发
    */
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    

    


    var that = this;
    var data = e.detail.value;
    if (data.resumeTitle == "") {
      util.toast('请填写标题');
      return;
    } else if (data.resumeName == '') {
      util.toast('请填写姓名');
      return;
    } else if (data.resumePhone == '') {
      util.toast('请填写电话');
      return;
    }
    that.setSubPopView();
    wx.setStorageSync('formSubmit', e.detail.value);
    return;


    var memberid = wx.getStorageSync('memberid');
    for (var key in data) {
      if (key == 'resumeSex') {
        data.remove(key);
        data['resumeSex'] = this.data.sex;
      } else {
        data['resumeSex'] = this.data.sex;
      }

      if (key == 'publisherMemberId') {
        data.remove(key);
        data['publisherMemberId'] = memberid;
      } else {
        data['publisherMemberId'] = memberid;
      }

      if (key == 'resumeLabel') {
        data.remove(key);
        data['resumeLabel'] = that.data.titlist.join(',');
      } else {
        data['resumeLabel'] = that.data.titlist.join(',');
      }

      if (key == 'resumeImageUrl') {
        data.remove(key);
        data['resumeImageUrl'] = this.data.user.avatar;
      } else {
        data['resumeImageUrl'] = this.data.user.avatar;
      }

    }

    console.log(data);
    var token = wx.getStorageSync('token')
    util.requestPost(api.getCreateResume, data, token).then(
      res => {

        console.log(res);
        if (res.data.success && res.data.code == 200) {
          console.log("创建简历接口成功了");
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            resumeTitle: '',
            resumeName: '',
            resumePhone: '',
            industry: '',
            position: '',
            remark: '',
            sex: 1,
            resumeArea: '',
            "user.avatar": "../../static/images/personneladd-img.png",
          })
          // wx.navigateBack()
        } else {
          //失败了
          util.toast(res.data.message);
        }
      }
    ).catch();

  },

  /**
   * 表单重置触发
   */
  formReset() {
    console.log('form发生了reset事件')
  },
  /**
   * 表单取消按钮
   */
  formCancelt: function(res) {

  },


  /**
   * 行业选择按钮
   */
  industrybtn: function() {
    wx.navigateTo({
      url: '../industry/industry',
    })
  },

  /**
   * 职位选择
   */
  positionbtn: function(e) {
    wx.navigateTo({
      url: '../position/position',
    })
  },


  /**
   * 添加标签按钮
   */
  addtitClick: function (e) {
    if (this.data.titlist.length == 3) {
      util.toast('最多可添加3个标签');
    }else {
      this.setPopView();
    }
    
  },

  /**
    * 表单提交触发
    */
  formSubmitadd(e) {

    console.log('form发生了submit事件，携带数据为：', e.detail.value.problem);
    var data = e.detail.value;
    var arr = this.data.titlist;
    arr.push(data.problem);
    this.setData({
      titlist: arr
    })
    this.setPopView();
    console.log(this.data.titlist);
  },



  /**
   * 取消添加标签
   */
  formCanceltadd: function () {
    this.setPopView();
  },

  setPopView: function () {
    this.setData({
      showDialog: !this.data.showDialog,
      jfValue: '',
    })
  },

   // 提示弹框是否出现
  setSubPopView: function () {
    this.setData({
      showDialogSub: !this.data.showDialogSub,
    })
  },


  /**
  * 提示取消
  */
  industrybtnsub: function () {
    this.setData({
      showDialogSub: !this.data.showDialogSub
    })
  },

  /**
   * 提示确定
   */
  pushrechargesub: function (e) {
    const that = this;
    this.setData({
      showDialogSub: !this.data.showDialogSub
    })
    


    var data = wx.getStorageSync('formSubmit');
    var memberid = wx.getStorageSync('memberid');
    for (var key in data) {
      if (key == 'resumeSex') {
        data.remove(key);
        data['resumeSex'] = this.data.sex;
      } else {
        data['resumeSex'] = this.data.sex;
      }

      if (key == 'publisherMemberId') {
        data.remove(key);
        data['publisherMemberId'] = memberid;
      } else {
        data['publisherMemberId'] = memberid;
      }

      if (key == 'resumeLabel') {
        data.remove(key);
        data['resumeLabel'] = that.data.titlist.join(',');
      } else {
        data['resumeLabel'] = that.data.titlist.join(',');
      }

      if (key == 'resumeImageUrl') {
        data.remove(key);
        data['resumeImageUrl'] = this.data.user.avatar;
      } else {
        data['resumeImageUrl'] = this.data.user.avatar;
      }

    }

    console.log(data);
    var token = wx.getStorageSync('token')
    util.requestPost(api.getCreateResume, data, token).then(
      res => {

        console.log(res);
        if (res.data.success && res.data.code == 200) {
          console.log("创建简历接口成功了");
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            resumeTitle: '',
            resumeName: '',
            resumePhone: '',
            industry: '',
            position: '',
            remark: '',
            sex: 1,
            resumeArea: '',
            "user.avatar": "../../static/images/personneladd-img.png",
          })
          // wx.navigateBack()
        } else {
          //失败了
          util.toast(res.data.message);
        }
      }
    ).catch();

  },

})