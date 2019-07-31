// pages/newpersonneladd/newpersonneladd.js

const app = getApp()
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1930; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}



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
    showDialogDay: false,
   
    // 飘起来的输入框
    jfValue: "",

    // resumeTitle: '',
    resumeName: '',
    resumePhone: '',
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
    //毕业时间
    birthday: "",
    //毕业院校
    school: '',
    //专业
    major: '',
    // 学位
    education: '',
    //生日
    birthdayDate: '',
    titlist: [],

    years,
    year: date.getFullYear(),
    months,
    month: 2,
    days,
    day: 2,
    value: [9999, 1, 1],
    //如果1：毕业时间  2：生日
    type: 1,
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

    if (data.jobwantedName == '') {
      util.toast('请填写姓名');
      return;
    } else if (data.jobwantedPhone == '') {
      util.toast('请填写电话');
      return;
    } else if (data.resumeArea == '') {
      util.toast('请填写工作地点');
      return;
    }
    that.setSubPopView();
    wx.setStorageSync('formSubmit', e.detail.value);
    return;


    var memberid = wx.getStorageSync('memberid');
    for (var key in data) {
      if (key == 'jobwantedSex') {
        data.remove(key);
        data['jobwantedSex'] = that.data.sex;
      } else {
        data['jobwantedSex'] = that.data.sex;
      }

      if (key == 'publisherMemberId') {
        data.remove(key);
        data['publisherMemberId'] = memberid;
      } else {
        data['publisherMemberId'] = memberid;
      }

      if (key == 'jobwantedLabel') {
        data.remove(key);
        data['jobwantedLabel'] = that.data.titlist.join(',');
      } else {
        data['jobwantedLabel'] = that.data.titlist.join(',');
      }

      if (key == 'jobwantedImageUrl') {
        data.remove(key);
        data['jobwantedImageUrl'] = that.data.user.avatar;
      } else {
        data['jobwantedImageUrl'] = that.data.user.avatar;
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
            // resumeTitle: '',
            resumeName: '',
            resumePhone: '',
            industry: '',
            position: '',
            remark: '',
            sex: 1,
            resumeArea: '',
            //毕业时间
            birthday: "",
            //毕业院校
            school: '',
            //专业
            major: '',
            // 学位
            education: '',
            //标签
            titlist: [],
            //生日
            birthdayDate: '',
            "user.avatar": "../../static/images/user_img-placeholder.png",
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
  formCancelt: function (res) {

  },


  /**
   * 行业选择按钮
   */
  industrybtn: function () {
    wx.navigateTo({
      url: '../industry/industry',
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
   * 添加标签按钮
   */
  addtitClick: function (e) {
    var that = this;
    if (that.data.titlist.length == 3) {
      util.toast('最多可添加3个标签');
    } else {
      that.setPopView();
    }

  },

  /**
    * 表单提交触发
    */
  formSubmitadd(e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value.problem);
    // var data = e.detail.value;
    var arr = that.data.titlist;
    arr.push(e.detail.value.problem);
    that.setData({
      titlist: arr
    })
    that.setPopView();
    console.log(that.data.titlist);
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
      if (key == 'jobwantedSex') {
        data.remove(key);
        data['jobwantedSex'] = this.data.sex;
      } else {
        data['jobwantedSex'] = this.data.sex;
      }

      if (key == 'publisherMemberId') {
        data.remove(key);
        data['publisherMemberId'] = memberid;
      } else {
        data['publisherMemberId'] = memberid;
      }

      if (key == 'jobwantedLabel') {
        data.remove(key);
        data['jobwantedLabel'] = that.data.titlist.join(',');
      } else {
        data['jobwantedLabel'] = that.data.titlist.join(',');
      }

      if (key == 'jobwantedImageUrl') {
        data.remove(key);
        data['jobwantedImageUrl'] = this.data.user.avatar;
      } else {
        data['jobwantedImageUrl'] = this.data.user.avatar;
      }

    }

    console.log(data);
    var token = wx.getStorageSync('token')
    util.requestPost(api.getInsertJobwanted, data, token).then(
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
            // resumeTitle: '',
            resumeName: '',
            resumePhone: '',
            industry: '',
            position: '',
            remark: '',
            sex: 1,
            resumeArea: '',
            //毕业时间
            birthday: "",
            //毕业院校
            school: '',
            //专业
            major: '',
            // 学位
            education: '',
            //标签
            titlist: [],
            //生日
            birthdayDate: '',
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

  // 选择日期取消事件
  industrybtnDay: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      type: 1,
      showDialogDay: !this.data.showDialogDay,
    })
  },

  /**
   * 选择日期确定事件
   */
  pushrechargeDay: function (e) {
    console.log('this.data.type:' + this.data.type);
    if (this.data.type == 1) {
      this.setData({
        showDialogDay: !this.data.showDialogDay,
        birthday: this.data.year + "-" + this.data.month + "-" + this.data.day,
      })
    }else {
      this.setData({
        showDialogDay: !this.data.showDialogDay,
        birthdayDate: this.data.year + "-" + this.data.month + "-" + this.data.day,
      })
    }
  },

  //生日点击事件
  btnClickBirthday: function(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      type: 2,
      showDialogDay: !this.data.showDialogDay,
    })
  },
  
  bindChangeDay(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
})