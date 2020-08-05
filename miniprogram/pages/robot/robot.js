const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()
Page({
  data: {
    msg:" ",
    msgimg:" ",
    resp:" ",
    respimg:" ",
    session:"",
    scrollTop:100000,
    option: "您要问的是以下哪个问题？",
    res:"你好呀！我是HHUC的智能小盒，陪伴你在每分每秒 ♥\n小盒还可以回答你的任何疑问哦！",
    voicefilePath:" ",
    message: [],
    previewImgList: [],
    increase: false,   //图片添加区域隐藏
    aniStyle: true,    //动画效果
    send: false,    //发送按钮
    sound:false,    //语音输入模式
    playing:false   //语音播放形式
  },
  bindChange(res) {
    this.setData({
      msg: res.detail.value,
      send:true,
    })
  },
  setMsg:function(e){
    this.setData({
      msg: e.currentTarget.dataset.param
    })
    this.send()
  },
  //隐藏菜单栏的控制
  increase() {
    if(this.data.increase==true){
      this.setData({
        increase: false,
      })
    }else{
      this.setData({
        increase: true,
        aniStyle: true
      })
    }
  },
  changeMethod:function(){
    if (this.data.sound == true) {   
      this.setData({
        sound: false,
        msg: " ",
        send:false
      })
    } else {
      this.setData({
        sound:true,
        msg:" ",
      })
    }
  },

  send:function(e){
    var that = this
    var newArray = [{ msg: that.data.msg, msgimg: " ", msgvoi: " ", msgvdo: " ", resp: " ",options:" ", respimg: " ", respvoi: " ", respvdo: " " }];
    this.setData({
      message: that.data.message.concat(newArray),
      send: false
    })
    wx.request({
      url: 'https://www.beamingsunshine.cn/HHUC/msg.do',
      data:{
        msg: this.data.msg,
        session:this.data.session
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method:'POST',
      success: function (res) {  
        console.log(res.data)
        var length;  
        var num ; 
        var newArr = [];
        if(res.data.res!=undefined){
          if (res.data.option_questions != undefined) {
            for (length = 0; length < res.data.option_questions.length; length++) {
              num = length + 1
              newArr = newArr.concat([{ num: num, ques: res.data.option_questions[length] }])
            }
          }
          var newArray = [{ msg: " ", msgimg: " ", msgvoi: " ", msgvdo: " ", resp: res.data.res, options: newArr, respimg: " ", respvoi: " ", respvdo: " " }];
          if (res.data) {
            that.setData({
              increase: false,
              message: that.data.message.concat(newArray),
              session: res.data.session_id
            })
          }
        }
        if (res.data.pic != undefined) {
          var picarr = new Array(res.data.pic);
          var newArray = [{ msg: " ", msgimg: " ", msgvoi: " ", msgvdo: " ", resp: " ", options: " ", respimg: picarr, respvoi: " ", respvdo: " " }];
          that.setData({
            increase: false,
            message: that.data.message.concat(newArray),
            session: res.data.session_id
          })
        }
        if (res.data.audio != undefined){
          var newArray = [{ msg: " ", msgimg: " ", msgvoi: " ", msgvdo: " ", resp: " ", options: " ", respimg: " ", respvoi: res.data.audio, respvdo: " " }];
          that.setData({
            increase: false,
            message: that.data.message.concat(newArray),
            session: res.data.session_id
          })
        }
        that.bottom()
      }
    });
    var flag = this
    if (this.data.msg.trim() == "") {
      wx.showToast({
        title: '消息不能为空哦~',
        icon: "none",
        duration: 2000
      })
    }
    this.bottom()
  },
  chooseVideo() {
    const that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success(res) {
        var tempFilePath = res.tempFilePath
        var newArray = [{ msg: " ", msgimg: " ", msgvoi: " ", msgvdo: tempFilePath, resp: " ", options: " ", respimg: " ", respvoi: " ", respvdo: " " }];
        that.setData({
          increase: false,
          message: that.data.message.concat(newArray),
        })
      }
    })
  },
  chooseImage() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],   // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],    // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        var newArray = [{ msg: " ", msgimg: tempFilePaths, msgvoi: " ", msgvdo: " ", resp: " ", options: " ", respimg: " ", respvoi: " ", respvdo: " " }];
        that.setData({
          increase: false,
          message: that.data.message.concat(newArray),
        })
        console.log(tempFilePaths)
        that.bottom()
        wx.uploadFile({
          url: 'https://www.beamingsunshine.cn/HHUC/upload.do', //windows服务器HHUC
          filePath: tempFilePaths[0],
          name: 'file',
          headers: {
            'Content-Type': 'form-data'  
          },
          success: function (res) {
            var json = JSON.parse(res.data);   //转成json对象
            console.log(json.msg);
            var newArray = [{ msg: " ", msgimg:" ", msgvoi: " ", msgvdo: " ", resp: json.msg, options: " ", respimg: " ", respvoi: " ", respvdo: " " }];
            if (res.data) {
              that.setData({
                message: that.data.message.concat(newArray),
              })
              that.bottom()
            }
          }
        })
      }
    })
  },
  previewImg(e) {
    var that = this
    //必须给对应的wxml的image标签设置data-set=“图片路径”，否则接收不到
    var res = e.target.dataset.src;
    
    wx.previewImage({
      current: res, // 当前显示图片的http链接
      urls:  res,//this.data.previewImgList // 需要预览的图片http链接列表
    })
  },
  playvoice(e){
    this.setData({
      playing: true,
    })
    var that = this
    wx.playVoice({
      filePath: e.currentTarget.dataset.param,
      complete() {
        that.setData({
          playing: false
        })
      }
    })
  },
  playaudio(e) {
    console.log(e.currentTarget.dataset.param)
    innerAudioContext.src = e.currentTarget.dataset.param
    if(this.data.playing==false){
      this.setData({
        playing: true,
      })
      var that = this
      innerAudioContext.play()
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
      innerAudioContext.onEnded(() => {
        console.log("播放结束")
        that.setData({
          playing: false
        })
      })
    }else{
      this.setData({
        playing: false,
      })
      innerAudioContext.stop()
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
      innerAudioContext.onStop(() => {
        console.log("播放结束")
      })
    }
    
  },
  clearMsg(e){
    this.setData({
      message: []
    })
  },
  touchdown: function () {
    console.log("[Console log]:Touch down!Start recording!");
    // 开始录音
    var that = this
    wx.showLoading({
      title: '录音中...',
    })
    wx.startRecord({
      'success': function (res) {
        var tempFilePath = res.tempFilePath;
        var newArray = [{ msg: " ", msgimg: " ", msgvoi: tempFilePath, msgvdo: " ", resp: " ", options: " ", respimg: " ", respvoi: " ", respvdo: " " }];
        that.setData({
          message: that.data.message.concat(newArray),
        })
        that.bottom()
        //var newArray = [{ msg: " ", msgimg: " ", msgvoi: tempFilePath, resp: " ", respimg: " " }];
        console.log("[Console log]:Record success!File path:" + tempFilePath);
        if (tempFilePath == null) {
          console.log("[Console log]:File path do not exist!");
          wx.showModal({
            title: '录音文件不存在',
            content: '我也不知道哪错了，反正你就再试一次吧！',
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#09BB07',
          })
          return;
        }
        wx.showLoading({
          title: '语音识别中...',
        })
        // 语音识别
        var th = that
        wx.uploadFile({
          url: "https://www.beamingsunshine.cn/HHUC/upload.do",
          filePath: tempFilePath,
          name: 'file',
          headers: {
            'Content-Type': 'form-data'
          },
          success: function (res) {
            wx.hideLoading();
            var json = JSON.parse(res.data);   //转成json对象
            console.log(json);
            console.log(json.msg);
            var newArray = [{ msg: " ", msgimg: " ", msgvoi: " ", msgvdo: " ", resp: json.msg, options: " ", respimg: " ", respvoi: " ", respvdo: " " }];
            th.setData({
              message: that.data.message.concat(newArray),
            })
            that.bottom()
          },
          fail: function (res) {
          }
        });
      },
      'fail': function () {
        console.log("[Console log]:Record failed!");
        wx.showModal({
          title: '录音失败',
          content: '换根手指再试一次！',
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#09BB07',
        })
      },
    });
  },
  // 按钮松开
  touchup: function () {
    wx.stopRecord();
    console.log("[Console log]:Touch up!Stop recording!");
  },
  bottom: function () {
    var that = this
      var query = wx.createSelectorQuery()
      query.select('#flag').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        wx.pageScrollTo({
          scrollTop: that.data.scrollTop+res[0].bottom  // #the-id节点的下边界坐标  
        })
        res[1].scrollTop
      })
  },  
  outbtn() {
    this.setData({
      increase: false,
      aniStyle: true
    })
  },
  onLoad: function (options) {
  }, 
})