// pages/industry/industry.js

var util = require("../../utils/util.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 此页面 页面内容距最顶部的距离
    navheight: app.globalData.height,

    //已经选择的标签
    seleArr: [],
    //标签
    tit: [{
      name: "互联网/电子/通信",
      tits: [{
        tit: "电子商务",
        sele: false,
      },
      {
        tit: "游戏",
        sele: false,
      },
      {
        tit: "媒体",
        sele: false,
      },
      {
        tit: "广告营销",
        sele: false,
      },
      {
        tit: "数据服务",
        sele: false,
      },
      {
        tit: "医疗健康",
        sele: false,
      },
      {
        tit: "生活服务",
        sele: false,
      },
      {
        tit: "O2O",
        sele: false,
      },
      {
        tit: "旅游",
        sele: false,
      },
      {
        tit: "分类信息",
        sele: false,
      },
      {
        tit: "音乐/视频/阅读",
        sele: false,
      },
      {
        tit: "在线教育",
        sele: false,
      },
      {
        tit: "社交网络",
        sele: false,
      },
      {
        tit: "人力资源服务",
        sele: false,
      },
      {
        tit: "企业服务",
        sele: false,
      },
      {
        tit: "信息安全",
        sele: false,
      },
      {
        tit: "新零售",
        sele: false,
      },
      {
        tit: "智能硬件",
        sele: false,
      },
      {
        tit: "移动互联网",
        sele: false,
      },
      {
        tit: "互联网",
        sele: false,
      },
      {
        tit: "计算机软件",
        sele: false,
      },
      {
        tit: "计算机硬件",
        sele: false,
      },
      {
        tit: "计算机服务",
        sele: false,
      },
      {
        tit: "通信/网络设备",
        sele: false,
      },
      {
        tit: "运营商/增值服务",
        sele: false,
      },
      {
        tit: "电子/半导体/集成电路",
        sele: false,
      }],
    },{
      name: "广告/传媒/文化/体育",
      tits: [{
          tit: "广告/公关/会展",
          sele: false,
        },
        {
          tit: "新闻/出版",
          sele: false,
        },
        {
          tit: "广播/影视",
          sele: false,
        },
        {
          tit: "文化/体育/娱乐",
          sele: false,
        }],
    },{
      name: "金融",
      tits: [{
          tit: "银行",
          sele: false,
        },
        {
          tit: "保险",
          sele: false,
        },
        {
          tit: "证券/期货",
          sele: false,
        },
        {
          tit: "基金",
          sele: false,
        },
        {
          tit: "信托",
          sele: false,
        },
        {
          tit: "互联网金融",
          sele: false,
        },
        {
          tit: "投资/融资",
          sele: false,
        },
        {
          tit: "租赁/拍卖/典当/担保",
          sele: false,
        },],
    },{
      name: "教育活动",
      tits: [{
          tit: "学前教育",
          sele: false,
        },
        {
          tit: "院校",
          sele: false,
        },
        {
          // tit: "活动机构",
          tit: "培训机构",
          sele: false,
        },
        {
          tit: "学术/科研",
          sele: false,
        },],
    },{
      name: "制药/医疗",
      tits: [{
          tit: "制药",
          sele: false,
        },
        {
          tit: "医疗/护理/卫生",
          sele: false,
        },
        {
          tit: "医疗设备/器械",
          sele: false,
        },],
    },{
      name: "交通/物流/贸易/零售",
      tits: [{
          tit: "交通/运输",
          sele: false,
        },
        {
          tit: "物流/仓库",
          sele: false,
        },
        {
          tit: "批发/零售",
          sele: false,
        },
        {
          tit: "贸易/进出口",
          sele: false,
        },],
    },{
      name: "专业服务",
      tits: [{
          tit: "咨询",
          sele: false,
        },
        {
          tit: "法律",
          sele: false,
        },
        {
          tit: "翻译",
          sele: false,
        },
        {
          tit: "人力资源服务",
          sele: false,
        },
        {
          tit: "财务/审计/税务",
          sele: false,
        },
        {
          tit: "检验/认证",
          sele: false,
        },
        {
          tit: "专利/商标/知识产权",
          sele: false,
        },
        {
          tit: "其他专业服务",
          sele: false,
        },],
    },{
      name: "房地产/建筑",
      tits: [{
          tit: "房地产开发",
          sele: false,
        },
        {
          tit: "工程施工",
          sele: false,
        },
        {
          tit: "建筑设计",
          sele: false,
        },
        {
          tit: "装修装饰",
          sele: false,
        },
        {
          tit: "建材",
          sele: false,
        },
        {
          tit: "地产经纪/中介",
          sele: false,
        },
        {
          tit: "物业服务",
          sele: false,
        },],
    },{
      name: "汽车",
      tits: [{
          tit: "汽车生产",
          sele: false,
        },
        {
          tit: "汽车零部件",
          sele: false,
        },
        {
          tit: "4S店/后市场",
          sele: false,
        },],
    },{
      name: "机械/制造",
      tits: [{
          tit: "机械设备/机电/重工",
          sele: false,
        },
        {
          tit: "仪器仪表/工业自动化",
          sele: false,
        },
        {
          tit: "原材料及加工/模具",
          sele: false,
        },
        {
          tit: "印刷/包装/造纸",
          sele: false,
        },
        {
          tit: "船舶/航空/航天",
          sele: false,
        },],
    },{
      name: "消费品",
      tits: [{
          tit: "食品/饮料/烟酒",
          sele: false,
        },
        {
          tit: "日化",
          sele: false,
        },
        {
          tit: "服装/纺织/皮革",
          sele: false,
        },
        {
          tit: "家具/家电/家居",
          sele: false,
        },
        {
          tit: "玩具/礼品",
          sele: false,
        },
        {
          tit: "珠宝/首饰",
          sele: false,
        },
        {
          tit: "工艺品/收藏品",
          sele: false,
        },
        {
          tit: "办公用品及设备",
          sele: false,
        },],
    },{
      name: "服务业",
      tits: [{
          tit: "餐饮",
          sele: false,
        },
        {
          tit: "酒店",
          sele: false,
        },
        {
          tit: "旅游",
          sele: false,
        },
        {
          tit: "美容/美发",
          sele: false,
        },
        {
          tit: "婚庆/摄影",
          sele: false,
        },
        {
          tit: "其他服务行业",
          sele: false,
        },],
    },{
      name: "能源/化工/环保",
      tits: [{
          tit: "石油/石化",
          sele: false,
        },
        {
          tit: "化工",
          sele: false,
        },
        {
          tit: "矿场/地质",
          sele: false,
        },
        {
          tit: "采掘/冶炼",
          sele: false,
        },
        {
          tit: "电力/热力/燃气/水利",
          sele: false,
        },
        {
          tit: "新能源",
          sele: false,
        },
        {
          tit: "环保",
          sele: false,
        },],
    },{
      name: "政府/非营利机构/其他",
      tits: [{
          tit: "政府/公共事业",
          sele: false,
        },
        {
          tit: "非营利机构",
          sele: false,
        },
        {
          tit: "农/林/牧/渔",
          sele: false,
        },
        {
          tit: "其他行业",
          sele: false,
        },],
    },],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '期望行业',
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
   * 点击选择标签
   */
  seleitem: function(e) {
    var that=this;
    var index = e.currentTarget.dataset.index;
    var indexs = e.currentTarget.dataset.indexs;
    // 下面这段话的语法我也是无语了  就是把要取出来的这个玩应变成字符串再赋值   不是不很无语
    var item = "tit[" + index + "].tits[" + indexs + "]sele";
    
    //打印当前选择数据文字
    // console.log(that.data.tit[index].tits[indexs].tit);

    //打印当前已经选择的所有数据
    // console.log(that.data.seleArr);


    //遍历数组  查看数组中是否包含所选数据
    for (var i in that.data.seleArr) {
      var temp = that.data.seleArr[i];
      // console.log(i + ": " + temp.tit)

      if (temp == that.data.tit[index].tits[indexs].tit) {//包含
        that.data.seleArr.splice(i, 1);
        that.setData({
          seleArr: that.data.seleArr
        })
      }
    }

    //判断当前所选择的数据中是否已经包含三组数据   所选数据不可大于3
    if (that.data.seleArr.length == 3) {
      util.toast('最多可选择3个');
    }else {
      //修改数据源     修改字段：sele   
      that.setData({
        [item]: !(that.data.tit[index].tits[indexs].sele)
      })

      //把所选中的数据添加到选中数组中
      if (that.data.tit[index].tits[indexs].sele) {
        that.setData({
          seleArr: that.data.seleArr.concat(that.data.tit[index].tits[indexs].tit)
        })
      }
    }
  },


  /**
   * 保存按钮
   */
  sendCode: function(e) {
    var that = this;
    // console.log(that.data.seleArr.join("."));
    //所选择的行业数据
    wx.setStorageSync("industry", that.data.seleArr.join("."));
    wx.navigateBack();
    
  }
})