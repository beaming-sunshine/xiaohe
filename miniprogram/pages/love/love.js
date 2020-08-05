// pages/love/love.js
Page({

  data: {
    lovewall: [],
  },


  onLoad: function (options) {
    this.fetchlovewall();
  },

  fetchlovewall: function () {  //获取考试列表
    var that = this
    wx.request({
      url: 'https://www.beamingsunshine.cn/HHUC/showlove.do',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        var jsonLength = 0;
        for (var item in res.data) {
          var key = "条数" + jsonLength
          var year = res.data[key].date.year - 100
          var month = res.data[key].date.month + 1
          var date = res.data[key].date.date
          var time = res.data[key].date.hours + ":" + res.data[key].date.minutes + ":" + res.data[key].date.seconds
          var nowdate = "20" + year + "-" + month + "-" + date + " " + time
          var newArray = [{ title: res.data[key].title, content: res.data[key].content, picUrl: res.data[key].picUrl, user: res.data[key].user, date: nowdate, nameCansee: res.data[key].nameCansee, canshow: res.data[key].canshow }];
          that.setData({
            lovewall: that.data.lovewall.concat(newArray)
          })
          jsonLength++;
        }
      }
    })
  },
  foldQuestion: function (e) { //展开收起问题
    const eindex = e.currentTarget.dataset.qindex;
    const oldqindex = this.data.showquestionindex;
    this.setData({
      showquestionindex: eindex === oldqindex ? null : eindex
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})