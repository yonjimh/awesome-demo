Page({
  data: {},
  onLoad: function () {
    // 参数名	类型	默认值	说明
    // text	String		要渲染的HTML或Markdown文本
    // args	Array[]	附加参数
    // type	String	html	要渲染的文本类型，可用值html,markdown,md
    // highlight	Boolean	true	是否对pre内文本进行代码高亮
    // highlight_languages	Array['html', 'js', 'css', 'php']	pre代码高亮检测语言。查看可用语言
    // linenums	Boolean	true	是否为pre添加行号显示
    // imghost	String	null	对img标签中src属性可能的相对路径进行域名补全
    // encode	Boolean	true	是否对结果进行JSON编码
    wx.request({
      url: 'https://www.qwqoffice.com/html2wxml/example.html',
      success: res => {
        wx.stopPullDownRefresh();
        this.setData({
          html: res.data
        });
      }
    })
    /*
    wx.request({
    	url: 'https://www.qwqoffice.com/html2wxml/example.html',
    	success: res => {
    		wx.request({
    			url: 'https://www.qwqoffice.com/html2wxml/',
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
    				this.setData({ json: res.data });
    			}
    		})
    	}
    })*/
  },
  wxmlTagATap(e) {
    console.log(e);
  },
  onPullDownRefresh() {
    this.onLoad();
  }
})