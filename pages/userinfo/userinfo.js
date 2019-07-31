// pages/userinfo/userinfo.js
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
      avatar: "../../static/images/user_img-placeholder.png",
    },
    // 此页面 页面内容距最顶部的距离
    navheight: app.globalData.height,
    json: {},
    sex: 1,
    showDialog: false,
    birthday: "",
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

    years,
    year: date.getFullYear(),
    months,
    month: 2,
    days,
    day: 2,
    value: [9999, 1, 1],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人信息',
    })

    this.loadData();
  },


  /**
   * 请求接口
   */
  loadData: function (e) {


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
            json: json.data,
            birthday: json.data.birthday,
            sex: json.data.sex,
            'user.avatar': json.data.imageUrl == "" ? "../../static/images/user_img-placeholder.png" : json.data.imageUrl,
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
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var data = e.detail.value;
    if (data.uname == "") {
      util.toast('请填写姓名');
      return;
    } else if (data.birthday == '') {
      util.toast('请填写生日');
      return;
    } else if (data.wechatId == '') {
      util.toast('请填写微信号');
      return;
    } else if (data.mobile == '') {
      util.toast('请填写手机号');
      return;
    } else if (data.busTel == '') {
      util.toast('请填写企业固话');
      return;
    } else if (data.email == '') {
      util.toast('请填写邮箱');
      return;
    } else if (data.busName == '') {
      util.toast('请填写所在企业');
      return;
    } else if (data.busJob == '') {
      util.toast('请填写职务');
      return;
    } else if (data.industry == '') {
      util.toast('请填写行业');
      return;
    } else if (data.busNature == '') {
      util.toast('请填写企业性质');
      return;
    } else if (data.recommend == '') {
      util.toast('请填写推荐人手机号');
      return;
    }

    var wxinfo = wx.getStorageSync('wxInfo');

    for (var key in data) {

      if (key == 'wxOpenid') {
        data.remove(key);
        data['wxOpenid'] = wxinfo.openid;
      } else {
        data['wxOpenid'] = wxinfo.openid;
      }

      if (key == 'wxUnionid') {
        data.remove(key);
        data['wxUnionid'] = wxinfo.unionid;
      } else {
        data['wxUnionid'] = wxinfo.unionid;
      }

      if (key == 'id') {
        data.remove(key);
        data['id'] = wx.getStorageSync('memberid');
      } else {
        data['id'] = wx.getStorageSync('memberid');
      }

      if (key == 'sex') {
        data.remove(key);
        data['sex'] = this.data.sex;
      } else {
        data['sex'] = this.data.sex;
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
    //修改个人信息
    var token = wx.getStorageSync('token')
    util.requestPost(api.getUpdatePerInfo, data, token).then(
      res => {
        console.log("接口是否走成功了");
        console.log(res);
        if (res.data.success && res.data.code == 200) {
          //成功
          util.toast(res.data.message);
          wx.navigateBack();
        } else {
          //失败了
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
   * 表单取消按钮
   */
  formCancelt: function (res) {

  },



  /**
   * 提交订单按钮点击事件
   */
  pushTab: function(e) {
    
  },



  bindChange(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },

  // 取消
  industrybtn: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      showDialog: !this.data.showDialog,
    })
  },

  /**
   * 确定按钮
   */
  pushrecharge: function (e) {
    this.setData({
      showDialog: !this.data.showDialog,
      birthday: this.data.year + "-" + this.data.month + "-" + this.data.day,
    })
  },

})