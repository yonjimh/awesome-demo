var html2wxml = require('../../html2wxml/html2wxml.js');

Page({
  data: {},
  onLoad: function () {

    wx.request({
      url: 'https://www.qwqoffice.com/html2wxml/example.html',
      success: res => {
        wx.request({
          url: 'https://html2wxml.qwqoffice.com/api/',
          data: {
            text: res.data,
            type: 'html',
            linenums: true,
            highlight: true
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            wx.stopPullDownRefresh();
            html2wxml.html2wxml('article', res.data, this, 5);
          }
        })
      }
    })
  },
  wxmlTagATap(e) {
    console.log(e);
  },
  onPullDownRefresh() {
    this.onLoad();
  }
})