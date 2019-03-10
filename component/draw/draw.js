// draw.js
Component({
  externalClasses: ['cb-class'],
  properties: {
    //控制遮罩是否可以点击隐藏抽屉组件
    closeByOutSideClick: {
      type: Boolean,
      value: false
    },
    //抽屉滑动方向
    position: {
      type: String,
      value: 'left'
    },
    //抽屉遮罩层是否显示
    open: {
      type: Boolean
    }
  },
  methods: {
    modeClick() {
      if (this.data.closeByOutSideClick) {
        this.triggerEvent('updateopen', false);
        let myOptionEvent = {}
        this.triggerEvent('change');
      } else {
        return;
      }
    }
  }
});


