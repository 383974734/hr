// pages/home/home.js

const app = getApp()

var util = require("../../utils/util.js");
var api = require("../../utils/api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "", //窗口高度
    winHeights: "", //窗口高度
    winHeightRPX: "",
    calc: '',
    isHidden: true,//吸顶是否显示
    currentTab: 0, //预设当前项的值
    // 此页面 页面内容距最顶部的距离
    navheight: app.globalData.height, 
    swiperCurrent: 0,
    //提示审核功能：标题
    popTit:'亲，您的资料已在审核中',
    //提示审核功能：账号是否审核中
    popExamine: false,
    //提示审核功能：是否显示
    popShowDialog: false,
    expertList: [1, 2, 3],
    json:{}, 
    modular: [{
      mes: 1,//是否显示小红点  0.不显示   1.显示
      news: 0, //是否显示 new 图标    0.不显示   1.显示
      img: "../../static/images/hone-class-1.png",
      name: "发求职",},{
      mes: 0,
      news: 0,
      img: "../../static/images/hone-class-2.png",
      name: "发招聘"},{
      mes: 0,
      news: 0,
      img: "../../static/images/hone-class-3.png",
      name: "提问题"},{
      mes: 1,
      news: 0,
      img: "../../static/images/hone-class-4.png",
      name: "账户"},{
      mes: 1,
      news: 1,
      img: "../../static/images/hone-class-5.png",
      name: "通知"}],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: 'HR私享圈',
    })
    const that = this;
    that.loadData();
    that.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    })

    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;

        var calc = clientHeight * rpxR - 100;

        var calcH = clientHeight * rpxR;
        console.log('输出：' + calc)
        that.setData({
          winHeights: calc - 25,
          winHeightRPX: calcH + 255 + 90 + 190 + 60,
          winHeight: res.screenHeight + 90 + 190 + 60,
          calc: calc,
        });
        console.log('窗口高度' + that.data.winHeights);
        console.log('窗口高度RPX' + that.data.winHeightRPX);
        console.log('窗口高度--' + that.data.winHeight);
      }
    });
    
  },


  /**
   * 接口调用
   */
  loadData: function (e) {
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    var memberid = wx.getStorageSync('memberid');
    const that = this;
    var data = {
      memberId: memberid,
    }
    var token = wx.getStorageSync('token')
    // util.requestGet(api.getHomeData, data).then(
    util.requestGet(api.getNewHomeData, data, token).then(
      res => {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        // 隐藏加载框
        wx.hideLoading();
        console.log("首页接口是否走成功了");
        console.log(res);
        if (res.data.success && res.data.code == 200) {
          //成功
          var json = res.data;
          console.log(json);
          var arr = res.data.data.question;
          for (var index in arr) {
            var temp = arr[index];
            console.log(temp.questionMessage.length);
            if (temp.questionMessage.length > 60) {
              var str = temp.questionMessage.substring(0, 60);
              temp.questionMessage = str + '...';
            }
          }

          that.setData({
            json: json.data
          })
          if (json.data.messageState == '1') {
            that.setData({
              modular: [{
                mes: 1,//是否显示小红点  0.不显示   1.显示
                news: 0, //是否显示 new 图标    0.不显示   1.显示
                img: "../../static/images/hone-class-1.png",
                name: "发求职",
              }, {
                mes: 0,
                news: 0,
                img: "../../static/images/hone-class-2.png",
                name: "发招聘"
              }, {
                mes: 0,
                news: 0,
                img: "../../static/images/hone-class-3.png",
                name: "提问题"
              }, {
                mes: 1,
                news: 0,
                img: "../../static/images/hone-class-4.png",
                name: "账户"
              }, {
                mes: 1,
                news: 1,
                img: "../../static/images/hone-class-6.png",
                name: "通知"
              }]
            })
          }else {
            that.setData({
              modular: [{
                mes: 1,//是否显示小红点  0.不显示   1.显示
                news: 0, //是否显示 new 图标    0.不显示   1.显示
                img: "../../static/images/hone-class-1.png",
                name: "发求职",
              }, {
                mes: 0,
                news: 0,
                img: "../../static/images/hone-class-2.png",
                name: "发招聘"
              }, {
                mes: 0,
                news: 0,
                img: "../../static/images/hone-class-3.png",
                name: "提问题"
              }, {
                mes: 1,
                news: 0,
                img: "../../static/images/hone-class-4.png",
                name: "账户"
              }, {
                mes: 1,
                news: 1,
                img: "../../static/images/hone-class-5.png",
                name: "通知"
              }]
            })
          }
        } else {
          if (res.data.code == 700){
            wx.setStorageSync('isLogin', 'login_n');
            console.log("退出登录按钮点击事件");

            wx.reLaunch({
              url: '../index/index',
            })
          }else {
            //失败了
            // util.toast(res.data.message);
            wx.setStorageSync('isLogin', 'login_n');
            console.log("退出登录按钮点击事件");

            wx.reLaunch({
              url: '../index/index',
            })
          }
        }
      }
    ).catch();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击分类部分进行跳转
   */
  modularpush: function (res) {
    console.log(res);
    console.log(res.currentTarget.dataset.index);
    var index = res.currentTarget.dataset.index;
    

    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
      limit: "1",
      page: '1',
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getMessageList, data, token).then(
      res => {
        console.log(res);
        if (res.data.code == 200 && res.data.success) {
          switch (index) {
            case 0:
              console.log("点击发求职");
              wx.navigateTo({
                // url: '../newpersonnel/newpersonnel',
                url: '../newpersonneladd/newpersonneladd',
              })
              break;
            case 1:
              console.log("点击发招聘");
              that.pushAuthentication();
              // wx.navigateTo({
              //   url: '../recruitadd/recruitadd',
              //   // url: '../authentication/authentication',
                
              // })
              break;
            case 2:
              console.log("点击提问题");
              wx.navigateTo({
                url: '../uploadproblem/uploadproblem',
              })
              break;
            case 3:
              console.log('点击H币');
              wx.navigateTo({
                // url: '../balance/balance',
                url: '../newbalance/newbalance',
              })
              break;
            case 4:
              console.log('点击通知');
              wx.navigateTo({
                url: '../notice/notice',
              })
              break;
          }
        } else {
          console.log('失败了');
          if (res.data.code == 666) {
            //需要完善资料
            that.setData({
              popTit: res.data.message,
              popExamine: false,
              popShowDialog: true,
            })

          } else if (res.data.code == 777) {
            //审核中
            that.setData({
              popTit: res.data.message,
              popExamine: true,
              popShowDialog: true,
            })
          }
        }
      }
    )

  },

  /**
   * 协会消息
   */
  jobnewslist: function(res) {
    console.log("点击协会消息");
    wx.navigateTo({
      url: '../newslist/newslist',
    })
  },

  /**
   * 热门培训
   */
  jobwanted: function(res) {
    console.log("点击热门培训");
    wx.navigateTo({
      url: '../train/train',
    })
  },

  //轮播图的切换事件
  swiperChange: function (e) {
    //只要把切换后当前的index传给<swiper>组件的current属性即可
    this.setData({
      swiperCurrent: e.detail.current
    })
    // if (event.detail.source == "touch") {
    //   //防止swiper控件卡死
    //   if (this.data.swiperCurrent == 0 && this.data.preIndex > 1) {//卡死时，重置current为正确索引
    //     this.setData({ swiperCurrent: this.data.preIndex });
    //   }
    //   else {//正常轮转时，记录正确页码索引
    //     this.setData({ preIndex: this.data.swiperCurrent });
    //   }
    // }

    
  },
  //点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },


  

  /**
   * 招聘职位全部列表
   */
  recruitpush: function(e) {
    wx.navigateTo({
      url: '../recruit/recruit',
    })
  },

  /**
   * 点击提问题
   */
  problempush: function(e) {
    wx.navigateTo({
      url: '../problem/problem',
    })
  },
  /**
   * 招聘详情
   */
  jobWabtedPush: function(e) {
    wx.navigateTo({
      url: '../recruitcon/recruitcon?jobId=' + e.currentTarget.dataset.jobid,
    })
  },
  /**
   * 问题详情
   */
  problemconpush: function(e) {
    console.log('我是点击cell进入的');
    console.log(e);
    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
      limit: "1",
      page: '1',
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getMessageList, data, token).then(
      res => {

        if (res.data.code == 200 && res.data.success) {
          wx.navigateTo({
            url: '../problemcon/problemcon?questionID=' + e.currentTarget.dataset.seleid + '&memberId=' + e.currentTarget.dataset.memberid,
          })
        } else {
          console.log('失败了');
          if (res.data.code == 666) {
            //需要完善资料
            that.setData({
              popTit: res.data.message,
              popExamine: false,
              popShowDialog: true,
            })

          } else if (res.data.code == 777) {
            //审核中
            that.setData({
              popTit: res.data.message,
              popExamine: true,
              popShowDialog: true,
            })
          }
        }
      }
    )

    
  },

  /**
   * 培训详情
   */
  trainconpush: function(e) {
    const that = this;
    var memberid = wx.getStorageSync('memberid');
    var data = {
      memberId: memberid,
      limit: "1",
      page: '1',
    }
    var token = wx.getStorageSync('token')
    util.requestPost(api.getMessageList, data, token).then(
      res => {
        if (res.data.code == 200 && res.data.success) {
          wx.navigateTo({
            url: '../traincon/traincon?trainId=' + e.currentTarget.dataset.trainid,
          })
        } else {
          console.log('失败了');
          if (res.data.code == 666) {
            //需要完善资料
            that.setData({
              popTit: res.data.message,
              popExamine: false,
              popShowDialog: true,
            })

          } else if (res.data.code == 777) {
            //审核中
            that.setData({
              popTit: res.data.message,
              popExamine: true,
              popShowDialog: true,
            })
          }
        }
      }
    )

  },

  /**
   * 协会消息详情
   */
  /**
   * cell 点击
   */
  newsdetailspush: function (e) {
    wx.navigateTo({
      url: '../newsdetails/newsdetails?messageId=' + e.currentTarget.dataset.messageid,
    })
  },


  // 下拉刷新
  onPullDownRefresh: function () {
    console.log('触发下拉刷新'),
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    that.loadData();
  },

  /**
   * 判断是否审核企业信息了  
   */
    pushAuthentication: function () {


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
          console.log(json.data.busName);
          // 1: 未通过     2: 通过      3: 过期     4: 审核中
          if (json.data.businessAuth == '2') {
            wx.navigateTo({
              url: '../recruitadd/recruitadd?jobCompany=' + json.data.busName,
            })
          } else {
            wx.navigateTo({
              url: '../authentication/authentication?businessAuth=' + json.data.businessAuth,
            })
          }
          // wx.navigateTo({
          //   url: '../recruitadd/recruitadd?jobCompany=' + json.data.busName,
          // })
        } else {
          util.toast(res.data.message);
        }
      }
    )
  },

  /**
   * 点击banner的cenn
   */
  bannercell: function(e) {
    console.log(e);
    if (e.currentTarget.dataset.type == 1) {
      wx.navigateTo({
        url: '../imgview/imgview?newsUrl=' + e.currentTarget.dataset.url
      })
    }
    if (e.currentTarget.dataset.type == 2) {
      wx.navigateTo({
        url: '../webview/webview?newsUrl=' + e.currentTarget.dataset.url
      })
    }
    if (e.currentTarget.dataset.type == 3) {
      wx.navigateTo({
        url: '../traincon/traincon?trainId=' + e.currentTarget.dataset.url,
      })
    }
    
  },

  // 滚动切换标签样式
  switchTab: function (e) {
    console.log(e.detail)
    //e.detail.current现在是在哪一个选项卡里面 
    switch (e.detail.current) {
      case 0:
        this.setData({
          currentTab: e.detail.current,
          expertList: [
            { //假数据
              img: "../../static/images/home_cell_0.png",
            },
            { //假数据
              img: "../../static/images/home_cell_1.png",
            },
            { //假数据
              img: "../../static/images/home_cell_2.png",
            },
            { //假数据
              img: "../../static/images/home_cell_0.png",
            },
            { //假数据
              img: "../../static/images/home_cell_1.png",
            },
            { //假数据
              img: "../../static/images/home_cell_2.png",
            },
          ]
        }); break;
      case 1:
        this.setData({
          currentTab: e.detail.current,
          expertList: []
        }); break;
      case 2:
        this.setData({
          currentTab: e.detail.current,
          expertList: []
        }); break;
    }
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

  onPageScroll: function (res) {
    // console.log("滑动距离：" + res.scrollTop);
  },

  /**
   * 人才求职cell点击事件
   */
  listpush: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../newpersonnelcon/newpersonnelcon?jobwantedID=' + e.currentTarget.dataset.id,
    })
  },

  pushNewpersonnelClick: function() {
    wx.navigateTo({
      url: '../newpersonnel/newpersonnel',
    })
  },


  //滚动监听
  scroll: function (e) {
    var that = this;
    console.log(e.detail.scrollTop)
    if (e.detail.scrollTop == 0) {
      that.loadData();
    }

    const query = wx.createSelectorQuery()
    query.select('#the-id').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      res[0].top // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置


      console.log('res[0].top：' + res[0].top)
      console.log('res[1].scrollTop：' + res[1].scrollTop)
      if (res[0].top < 8) {
        console.log('正确的判断')
        that.setData({
          isHidden: false
        })
      }else {
        console.log('错误的判断')
        that.setData({
          isHidden: true
        })
      }
    })


  }
  
})