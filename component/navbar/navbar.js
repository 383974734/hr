// navbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: "标题",
    },

    naviteml: {
      type: String,
      value: "0",//0.都不显示  1.显示左侧两个按钮   
    },

    navpop: {
      type: String,
      value: "0",//0.都不显示  1.显示
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 返回上一页面
    _navback() {
      wx.navigateBack()
    },
    //返回到首页
    _backhome() {
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
  }
})
