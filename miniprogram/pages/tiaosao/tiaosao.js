// pages/tiaosao/tiaosao.js
Page({

  data: {
    tiaosao: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchtiaosao();
  },

  fetchtiaosao: function () {  //获取考试列表
    var that = this
    wx.request({
      url: 'https://www.beamingsunshine.cn/HHUC/showshopping.do',
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
          var newArray = [{ title: res.data[key].title, content: res.data[key].content, picUrl: res.data[key].picUrl, user: res.data[key].name, date: nowdate, canshow: res.data[key].canshow}];
          that.setData({
            tiaosao: that.data.tiaosao.concat(newArray)
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


})