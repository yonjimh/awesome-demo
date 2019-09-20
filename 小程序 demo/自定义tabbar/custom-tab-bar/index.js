import wepy from 'wepy'
let app = wepy.$instance
console.log(app.globalData)

Component({
  properties: {
    num: {
      // 属性名
      type: Number,
      value: 0
    }
  },
  data: {
    selected: 0,
    color: '#808080',
    selectedColor: '#000',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
      {
        pagePath: '/pages/index',
        selectedIconPath: '/assets/images/tab_home_icon_s@2x.png',
        iconPath: '/assets/images/tab_home_icon_n@2x.png',
        text: '精选'
      },
      {
        pagePath: '/pages/index',
        selectedIconPath: '/assets/images/tab_increase_icon_n@2x.png',
        iconPath: '/assets/images/tab_increase_icon_n@2x.png',
        text: '服务'
      },
      {
        pagePath: '/pages/my',
        selectedIconPath: '/assets/images/tab_my_icon_s@2x.png',
        iconPath: '/assets/images/tab_my_icon_n@2x.png',
        text: '我的'
      }
    ],
    showServeMask: false
  },
  // attached() {},
  lifetimes: {
    // !!!
    // 自小程序基础库版本 2.2.3 起，组件的的生命周期也可以在 lifetimes 字段内进行声明（这是推荐的方式，其优先级最高）。
    created() {
      // console.log(this.data.selected)
    },
    attached() {
      console.log(this.data.num, 'attached', this)

      this.setData({
        selected: this.data.num
      })

      // console.log('switchTab')
    }
  },
  ready() {
    // this.setData({
    //   selected: this.data.num
    // })
    // this.selected = this.data.num
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {
      // wepy.getTabBar = this
      // console.log(this.data.num, 'shownum show', this)
      // app.globalData.emitter.on('switchTab', selectNum => {
      //   console.log(11)
      //   this.setData({
      //     selected: selectNum
      //   })
      // })
    },
    hide() {},
    resize() {}
  },
  methods: {
    preventTouchMove() {},
    hideMask() {
      this.setData({
        showServeMask: false
      })
    },
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      let that = this
      if (e.currentTarget.dataset.index === 1) {
        this.setData({
          showServeMask: true
        })
      } else {
        wx.switchTab({ url })
      }
      console.log(that.data.num)
      // console.log(data.index)

      this.setData({
        selected: this.data.num
      })
    }
  }
})
