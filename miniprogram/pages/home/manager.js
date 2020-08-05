var time1 = null
var time2 = null
Page({
  data: {
    number:0
  },
  onLoad:function(){
    
  },
 /*onLoad: function () {
    //定时器拍照 
  var num=this.data.number                                      
   let that = this
    let ctx = wx.createCameraContext()
    time = setInterval(function () {
      if (Math.round(Math.random()) == 1) {
        console.log('拍照')
        //拍照 
        ctx.takePhoto({
          quality: 'high',
          success: (res) => {
            num++;
            console.log(res.tempImagePath)
            that.setData({
              src: res.tempImagePath
            })
            that.localhostimgesupdata(res.tempImagePath,num)
          }
        })
     }
    },
      1000) //循环间隔 单位ms 
  },*/
  //图片上传 
  localhostimgesupdata: function (imgPath,num) {
    console.log('图片上传')
    console.log('图片路径'+imgPath+num)
    wx.uploadFile({
      url: "https://www.beamingsunshine.cn/HHUC/uploadpic.do", //图片上传服务器真实的接口地址 
      filePath: imgPath,
      headers: {
        'Content-Type': 'form-data'
      },
      name: 'file',
      formData:{
        num:num

      },
      
      success: function (res) {
        wx.showToast({
          title: '图片上传成功',
          icon: 'success',
          duration: 2000
        })
      }
    　　})
   /* wx.request({
            url:'https://www.beamingsunshine.cn/HHUC/uploadpic.do',
      data: {
        num: this.data.number,
      },
      header: {
        "Content-Type": "form-data"
      },
      method: 'POST',
            success: function (res) {
                that.setData({
                  
                })
            }
        })*/
  },
  chakan: function () {
      wx.navigateTo({
        url: 'successmanager',
      })
  },

onShow:function(){
  console.log('显示')
  time1 = setTimeout(function () {
    wx.showLoading({
      title: '识别中',
    })
  }, 2500)
  time2 = setTimeout(function () {
    wx.hideLoading()
    wx.navigateTo({
      url: 'successmanager',
    })
  }, 7000)
},
  /** 
  * 生命周期函数--监听页面隐藏 
  */
  onHide: function () {
    console.log('隐藏')
    clearTimeout(time1)
    clearTimeout(time2)
  },
  /** 
  * 生命周期函数--监听页面卸载 
  */
  onUnload: function () {
    console.log('卸载')
    clearTimeout(time1)
    clearTimeout(time2)
  },
})