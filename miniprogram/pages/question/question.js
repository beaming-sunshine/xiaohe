// pages/question/question.js
Page({
  data: {
    question: [],
  },


  onLoad: function (options) {
    this.fetchquestion();
  },

  fetchquestion: function () {  //获取考试列表
    var that = this
    wx.request({
      url: 'https://www.beamingsunshine.cn/HHUC/showquestion.do',
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
          var newArray = [{ question: res.data[key].question, picUrl: res.data[key].picUrl, user: res.data[key].user, date: nowdate, phone: res.data[key].phone }];
          that.setData({
            question: that.data.question.concat(newArray)
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