// textview.js
Component({

  behaviors: ['wx://form-field'],//wx://form-field 代表一个内置 behavior ，它使得这个自定义组件有类似于表单控件的行为。
  /**
   * 组件的属性列表
   */
  properties: {
    img: {
      type: String,
      value: "图片路径"
    },
    name: {
      type: String,
      value: "名字",
      observer(newVal, oldVal, changedPath) {
        // console.log('adadf------******-------' + newVal)
        // console.log(oldVal)
        // console.log(changedPath)
        // 属性被改变时执行的函数（可选），通常 newVal 就是新设置的数据， oldVal 是旧数
        // 新版本基础库不推荐使用这个字段，而是使用 Component 构造器的 observer 字段代替（这样会有更强的功能和更好的性能）
      }
    },
    type: {
      type:String,
      value: "text",
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
    getInputValue(e) {
      this.setData({
        value: e.detail.value // behaviors: ['wx://form-field']里面就有设置value属性，所以我们可以直接拿来设置value
      })
    }
  }
})
