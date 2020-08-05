// pages/home/question.js
Page({

  data: {
    user:"",
    phone:"",
    question:"",
    picUrl:"",
    uploadimgs: [], //上传图片列表
    editable: false //是否可编辑
  },
  bindchange1:function(res){
    this.setData({
      question: res.detail.value,
    })
  },
  bindchange2: function (res) {
    this.setData({
      user: res.detail.value,
    })
  },
  bindchange3: function (res) {
    this.setData({
      phone: res.detail.value,
    })
  },
  chooseImage: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#000000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        _this.setData({
          uploadimgs: _this.data.uploadimgs.concat(res.tempFilePaths)
        })
      }
    })
  },
  editImage: function () {
    this.setData({
      editable: !this.data.editable
    })
  },
  deleteImg: function (e) {
    const imgs = this.data.uploadimgs
    Array.prototype.remove = function(i){
      const l = this.length;
      if(l==1){
        return []
      }else if(l>1){
        return [].concat(this.splice(0,i),this.splice(1,l))
      }
     }
    this.setData({
      uploadimgs: imgs.remove(e.currentTarget.dataset.index)
    })
  },
  send:function(e){
    wx.request({
      url: 'https://www.beamingsunshine.cn/HHUC/question.do',
      data: {
        user: this.data.user,
        phone:this.data.phone,
        picUrl:this.data.picUrl,
        question:this.data.question
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.msg)
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    });
  },
  onLoad: function (options) {

  }

})