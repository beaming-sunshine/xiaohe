// pages/home/message.js
var time = null;
Page({
  /**
  * 页面的初始数据
  */
  data: {
  },
  onLoad() {
  },
  //定时器拍照
  setTime: function () {
    　　let that = this
    　　let ctx = wx.createCameraContext()
    　　time = setInterval(function () {
      　　　　if (Math.round(Math.random()) == 1) {
        　　　　　　console.log('拍照')
        　　　　　　//拍照
        　　　　　　ctx.takePhoto({
          　　　　　　　　quality: 'high',
          　　　　　　　　success: (res) => {
            　　　　　　　　　　console.log(res.tempImagePath)
            　　　　　　　　　　that.setData({
              　　　　　　　　　　　　src: res.tempImagePath
            　　　　　　　　　　})
            　　　　　　　　　　that.localhostimgesupdata(res.tempImagePath)
          　　　　　　　　}
        　　　　　　})
      　　　　}
    　　}, 1000 * 10) //循环间隔 单位ms
  },
  //图片上传
  localhostimgesupdata: function (imgPath) {
    　　console.log('图片上传')
    　　wx.uploadFile({
      　　　　url: '', //图片上传服务器真实的接口地址
　　　　filePath: imgPath,
      　　　　name: 'imgFile',
      　　　　success: function (res) {
        　　　　　　wx.showToast({
          　　　　　　　　title: '图片上传成功',
          　　　　　　　　icon: 'success',
          　　　　　　　　duration: 2000
        　　　　　　})
      　　　　}
　　})
},
stoptime: function() {
  　　console.log('定时停止')
  　　clearInterval(time)
},
bindstop: function() {
  　　console.log('非正常停止')
},
binderror: function() {
  　　console.log('用户拒绝授权')
},
/**
* 生命周期函数--监听页面显示
*/
onShow: function() {
  　　console.log('显示')
  　　//定时器
  　　this.setTime();
},
/**
* 生命周期函数--监听页面隐藏
*/
onHide: function() {
  　　console.log('隐藏')
  　　clearInterval(time)
},
/**
* 生命周期函数--监听页面卸载
*/
onUnload: function() {
  　　console.log('卸载')
  　　clearInterval(time)
}
})