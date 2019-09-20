'use strict';

var animation = window.animation;

var $rabbit6 = _$('rabbit6');

var images = ['ayano.png'];
// animation().loadImage(images).start()
var rightRunningMap = ["0 -854", "-174 -852", "-349 -852", "-524 -852", "-698 -851", "-873 -848"];
var leftRunningMap = ["0 -373", "-175 -376", "-350 -377", "-524 -377", "-699 -377", "-873 -379"];
var rabbitWinMap = ["0 0", "-198 0", "-401 0", "-609 0", "-816 0", "0 -96", "-208 -97", "-415 -97", "-623 -97", "-831 -97", "0 -203", "-207 -203", "-415 -203", "-623 -203", "-831 -203", "0 -307", "-206 -307", "-414 -307", "-623 -307"];
var rabbitLoseMap = ["0 0", "-163 0", "-327 0", "-491 0", "-655 0", "-819 0", "0 -135", "-166 -135", "-333 -135", "-500 -135", "-668 -135", "-835 -135", "0 -262"];
var runMap = ['-10 -10', '-158 -10', '-10 -158']
var downMap = ['-158 -158']
var upMap = ['-306 -10','-10 -10']
// repeat();
// run();
// win();
// lose();
// var easing = BezierEasing(1.00, 0.05, 0.00, 0.78)
var easing =  BezierEasing(0.42, 0, 0.58, 1)
function repeat2() {
	var interval = 50;
	var speed = 30;  // 速度 
	
	var initTop = -128;
	var finalTop = 380;
	var repeatAnimation = animation().loadImage(images).changePosition($rabbit6, downMap, images[3])
	.enterFrame(function (success, time) {
		// time 动画开始到现在的时间
		var p = (time / (finalTop + Math.abs(initTop)));
		console.log(time / finalTop);
		// console.log(finalTop / time, 'finalTop/time finalTop/time');
		// console.log(time, 'time');
		// console.log(easing(p), 'easing(p)');
		if(p > 1) {
			p = 1
		}
		var ratio = (time) / interval;  // 这个比值是指  动画开始到现在的时间/间隔 得到运行了多少次 之后再speed * ratio得到距离值
		var top; 
		// console.log(Math.max(finalTop + speed * ratio, finalTop));
		top = Math.min((initTop + speed * ratio) * easing(p), finalTop);
		console.log(top);
		$rabbit6.style.top = top + 'px';
		if(top === finalTop) {
			success()
		}
	}).changePosition($rabbit6, [upMap[0]], images[3]).wait(200).changePosition($rabbit6, [upMap[1]], images[0])

	repeatAnimation.start(interval);
}
var upStaus = false
function up() {
	var interval = 50;
	var speed = 30;  // 速度 
	var initTop = -128;
	var finalTop = 380;
	var repeatAnimation = animation().loadImage(images).changePosition($rabbit6, runMap, images[4])
	.enterFrame(function (success, time) {
		// time 动画开始到现在的时间
		var p = (time/finalTop);
		if(p > 1) {
			p = 1
		}
		var ratio = (time) / interval;  // 这个比值是指  动画开始到现在的时间/间隔 得到运行了多少次 之后再speed * ratio得到距离值
		var top; 
		top = Math.max((finalTop - speed * ratio) * easing(p), initTop);
		$rabbit6.style.top = top + 'px';
		if(top === initTop) {
			success()
		}
	})

	repeatAnimation.start(interval);
}

function repeat1() {
	var repeatAnimation = animation().loadImage(images).changePosition($rabbit5, runMap, images[3]).repeatForever();
	repeatAnimation.start(260);

	var running = true;
	$rabbit5.addEventListener('click', function () {
		if (running) {
			running = false;
			repeatAnimation.pause();
		} else {
			running = true;
			repeatAnimation.restart();
		}
	});
}
function run() {
	var interval = 80;
	var speed = 6;
	var initLeft = 100;
	var finalLeft = 400;
	var frame = 4;
	var frameLength = 6;
	var right = true;
	var index = 0
	var runAnimation = animation().loadImage(images).enterFrame(function (success, time) {
		// console.log(time);
		// index++
		// console.log(index, 'index index index');
		var ratio = (time) / interval;
		var position;
		var left;
		if (right) {
			position = rightRunningMap[frame].split(' ');
			left = Math.min(initLeft + speed * ratio, finalLeft);
			if (left === finalLeft) {
				right = false;
				frame = 4;
				success();
				return;
			}
		} else {
			position = leftRunningMap[frame].split(' ');
			left = Math.max(finalLeft - speed * ratio, initLeft);
			if (left === initLeft) {
				right = true;
				frame = 4;
				success();
				return;
			}
		}
		if (++frame === frameLength) {
			frame = 0;
		}
		$rabbit2.style.backgroundImage = 'url(' + images[0] + ')';
		$rabbit2.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';
		$rabbit2.style.left = left + 'px';
	}).repeat(1).wait(1000).changePosition($rabbit2, rabbitWinMap, images[2]).then(function () {
		console.log('finish');
	});
	runAnimation.start(80);
}

