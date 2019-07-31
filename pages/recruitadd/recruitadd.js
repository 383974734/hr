// pages/recruitadd/recruitadd.js

const app = getApp()
var util = require("../../utils/util.js");
var api = require("../../utils/api.js");
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
    rest: 1,
    public: true,
    
    radios: [
      {
        label: '单休',
        value: '单休',
      },
      {
        label: '双休',
        value: '双休',
      }
    ],
  //  招聘企业
    jobCompany: '',
    tits: '职位描述（200以内）',
    // 工资范围
    wages: "",
    // 经验要求
    experience: "",
    // 最低学历
    education: "",
    typeqy: "",
    jobName: '',
    jobPlace: '',
    jobEducation: '',
    jobDescribe: '',

    // 飘起来的view
    showDialog: false,
    showDialogSub: false,
    // 飘起来的选择结果
    jfValue: "",
    // 飘起来的标题
    pickertit: "",
    // 飘起来的内容
    packList: [],
    pickvalue: 0,
    //当前选项
    seleNumber: 0,

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发布招聘',
    })
    this.setData({
      jobCompany: options.jobCompany,
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

  },

  /**
    * 表单提交触发
    */
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：发布招聘', e.detail.value);
    var data = e.detail.value;
    if (data.jobCompany == "") {
      util.toast('请填写招聘企业');
      return;
    } else if (data.jobName == '') {
      util.toast('请填写职位名称');
      return;
    } else if (data.salaryRange == '') {
      util.toast('请填写工资范围');
      return;
    } else if (data.jobExperience == '') {
      util.toast('请填写经验要求');
      return;
    } else if (data.jobPlace == '') {
      util.toast('请填写工作地点');
      return;
    } else if (data.jobEducation == '') {
      util.toast('请填写最低学历');
      return;
    }

    this.setSubPopView();
    wx.setStorageSync('formSubmit', e.detail.value);
    return;
    var wxinfo = wx.getStorageSync('wxInfo');
    for (var key in data) {

      if (key == 'wxOpenid') {
        data.remove(key);
        data['wxOpenid'] = wxinfo.openid;
      } else {
        data['wxOpenid'] = wxinfo.openid;
      }

      if (key == 'rest') {
        data.remove(key);
        data['rest'] = this.data.rest;
      } else {
        data['rest'] = this.data.rest;
      }

      if (key == 'wxUnionid') {
        data.remove(key);
        data['wxUnionid'] = wxinfo.unionid;
      } else {
        data['wxUnionid'] = wxinfo.unionid;
      }

      if (key == 'memberId') {
        data.remove(key);
        data['memberId'] = wx.getStorageSync('memberid');
      } else {
        data['memberId'] = wx.getStorageSync('memberid');
      }

      if (key == 'imageUrl') {
        data.remove(key);
        data['imageUrl'] = this.data.user.avatar;
      } else {
        data['imageUrl'] = this.data.user.avatar;
      }
    }


    console.log(data);
    //这个地方应该先走一个上传头像的接口  成功以后再走这个接口
    var that = this;
    var token = wx.getStorageSync('token')
    //注册接口
    util.requestPost(api.getCreateJobRecruit, data, token).then(
      res => {
        console.log("接口是否走成功了");
        console.log(res);
        console.log(res.data.success);
        if (res.data.success && res.data.code == 200) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            // jobCompany: "",
            position: '',
            wages: '',
            experience: '',
            typejobPlaceqy: '',
            jobEducation: '',
            education: '',
            jobDescribe: '',
            "user.avatar": "../../static/images/add-img.png",
          })
          // //成功
          // wx.navigateBack({
          //   delta: -1
          // })
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


  // 行业点击事件
  industrybtn: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    if (index == 0) {
      that.setData({
        seleNumber: 0,
        pickertit: "薪资要求(月薪，单位：千元)",
        packList: ["面议", "1k-2k", "2k-3k", "3k-4k", "4k-5k", "5k-6k", "6k-7k", "7k-8k", "8k-9k", "9k-10k", "10k-11k", "11k-12k", "12k-13k", "13k-14k", "14k-15k", "15k-16k", "16k-17k", "17k-18k", "19k-20k", "20k-21k", "21k-22k", "22k-23k", "23k-24k", "24k-25k", "25k-26k", "26k-27k", "27k-28k", "28k-29k", "29k-30k", "31k-32k", "32k-33k", "33k-34k", "34k-35k", "35k-36k", "36k-37k", "37k-38k", "38k-39k", "39k-40k", "40k-41k", "41k-42k", "42k-43k", "43k-44k", "44k-45k", "45k-46k", "46k-47k", "47k-48k", "48k-49k", "49k-50k",],
      })
    }
    if (index == 1) {
      that.setData({
        seleNumber: 1,
        pickertit: "经验",
        packList: ["经验不限", "应届生", "1年以内", "1-3年", "3-5年", "5-10年", "10年以上"],
      })
    }
    if (index == 2) {
      that.setData({
        seleNumber: 2,
        pickertit: "学历",
        packList: ["初中及以下", "中专/中技", "高中", "大专", "本科", "硕士", "博士",],
      })
    }
    this.setData({
      pickvalue: 0,
      showDialog: !this.data.showDialog,
      jfValue: this.data.packList[0],
      public: this.data.showDialog,
    })
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
   * 职位选择
   */
  positionbtn: function (e) {
    wx.navigateTo({
      url: '../position/position',
    })
  },

  /**
   * 确定按钮
   */
  pushrecharge: function (e) {
    this.setData({
      showDialog: !this.data.showDialog,
      public: this.data.showDialog,
    })
    if (this.data.seleNumber == 0) {
      this.setData({
        wages: this.data.jfValue
      })
    }
    if (this.data.seleNumber == 1) {
      this.setData({
        experience: this.data.jfValue
      })
    }
    if (this.data.seleNumber == 2) {
      this.setData({
        education: this.data.jfValue
      })
    }
  },

  bindChange: function (e) {
    console.log("第一个");
    console.log(e);
    const index = e.detail.value[0];
    this.setData({
      jfValue: this.data.packList[index],
    })

    console.log(this.data.jfValue);
  },


  // 提示弹框是否出现
  setSubPopView: function () {
    this.setData({
      showDialogSub: !this.data.showDialogSub,
      public: this.data.showDialog,
    })
  },


  /**
    * 提示取消
    */
  industrybtnsub: function () {
    this.setData({
      showDialogSub: !this.data.showDialogSub,
      public: this.data.showDialog,
    })
  },

  /**
     * 提示确定
     */
  pushrechargesub: function (e) {
    const that = this;
    this.setData({
      showDialogSub: !this.data.showDialogSub,
      public: this.data.showDialog,
    })



    var data = wx.getStorageSync('formSubmit');
    var wxinfo = wx.getStorageSync('wxInfo');
    for (var key in data) {

      if (key == 'wxOpenid') {
        data.remove(key);
        data['wxOpenid'] = wxinfo.openid;
      } else {
        data['wxOpenid'] = wxinfo.openid;
      }

      if (key == 'restDate') {
        data.remove(key);
        data['restDate'] = this.data.rest;
      } else {
        data['restDate'] = this.data.rest;
      }

      if (key == 'wxUnionid') {
        data.remove(key);
        data['wxUnionid'] = wxinfo.unionid;
      } else {
        data['wxUnionid'] = wxinfo.unionid;
      }

      if (key == 'memberId') {
        data.remove(key);
        data['memberId'] = wx.getStorageSync('memberid');
      } else {
        data['memberId'] = wx.getStorageSync('memberid');
      }

      if (key == 'imageUrl') {
        data.remove(key);
        data['imageUrl'] = this.data.user.avatar;
      } else {
        data['imageUrl'] = this.data.user.avatar;
      }
    }

    //这个地方应该先走一个上传头像的接口  成功以后再走这个接口
    var token = wx.getStorageSync('token')
    //注册接口
    util.requestPost(api.getCreateJobRecruit, data, token).then(
      res => {
        console.log("接口是否走成功了");
        console.log(res);
        console.log(res.data.success);
        if (res.data.success && res.data.code == 200) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            // jobCompany: "",
            tits: '职位描述（200以内）',
            position: '',
            wages: '',
            experience: '',
            typejobPlaceqy: '',
            jobEducation: '',
            education: '',
            jobDescribe: '',
            "user.avatar": "../../static/images/add-img.png",
          })
          // //成功
          // wx.navigateBack({
          //   delta: -1
          // })
        } else {
          //失败了
          util.toast(res.data.message);
        }
      }
    ).catch();

  },

  /**
  * 性别选择的时候触发
  */
  check(e) {
    console.log(e)
    var that = this;
    var rest = e.currentTarget.dataset.index
    that.setData({
      rest: rest
    })
  },


  /***
   * 招聘企业信息一栏的点击事件
   */
  jobbtn:function() {
    wx.navigateTo({
      url: '../introduce/introduce',
    })
  },
  //失去焦点时获取里面评论内容
  bindTextAreaBlur: function (e) {
    console.log("失去焦点时获取里面评论内容"),
      console.log(e.detail.value)
    this.setData({
      tits: e.detail.value,
    })
  },
})