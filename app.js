App({
  onLaunch(opts) {
    console.log('App Launch', opts)
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'test-39ebd4',
        traceUser: true,
      })
    }
  },
  globalData: {
   // wlist: [
   //   { 'xqj': 1, 'skjc': 1, 'skcd': 2, 'kcmc': '159' }],
   // openid: null
   flag:0,
   thatid:""
  },
  getUserOpenId(callback) {
    const self = this
    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    }
  }

})