function _$(id) {
	return document.getElementById(id);
}

var STATE_INITIAL = 0 
var STATE_DOWNING = 1
var STATE_UPING = 2
function Ayano({targetTop, speed = 30, interval = 50, initTop = -128, image = '', el = 'ayano'}) {
	// STATE_INITIAL
	// STATE_DOWN
	// STATE_UP
	// this.initTop
	this.ele = document.getElementById(el)
	this.initTop = initTop
	this.interval = interval
	this.speed = speed
	this.targetTop = targetTop || 380
	this.state = STATE_INITIAL;
	this.image = image
	this.repeatAnimation = null
}

Ayano.prototype.uping = function() {
	if(this.state !== STATE_INITIAL) {
		this.state = STATE_UPING
	}
}

Ayano.prototype.downing = function() {
	if(this.state === STATE_INITIAL) {
		this.state = STATE_DOWNING
	}
}
Ayano.prototype.startUp = function(callback) {
	var _this = this
	_this.removeEventListener()
	// 如果在b2t或者初始化状态的时候不要执行 上升动画
	if(this.state === STATE_UPING || this.state === STATE_INITIAL) {return}
	
	this.state = STATE_UPING
	callback && callback()
	var interval = _this.interval
	var speed = _this.speed
	var initTop = _this.initTop
	var ele = _this.ele
	var finalTop = _this.targetTop
	// var frame = 0;	
	// var runMap1 = runMap.slice().reverse()
	if(this.repeatAnimation) {
		finalTop = this.repeatAnimation.getState() === 1 ? parseInt(ele.style.top) : false || 380;
		this.repeatAnimation.dispose()	
	}
	this.repeatAnimation = animation().loadImage(images).changePosition(ele,['-10px -158px'],images[0])
	.enterFrame(function (success, time) {
		// time 动画开始到现在的时间
		var p = (time / (finalTop + Math.abs(initTop)));
		if(p > 1) {
			p = 1
		}
		// var position;
		// position = runMap[2].split(' ');
		// ele.style.backgroundImage = 'url(' + images[4] + ')';
		// ele.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';
		var ratio = (time) / interval;  // 这个比值是指  动画开始到现在的时间/间隔 得到运行了多少次 之后再speed * ratio得到距离值
		var top; 
		top = Math.max((finalTop - speed * ratio * easing(p)), initTop);
		ele.style.top = top + 'px';
		if(top === initTop) {
			success()
		}
	})
	this.repeatAnimation.start(interval);
}
Ayano.prototype.startDowm = function() {
	// 
	if(this.state === STATE_DOWNING) {return}
	var _this = this
	this.state = STATE_DOWNING
	var interval = _this.interval
	var speed = _this.speed
	var initTop = _this.initTop
	var ele = _this.ele
	// var interval = 50;
	// var speed = 30;  // 速度 
	// var initTop = -128;
	var finalTop = _this.targetTop;
	// this.repeatAnimation 存在对象的时候就说明正在运动中
	if(this.repeatAnimation) {
		initTop = this.repeatAnimation.getState() === 1 ? parseInt(ele.style.top) : false || -128;		
		this.repeatAnimation.dispose()
	}

	this.repeatAnimation = animation()
	.loadImage(images)
	.changePosition(ele, ['-158px -10px'], images[0])
	.enterFrame(function (success, time) {
		// 注意啊 p 是从0到1的
		// time 动画开始到现在的时间
		var p = (time / (finalTop + Math.abs(initTop)));
		// var p = initTop > 0 ? (time / (finalTop - Math.abs(initTop))) : (time / (finalTop + Math.abs(initTop)))
		// console.log(time / finalTop);
		// console.log(finalTop / time, 'finalTop/time finalTop/time');
		// console.log(time, 'time');
		// console.log(easing(p), 'easing(p)');
		// console.log((time / (finalTop + Math.abs(initTop))));
		// console.log(p, ' finalTop finalTop finalTop finalTop finalTop');
		if(p > 1) {
			p = 1
		}
		var ratio = (time) / interval;  // 这个比值是指  动画开始到现在的时间/间隔 得到运行了多少次 之后再speed * ratio得到距离值
		var top; 
		// console.log(Math.max(finalTop + speed * ratio, finalTop));
		top = Math.min((initTop + speed * ratio *  easing(p)) ,finalTop);
		// console.log(top);
		ele.style.top = top + 'px';
		// console.log(speed * ratio);
		// console.log(initTop);
		if(top ===finalTop) {
			success()
		}
	})
	.changePosition(ele, ['-158px -306px'], images[0]) // 跌倒
	.wait(200)
	.then(function(amin) {
		// console.log(amin.index, '同步任务');
		ele.onclick = function() {
			// 这里用了JQ
			$('html, body').animate({
				scrollTop: $('body').offset().top
			}, 800);
			_this.removeEventListener()
		}
	})
	.changePosition(ele, ['-10px -10px'], images[0])  // 站起来
	.wait(4200)
	// .then(function(amin){
	// 	console.log(amin.index, '同步任务');
	// 	ele.style.backgroundPosition ='-10' + 'px ' +'-10' + 'px';
	// })
	.changePosition(ele, ['-158px -158px'], images[0]) // 坐下的
	.then(function(amin) {
		// console.log('坐下', amin.index, '同步任务');
		// console.log(amin.index);
		ele.onmouseover = function() {
			ele.style.backgroundPosition = '-454px -10px';
			// console.log(amin.taskQueue);
			// console.log(amin.index);
			 _this.repeatAnimation.pause()
		}
		ele.onmouseout = function() {
			// ele.style.backgroundPosition ='-10' + 'px ' +'-10' + 'px';
			// _this.repeatAnimation.index = 6
			_this.repeatAnimation.jump(6)
			// _this.repeatAnimation.enterFrame()
			// _this._next()
		}
	})
	.wait(12000)
	.changePosition(ele, ['-306px -10px'], images[0]) // 困了
	.wait(5000)
	.changePosition(ele, ['-10px -306px'], images[0]) // 擦眼睛
	.wait(3000)
	.changePosition(ele, ['-306px -158px'], images[0])
	.wait(5000)
	// .changePosition(ele, ['-306 -158'], images[5])
	// .wait(2000)
	// .wait(6000)
	// .changePosition(ele, ['-10 -306'], images[5])
	// .wait(1000)
	// .changePosition(ele, ['-10 -10'], images[5])
	.then(function name(anim) {
		// console.log(1111111111);
		// console.log(_this.repeatAnimation.index , '_this.repeatAnimation.index ');
		// _this.repeatAnimation.index = _this.repeatAnimation.index - 2
		anim.pause()
	})

	this.repeatAnimation.start(interval);
}
Ayano.prototype.removeEventListener = function() {
	this.ele.onclick = null
	this.ele.onmouseover = null
	this.ele.onmouseout = null
}
$('body').height(2000)
var hasMobileUA = function () {
	var nav = window.navigator;
	var ua = nav.userAgent;
	var pa = /iPad|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g;

	return pa.test(ua);
}

var ayano = new Ayano({interval:58, el: 'rabbit6'})
var isMobile = function () {
	return window.screen.width < 767 && this.hasMobileUA();
}
if (!isMobile()) {
	// 利用 data-scroll 属性，滚动到任意 dom 元素
	$.scrollto = function (scrolldom, scrolltime) {
		$(scrolldom).click(function () {
			// 回到顶部
			$(this).addClass("active").siblings().removeClass("active");
			$('html, body').animate({
				scrollTop: $('body').offset().top
			}, scrolltime);
			return false;
		});
	};
	// 判断位置控制 返回顶部的显隐
	var backTo = $(".back-to-top");
	var backHeight = $(window).height() - 980 + 'px';

	$(window).scroll(function () {
		if ($(window).scrollTop() > 700) {
			ayano.startDowm()
			console.log('startDowm');
		} else if ($(window).scrollTop() <= 700) {
			ayano.startUp()
		}
	});

	// 启用
	// $.scrollto("#rabbit6", 800);
}