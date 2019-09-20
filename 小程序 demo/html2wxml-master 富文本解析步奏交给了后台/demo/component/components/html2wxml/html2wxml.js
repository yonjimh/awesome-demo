var html2wxml = require('html2wxml-main.js');

Component({
  data: {},
  options: {
    addGlobalClass: true
  },
  properties: {
    text: {
      type: String,
      value: null,
      observer: function (newVal, oldVal) {
        if (newVal == '') return;
        // 参数名	类型	默认值	说明
        // text	String		要渲染的HTML或Markdown文本
        // args	Array[]	附加参数
        // type	String	html	要渲染的文本类型，可用值html,markdown,md
        // highlight	Boolean	true	是否对pre内文本进行代码高亮
        // highlight_languages	Array['html', 'js', 'css', 'php']	pre代码高亮检测语言。查看可用语言
        // linenums	Boolean	true	是否为pre添加行号显示
        // imghost	String	null	对img标签中src属性可能的相对路径进行域名补全
        // encode	Boolean	true	是否对结果进行JSON编码
        if (this.data.type == 'html' || this.data.type == 'markdown' || this.data.type == 'md') {
          var data = {
            text: this.data.text,
            type: this.data.type,
            highlight: this.data.highlight,
            linenums: this.data.linenums
          };

          if (this.data.imghost != null) {
            data.imghost = this.data.imghost;
          }

          // 1.3.1 版本
          // wx.request({
          //   url: 'https://www.qwqoffice.com/html2wxml/',
          //   data: data,
          //   method: 'POST',
          //   header: {
          //     'content-type': 'application/x-www-form-urlencoded'
          //   },
          //   success: res => {
          //     html2wxml.html2wxml(res.data, this, this.data.padding);
          //   }
          // })
          // 1.4.0 改变了接口
          wx.request({
            url: 'https://html2wxml.qwqoffice.com/api/',
            data: data,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: res => {
              html2wxml.html2wxml(res.data, this, this.data.padding);
            }
          })
        }
      }
    },
    json: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {
        html2wxml.html2wxml(this.data.json, this, this.data.padding);
      }
    },
    type: {
      type: String,
      value: 'html'
    },
    highlight: {
      type: Boolean,
      value: true,
    },
    highlightStyle: {
      type: String,
      value: 'darcula'
    },
    linenums: {
      type: Boolean,
      value: true,
    },
    padding: {
      type: Number,
      value: 5
    },
    imghost: {
      type: String,
      value: null
    },
    showLoading: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    wxmlTagATap: function (e) {
      this.triggerEvent('WxmlTagATap', {
        src: e.currentTarget.dataset.src
      });
    }
  },
  attached: function () {}
})