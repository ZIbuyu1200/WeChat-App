// Pages/morelesson/morelesson.js
var app = getApp();
var pages = getCurrentPages();
var currPage = pages[pages.length - 1];
var prevPage = pages[pages.length - 2];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    

      colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
      wlist: [
       // { "xqj": 1, "skjc": 1, "skcd": 2,'week': 1, "kcmc": "高等数学","skdd":"宿舍","teacher":"wwb" },
       /* { "xqj": 1, "skjc": 5, "skcd": 3, "kcmc": "高等数学@教A-301" },
        { "xqj": 2, "skjc": 1, "skcd": 2, "kcmc": "高等数学@教A-301" },
        { "xqj": 2, "skjc": 8, "skcd": 2, "kcmc": "高等数学@教A-301" },
        { "xqj": 3, "skjc": 4, "skcd": 1, "kcmc": "高等数学@教A-301" },
        { "xqj": 3, "skjc": 8, "skcd": 1, "kcmc": "高等数学@教A-301" },
        { "xqj": 3, "skjc": 5, "skcd": 2, "kcmc": "高等数学@教A-301" },
        { "xqj": 4, "skjc": 2, "skcd": 3, "kcmc": "高等数学@教A-301" },
        { "xqj": 4, "skjc": 8, "skcd": 2, "kcmc": "高等数学@教A-301" },
        { "xqj": 5, "skjc": 1, "skcd": 2, "kcmc": "高等数学@教A-301" },
        { "xqj": 6, "skjc": 3, "skcd": 2, "kcmc": "高等数学@教A-301" },

        { "xqj": 7, "skjc": 5, "skcd": 3, "kcmc": "高等数学@教A-301" },*/

      ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var xqj =  parseInt(options.xqj);
    var skjc = parseInt(options.skjc);
    var skcd=  parseInt(options.skcd);
    var week = parseInt(options.week);
    console.log(xqj,skjc,skcd)

    if (app.globalData.openid) {
      this.setData({ openid: app.globalData.openid }),
        console.log(this.openid)
    }

    const db = wx.cloud.database()
    db.collection('ClassTable').where(
      {
        'xqj':xqj,
        'skjc':skjc,
        'skcd':skcd,
         week:week
      }
    ).get().then(res => {
      this.setData({
        wlist: res.data
      })
      wx.showToast({
        title: '查询成功！',
      })
      return res
    })
      .catch(err => {
        console.error('[数据库] [查询记录] 失败：', err)
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