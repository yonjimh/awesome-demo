'use strict';

var animation = window.animation;

var $rabbit1 = $('rabbit1');
var $rabbit2 = $('rabbit2');
var $rabbit3 = $('rabbit3');
var $rabbit4 = $('rabbit4');
var $rabbit5 = $('rabbit5');
var $rabbit6 = $('rabbit6');

var images = ['rabbit-big.png', 'rabbit-lose.png', 'rabbit-win.png', 'css_sprites.png'];

var rightRunningMap = ["0 -854", "-174 -852", "-349 -852", "-524 -852", "-698 -851", "-873 -848"];
var leftRunningMap = ["0 -373", "-175 -376", "-350 -377", "-524 -377", "-699 -377", "-873 -379"];
var rabbitWinMap = ["0 0", "-198 0", "-401 0", "-609 0", "-816 0", "0 -96", "-208 -97", "-415 -97", "-623 -97", "-831 -97", "0 -203", "-207 -203", "-415 -203", "-623 -203", "-831 -203", "0 -307", "-206 -307", "-414 -307", "-623 -307"];
var rabbitLoseMap = ["0 0", "-163 0", "-327 0", "-491 0", "-655 0", "-819 0", "0 -135", "-166 -135", "-333 -135", "-500 -135", "-668 -135", "-835 -135", "0 -262"];
var runMap = ['-10 -10', '-158 -10', '-10 -158']
var downMap = ['-158 -158', '-158 -158', '-158 -158', '-158 -158', '-158 -158', '-158 -158', '-158 -158', '-158 -158', '-158 -158']
var upMap = ['-306 -10','-10 -10']
repeat();
win();
lose();
setTimeout(()=>{
run();

},3000)
run();

// var easing = BezierEasing(1.00, 0.05, 0.00, 0.78)
var easing =  BezierEasing(0.42, 0, 0.58, 1)
!function repeat2() {
	var interval = 30;
	var speed = 30;  // 速度 

	var initLeft = 0;
	var finalLeft = 380;
	var frame = 0;
	var frameLength = 7;
	var index = 0
	var repeatAnimation = animation().changePosition($rabbit6, downMap, images[3])
	.enterFrame(function (success, time) {
		// time 动画开始到现在的时间
		var p = (time/finalLeft);
		console.log(time / finalLeft);
		// console.log(finalLeft / time, 'finalLeft/time finalLeft/time');
		// console.log(time, 'time');
		// console.log(easing(p), 'easing(p)');
		
		var ratio = (time) / interval;  // 这个比值是指  动画开始到现在的时间/间隔 得到运行了多少次 之后再speed * ratio得到距离值
		var top; 
		// console.log(Math.max(finalLeft + speed * ratio, finalLeft));
		top = Math.min((initLeft + speed * ratio) * easing(p), finalLeft);
		$rabbit6.style.top = top + 'px';
		// console.log(success)
		// success()
		if(top === finalLeft) {
			success()
		}
	}).changePosition($rabbit6, [upMap[0]], images[3]).wait(200).changePosition($rabbit6, [upMap[1]], images[3])

	repeatAnimation.start(30);

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
}()
function repeat() {
	var repeatAnimation = animation().changePosition($rabbit1, rightRunningMap, images[0]).repeatForever();
	repeatAnimation.start(260);

	var running = true;
	$rabbit1.addEventListener('click', function () {
		if (running) {
			running = false;
			repeatAnimation.pause();
		} else {
			running = true;
			repeatAnimation.restart();
		}
	});

}

!function repeat1() {
	var repeatAnimation = animation().changePosition($rabbit5, runMap, images[3]).repeatForever();
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
}()
function run() {
	var interval = 1000;
	var speed = 6;
	var initLeft = 100;
	var finalLeft = 400;
	var frame = 4;
	var frameLength = 6;
	var right = true;
	var index = 0
	var runAnimation = animation().enterFrame(function (success, time) {
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
	runAnimation.start(1000);
}

function win() {
	var winAnimation = animation().changePosition($rabbit3, rabbitWinMap, images[2]).repeat(3).then(function () {
		console.log('win animation repeat 3 times and finished');
		winAnimation.dispose();
	});
	winAnimation.start(200);
}

function lose() {
	var loseAnimation = animation().changePosition($rabbit4, rabbitLoseMap, images[1]).then(function () {
		console.log('lose animation finished');
		loseAnimation.dispose();
	});
	loseAnimation.start(200);
}

function $(id) {
	return document.getElementById(id);
}