// Pages/morelesson/morelesson.js
var app = getApp();
var pages = getCurrentPages();
var currPage = pages[pages.length - 1];
var prevPage = pages[pages.length - 2];
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [
    ]
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
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
      }),
        console.log(this.openid)
    }
    const db = wx.cloud.database()
    db.collection('History').where({
      _openid: app.globalData.openid,
    }).get().then(res => {
      this.setData({
        wlist: res.data
      })
        wx.showToast({
          title: '加载成功！',
        })
      console.log(res.data)
      if (res.data.length == 20) {
        db.collection('History').doc(res.data[0]._id).remove({
          success: function (res) {
            console.log(res.data)
          }
        })
      }
        return res
      })

    
      
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
    this.onShow(),
      wx.stopPullDownRefresh()
  },
  reFresh: function () {

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