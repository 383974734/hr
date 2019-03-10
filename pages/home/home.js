// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modular: [{
      img: "../../static/images/resume-list-backimg.png",
      tit: "人才库",
    },
    {
      img: "../../static/images/resume-list-backimg.png",
      tit: "发招聘",
    },
    {
      img: "../../static/images/resume-list-backimg.png",
      tit: "提问题",
    },
    {
      img: "../../static/images/resume-list-backimg.png",
      tit: "H币",
    },
    {
      img: "../../static/images/resume-list-backimg.png",
      tit: "签到",
    }],

    job_wanted: [{
      tit: "省区经理(黑龙江)",
      money: "12-18万",
      add: "哈尔滨",
      year: "3年以上",
      education: "大专及以上",
      img: "../../static/images/job_wanted1.png",
      name: "上海飞科电器有限公司",
      subtit: "国内上市公司",
      number: "1000-2000人",
      industry: "家电业"
    },
    {
      tit: "大区销售经理-华北-京津翼 东北 山西 大同 我乱写的目的就是为了显示不下",
      money: "12-24万",
      add: "哈尔滨",
      year: "1年以上",
      education: "大专及以上",
      img: "../../static/images/job_wanted2.png",
      name: "安进医疗科技(北京)有限公司",
      subtit: "中外合营(盒子·合作)",
      number: "1-49人",
      industry: "医疗器械"
    },
    {
      tit: "医疗器械销售经理",
      money: "12-24万",
      add: "哈尔滨",
      year: "3年以上",
      education: "大专及以上",
      img: "../../static/images/job_wanted3.png",
      name: "深圳贞观的新科技有限公司北京分公司",
      subtit: "私营·民营企业",
      number: "50-99人",
      industry: "互联官网·电商"
    }],

    problem: [{
      tit: "两会进行时:那些与你有关的变化",
      img: "../../static/images/problem1.png",
      subtit: "",
      type: "1",
      btn: "1",
    },
    {
      tit: "如何看待百度贴吧-杨超越吧正在筹办的第一届杨超越杯变成大赛？杨超越吧正在筹办的第一届杨超越杯变成大赛？",
      img: "../../static/images/problem2.png",
      subtit: "995 万热度",
      type: "",
      btn: "",
    },
    {
      tit: "有些男生为什么一点儿恋爱想法都没有？",
      subtit: "",
      img: "../../static/images/problem3.png",
      subtit: "874 万热度",
      type: "",
      btn: "",
    },],

    train: [{
      img: "../../static/images/train1.png",
      tit: "首席投资官丁鹏:学会财富管理 穿越牛熊周期",
      number: "66节",
      time: "11.7小时",
    },
    {
      img: "../../static/images/train2.png",
      tit: "「轻」松营:低预算营销的使用方法",
      number: "1节",
      time: "1.3小时",
    },
    {
      img: "../../static/images/train3.png",
      tit: "正反隋炀帝:一手好牌是如何打丢的",
      number: "",
      time: "",
    },
    {
      img: "../../static/images/train4.png",
      tit: "管清友教你2019年怎么投?穿越经济周期的投从这里我开始乱写的为了就是让这块布局显示不行",
      number: "66节",
      time: "11.7小时",
    }],

    news: [{
      tit: "坚决打赢蓝天碧海净土保卫战",
      subtit: "人民日报",
      img: "../../static/images/news1.png",
      comment: "",
    },
    {
      tit: "什么事儿让省长一句话重复三遍?",
      subtit: "北京青年报",
      img: "../../static/images/news2.png",
      comment: "",
    },
    {
      tit: "全国人大代表冯琪雅建议:回复强制性婚检",
      subtit: "澎湃新闻",
      img: "../../static/images/news3.png",
      comment: "",
    },
    {
      tit: "黑龙江省委书记张庆伟:我不赞同一有事就说基层干干部",
      subtit: "政事儿",
      img: "../../static/images/news4.png",
      comment: "98评",
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: 'HR圈',
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

  }
})