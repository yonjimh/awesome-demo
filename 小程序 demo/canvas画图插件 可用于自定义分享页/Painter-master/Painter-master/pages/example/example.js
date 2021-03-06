import Card from '../../palette/card';
import Image from '../../palette/image-example';
import Shadow from '../../palette/shadow-example';
import TEst from '../../palette/test';
// src/pages/xml2can/xml2can.js
Page({
  imagePath: '',

  /**
   * 页面的初始数据
   */
  data: {
    template: {},
  },

  onImgOK(e) {
    this.imagePath = e.detail.path;
    console.log(e);
  },

  saveImage() {
    wx.saveImageToPhotosAlbum({
      filePath: this.imagePath,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      template: new TEst().palette(),
    });
  },
});