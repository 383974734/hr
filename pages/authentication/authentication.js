// pages/authentication/authentication.js   
const app = getApp()
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      avatarT: "../../static/images/add_image.png",
      avatarB: "../../static/images/add_image.png",
    },
    timer: '',//定时器名字
    countDownNum: '1',//倒计时初始值
    businessAuth: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '认证',
    })
    this.setData({
      businessAuth: options.businessAuth
    })
    // util.toast(this.data.businessAuth);
    // 1: 未通过     2: 通过      3: 过期     4: 审核中
    // util.toast(this.data.businessAuth == '1' ? '审核未通过' : this.data.businessAuth == '3' ? '审核已过期' : '审核中');
  },

  /**
   * 发起审核请求接口
   */
  formSubmit: function (e) {
    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
      businessLicenseImage: that.data.user.avatarT,
      idCardImage: that.data.user.avatarB,
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getBusinessAuth, data, token).then(
      res => {
        console.log("发起审核接口是否走成功了");
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          var json = res.data;
          util.toast(res.data.message);
          that.countDown();
          // wx.navigateBack({
          // })
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
  * 上传图片按钮
  */

  //点击图片选择手机相册或者电脑本gtrtgrf地图片
  changeAvatarT: function (e) {
   
    console.log(e);
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
                'user.avatarT': json.data
              })
              console.log(than.user.avatar);
            } else {
              // 隐藏加载框
              wx.hideLoading();
              //失败了
              util.toast(json.message);
            }
          }
        )

      }
    })
  },

  /**
  * 上传图片按钮
  */

  //点击图片选择手机相册或者电脑本gtrtgrf地图片
  changeAvatarB: function (e) {
    
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
                'user.avatarB': json.data
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

  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
          wx.navigateBack({
          })
        }
      }, 1000)
    })
  }

})