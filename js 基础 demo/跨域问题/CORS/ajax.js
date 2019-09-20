function ajax(url, fnSucc, fnFaild) {
	// 1.创建Ajax对象
	if (window.XMLHttpRequest) {
		var oAjax = new XMLHttpRequest();
	} else {
		var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}

	// oAjax.responseType = 'blob'
	// 2.注册回调函数 监听状态改变
	oAjax.onreadystatechange = function () {
		console.log(oAjax.readyState);

		if (oAjax.readyState == 4) {
			if (oAjax.status == 200) {
				// alert('成功了：'+oAjax.responseText);
				// fnSucc(oAjax.responseText);
				fnSucc(oAjax);

			} else {
				// alert('失败了');
				if (fnFaild) {
					fnFaild();
				}
			}
		}
	};
	oAjax.upload.onload = function(e){
		console.log(e, 'upload')
	} // 测试CORS 请求中的任意XMLHttpRequestUpload 对象注册任何事件监听器 会触发预检请求
	oAjax.upload.onprogress = function(){}
	oAjax.onprogress = function (event) {
		console.log(event)
		if (event.lengthComputable) {
			console.log("Received " + event.position + " of " +
				event.totalSize + " bytes");
		}
	};
	// oAjax.withCredentials = true; // 跨越 
	// oAjax.overrideMimeType("application/json");
	// 3.连接服务器（打开和服务器的连接）
	// 初始化
	oAjax.open('post', url, true);
	// 4.发送
	oAjax.send(null);
	// console.log(1111111111)
}