// Pages/timetable/timetable.js

var app = getApp();
var pages=getCurrentPages();
var currPage=pages[pages.length-1];
var prevPage=pages[pages.length-2];
Page({
  data: {

    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [
     /* { "xqj": 1, "skjc": 1, "skcd": 2, "kcmc": "高等数学@教A-301" },
      { "xqj": 1, "skjc": 5, "skcd": 3, "kcmc": "高等数学@教A-301" },
      { "xqj": 2, "skjc": 1, "skcd": 2, "kcmc": "高等数学@教A-301" },
      { "xqj": 2, "skjc": 8, "skcd": 2, "kcmc": "高等数学@教A-301" },*/
    ]
  },
  onLoad: function (options) {
    var week=options.week;
    console.log(week);
    if (app.globalData.openid) {
      this.setData({ openid: app.globalData.openid }),
        console.log(this.openid)
    }
    week++;
    console.log(week)

    const db = wx.cloud.database()
    db.collection('Class').where(
      {
        'week': week
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

  }
})