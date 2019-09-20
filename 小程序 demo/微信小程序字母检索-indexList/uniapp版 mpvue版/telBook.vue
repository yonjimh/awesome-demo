<template>
  <view class="container">
    <scroll-view scroll-y="true"
                 :style="{height: windowHeight + 'px'}"
                 :scroll-into-view="toView"
                 :scroll-top="scrollTop">
      <block v-for="(item, index) in arrId"
             :key="item">
        <view class="search-english"
              :id="item">
          <!-- A B C -->
          {{item}}
        </view>
        <view class="search-car">
          <view class="info">
            <view class="name">啊玉</view>
            <view class="phone">18819442025</view>
          </view>
          <!-- 删除 编辑 -->
          <view class="uni-swipe-action__btn-group"
                :id="elId">
            <div v-for="(itm,idx) in options"
                 :key="idx"
                 class="uni-swipe-action--btn"
                 :style="{backgroundColor: itm.style && itm.style.backgroundColor ? itm.style.backgroundColor : '#C7C6CD',color: itm.style && itm.style.color ? itm.style.color : '#FFFFFF',fontSize: itm.style && itm.style.fontSize ? itm.style.fontSize : '28upx'}">
              <image :src="itm.src"
                     class="uni-swiper-image"></image>
            </div>
          </view>
        </view>
      </block>
    </scroll-view>
    <view class="index-english"
          :style="{top:indexTop + 'px'}">
      <view v-for="i in arrId"
            :id="i"
            :key="i"
            @touchstart.stop="touchstart"
            @touchmove.stop="touchmove"
            @touchend.stop="touchend">{{i}}</view>
    </view>
    <view class="index-name"
          v-if="indexShow">{{indexEnglish}}</view>
  </view>
</template>
<script>
import api from "../../requestList.js";
var indexArr = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];
var y = 0;
//获取touchstart字母数组角标
function getArrIndex(english) {
  // console.log(Page)
  for (var x = 0; x < indexArr.length; x++) {
    if (english == indexArr[x]) {
      return x;
    }
  }
}
//num 移动了多少位 index 当前字母,返回当前触摸位置节点的字母
function getArrEnglish(num, index) {
  var english = indexArr[index + num];
  if (!(1 > num + index > 26)) {
    return english;
  } else {
    return AAA;
  }
}
export default {
  data() {
    return {
      rightShow: false,
      dropShow: false,
      indexShow: false,
      toView: "e",
      scrollTop: 1000,
      indexId: "",
      indexy: "",
      indexEnglish: "",
      arrId: indexArr,
      userInfo: "这是一条数据",
      indexTop: "",
      windowHeight: "",
      options: [
        {
          text: "编辑",
          src: "../../static/index/dzwl_icon_edit.png",
          style: {
            backgroundColor: " #74CB73"
          }
        },
        {
          text: "删除",
          src: "../../static/index/dzwl_icon_del.png",
          style: {
            backgroundColor: "#E93800"
          }
        }
      ]
    };
  },
  methods: {
    touchstart: function(e) {
      // this.setData({
      //   indexId: e.target.id,
      //   // toView:e.target.id.toLowerCase(),
      //   toView: e.target.id,
      //   indexy: e.touches[0].pageY,
      //   indexShow: true,
      //   indexEnglish: e.target.id
      // });
      console.log(JSON.stringify(e));

      this.indexId = e.target.id;
      this.toView = e.target.id;
      this.indexy = e.touches[0].pageY;
      this.indexShow = true;
      this.indexEnglish = e.target.id;
    },
    touchmove: function(e) {
      console.log(JSON.stringify(e));

      y = getArrIndex(e.target.id);
      var indexY = e.touches[0].pageY;
      if (getArrEnglish(Math.round((indexY - this.indexy) / 15), y)) {
        // toView:getArrEnglish(Math.round((indexY-this.data.indexy)/15),y).toLowerCase(),
        this.toView = getArrEnglish(Math.round((indexY - this.indexy) / 15), y);
        this.indexEnglish = getArrEnglish(
          Math.round((indexY - this.indexy) / 15),
          y
        );
      }
    },
    touchend: function(e) {
      this.indexShow = false;
    }
  },
  onLoad: function(options) {
    var that = this;
    uni.getSystemInfo({
      success: function(res) {
        console.log(JSON.stringify(res));

        that.windowHeight = res.windowHeight;
        that.indexTop = res.windowHeight / 2 - 200;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
}
.search-car {
  background-color: #ffffff;

  color: #333333;
  font-size: 26rpx;
  .info {
    height: 100upx;
    line-height: 100upx;
    display: flex;
    border-bottom: 2upx solid #eeeeee;
    justify-content: space-between;
    margin: 0 37upx 0 30upx;
    .name {
    }
    .phone {
    }
  }
}
.search-english {
  height: 60upx;
  background-color: #eff3f4;
  line-height: 60upx;
  padding-left: 20upx;
  font-size: 28upx;
  color: #333333;
}
scroll-view {
  z-index: 20;
}
image {
  height: 75upx;
  width: 75upx;
  display: inline-block;
  vertical-align: middle;
}
.index-english {
  position: absolute;
  width: 30upx;
  height: auto;
  right: 0;
  font-size: 10px;
}
.index-english view {
  height: 15px;
}
.index-name {
  text-align: center;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  // color: #000000;
  width: 100px;
  height: 100px;
  font-size: 48px;
  // background-color: rgba(0, 0, 0, 0.4);
  line-height: 100px;
  background-color: #666;
  color: #fff;
  border-radius: 10px;
}

// uni-swipe-action
.uni-swipe-action {
  width: 100%;
  overflow: hidden;
  height: 200upx;
  position: relative;
}

.uni-swipe-action__container {
  position: relative;
  left: 0;
  background-color: #fff;
  width: 100%;
  height: 200upx;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: flex-start; */
  transition: all 350ms cubic-bezier(0.165, 0.84, 0.44, 1);
}

.uni-swipe-action__content {
  width: 50%;
}

.uni-swipe-action__btn-group {
  display: flex;
  flex-direction: row;
  position: absolute;
  right: -27%;
  top: 0px;
  z-index: 15;
  height: 200upx;
}

.uni-swipe-action--show {
  position: relative;
  z-index: 10;
}

.uni-swipe-action--btn {
  min-width: 90upx;
  // padding: 0 32upx;
  color: #fff;
  background-color: #c7c6cd;
  font-size: 28upx;
  display: inline-flex;
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.uni-swipe-action__mask {
  display: block;
  opacity: 0;
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.uni-swiper-image {
  width: 37upx;
  height: 37upx;
}
</style>


