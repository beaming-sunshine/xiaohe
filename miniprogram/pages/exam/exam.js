// pages/exam/exam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exams:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchExams();
  },

  fetchExams: function () {  //获取考试列表
    const newexams = [];
    let i = 0; 
    newexams.push({
      "id": i + 1,
      "q": "大学英语（Ⅱ） 1月14日" ,
      "a": "授课班号:6400769  年级:2018\n" + "8:30-10:30：企业管理学院\n" + "M301  梁敏 潘江波\n" + "M302  杨永东 石常峰\n" + "M303  王蓓 訾永成\n" + "M401  邢亮 王敏\n" + "M402  恽如强 吴敏\n" + "M403  江静 王幸\n"
    });
    newexams.push({
      "id": i + 1,
      "q": "通信原理  1月15日",
      "a": "授课班号:6232188  年级:2016\n" + "8:30-10:30：物联网院"
    });
    newexams.push({
      "id": i + 1,
      "q": "微机原理与接口  1月15日",
      "a": "授课班号:6252163  年级:2016\n" + "8:30-10:30：物联网院"
    });
    newexams.push({
      "id": i + 1,
      "q": "数据库原理  1月15日",
      "a": "授课班号:6252163  年级:2016\n" + "8:30-10:30：物联网院"
    });
    newexams.push({
      "id": i + 1,
      "q": "宏观经济学  1月15日",
      "a": "授课班号:6400769  年级:2018\n" + "8:30-10:30：企业管理学院"
    });
    newexams.push({
      "id": i + 1,
      "q": "高等数学A1  1月16日",
      "a": "授课班号:6600198  年级:2018\n" + "8:30-10:30：全校区"
    })
    this.setData({
      exams: newexams,
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