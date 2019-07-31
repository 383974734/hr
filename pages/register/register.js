// pages/register/register.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 此页面 页面内容距最顶部的距离
    navheight: app.globalData.height, 
    sex: 0,
    radios: [
      {
        label: '男',
        value: '男',
      },
      {
        label: '女',
        value: '女',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '会员申请表',
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
   * 跳转到首页
   */
  pushTab: function (res) {
    console.log("跳转按钮触发跳转事件");
    wx.switchTab({
      url: '../home/home',
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
    // console.log('拿到数据：', e.detail.value.name);
    wx.showToast({
      title: e.detail.value.name + "/" + e.detail.value.date + "/" + e.detail.value.wetchat + "/" + e.detail.value.phone + "/" + e.detail.value.tel + "/" + e.detail.value.mail + "/" + e.detail.value.enterprise + "/" + e.detail.value.job + "/" + e.detail.value.industry + "/" + e.detail.value.enterprisetype + "/" + e.detail.value + "/" + e.detail.value.recommend + "/" + e.detail.value.experience + "/" + e.detail.value.certificate + "/" + e.detail.value.problem,
    })
  },
  /**
   * 表单重置触发
   */
  formReset() {
    console.log('form发生了reset事件')
  }


})