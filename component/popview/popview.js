// component/popview/popview.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //文字
    tit: {
      type: String,
      value: ''
    },
    //是否显示
    showDialog: {
      type: Boolean,
      value: true,
    },
    //审核中true， 完善信息false，
    examine: {
      type: Boolean,
      value: false,
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
    /**
     * 取消
     */
    industrybtn: function(e) {
      this.setData({
        showDialog: !this.data.showDialog,
      })
    },

    /*
    * 完善信息
    */
    pushrecharge: function(e) {
      this.setData({
        showDialog: !this.data.showDialog,
      })
      wx.navigateTo({
        url: '../../pages/userinfo/userinfo',
      })
    }
  },


})
