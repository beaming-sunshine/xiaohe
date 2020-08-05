
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexmenu: [
      {
        'icon': './../../images/icon/note.png',
        'text': '随性笔记',
        'url': 'notes'
      },
      {
        'icon': './../../images/icon/exams.png',
        'text': '考试倒计时',
        'url': 'exam'
      },
      {
        'icon': './../../images/icon/exam.png',
        'text': '成绩查询',
        'url': 'english'
      },
      {
        'icon': './../../images/icon/more.png',
        'text': '敬请期待',
      },
    ],
    bignews:[
      {
        'head': "xx大学2019年新年致辞",
        'time': "2019-01-01"
      },
      {
        'head': "校区召开关心下一代工作委员会会议",
        'time': "2019-01-20"
      },
      {
        'head': "校区举办教职工迎新春活动",
        'time': "2019-01-20"
      },
      {
        'head': "校区在第十五届运动会高校部比赛中获佳绩",
        'time': "2019-01-15"
      },
      {
        'head': "	校区举行党委中心组集体学习",
        'time': "2019-01-11"
      }
    ]
  },


  /**
   * 事件处理函数
   */

  // touchstart事件
  tap_start: function (e) { 
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },

  // touchmove事件
  tap_drag: function (e) {
    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].pageX;
    if (this.data.mark < this.data.newmark) {
      this.istoright = true;
    }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if (this.data.mark > this.data.newmark) {
      this.istoright = false;
    }
    this.data.mark = this.data.newmark;
  },

  // touchend事件
  tap_end: function (e) { 
    this.data.mark = 0;
    this.data.newmark = 0;
    if (this.istoright) {
      this.setData({
        open: true
      });
    } else {
      this.setData({
        open: false
      });
    }
  },
  tap_ch: function (e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    
  },
goMessage: function () {
  wx.navigateTo({
    url: 'message'
  })
}
})