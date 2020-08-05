const app = getApp()
Page({
  data: {
    title: "",
    content: "",
    user: "",
    namecansee: "1",
    picUrl: "",
    focus: false,
    isCheck: false,
    productSrc: [],
    isShow: false,
    userInfo: {},
    hasUserinfo:false,
    isRefresh: false,
    uploadimgs: [], //上传图片列表
    editable: false //是否可编辑
  },
  titleEventFunc: function (e) {
    if (e.detail && e.detail.value) {
      this.data.title = e.detail.value;
    }
  },
  contentEventFunc: function (e) {
    if (e.detail && e.detail.value) {
      this.data.content = e.detail.value;
    }
  },
  isNameEventFunc: function (e) {
    if (this.data.namecansee=="1"){
      this.data.namecansee = "0";
    }else{
      this.data.namecansee = "1";
    }
  },
  send: function (e) {
    wx.request({
      url: 'https://www.beamingsunshine.cn/HHUC/love.do',
      data: {
        title: this.data.title,
        content: this.data.content,
        user: this.data.userInfo.nickName,
        namecansee: this.data.namecansee,
        picUrl: this.data.userInfo.avatarUrl
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
  //上传图片
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
    //console.log(e.currentTarget.dataset.index);
    const imgs = this.data.uploadimgs
    Array.prototype.remove = function (i) {
      const l = this.length;
      //console.log(l)
      if (l == 1) {
        return []
      } else if (l > 1) {
        return [].concat(this.splice(0, i), this.splice(1, l))
      }
    }
    this.setData({
      uploadimgs: imgs.remove(e.currentTarget.dataset.index)
    })
  },
  onGotUserInfo(e) {
    this.setData({
      userInfo:e.detail.userInfo,
      hasUserinfo: true,
    })
  },
  onLoad: function (options) {
  }, 
})
