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
    ],
    inputValue:"",
    length:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindKeyInput:function(e){
    this.setData({
      inputValue:e.detail.value
    })
    console.log(this.inputValue)
  },
  onLoad: function (options) {
  },
  bindFormSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为： ',e.detail.value)
    const db = wx.cloud.database()
    var time = util.formatTime(new Date());
    this.setData({
      time: time
    });
    if(app.globalData.flag == 1){
      // 再通过setData更改Page()里面的data，动态更新页面的数据
      wx.showToast({
        title: '提交成功！',
      })
    }
    else{
      const history=db.collection('History')
      history.add({
        data: {
          message: this.data.inputValue,
          time: this.data.time
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        }
      })
//-----------------------------------------------------------------------------------------------------------
      const chatroom=db.collection('Chatroom');
      chatroom.add({
        data: {
          message: this.data.inputValue,
          time: this.data.time
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
          app.globalData.flag = 1
        }
      })
      
    }
    
  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为： ', e.detail)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getJsonLength :function(jsonData){
    var jsonLength = 0;
    for(var item in jsonData){
                     jsonLength++;
                    }
    return jsonLength;
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
    app.globalData.flag = 0
    const db = wx.cloud.database()
    db.collection('Chatroom').get().then(res => {
      this.setData({
        wlist: res.data,
      })
        wx.showToast({
          title: '加载成功！',
        })
      console.log(res.data)
      if(res.data.length==20){
        db.collection('Chatroom').doc(res.data[0]._id).remove({
          success: function (res) {
            console.log(res.data)
          }
        })
      }
      return res
    })
      .catch(err => {
        console.error('[数据库] [查询记录] 失败：', err)
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
  reFresh: function(){
  
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