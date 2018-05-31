// my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isLoginIn: false,
    myTaskList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.BaaS.storage.get('userinfo');
    if (userInfo != '') {
      this.setData({
        userInfo: userInfo,
        isLoginIn: true
      });
    }
  },
  showMyTaskList: function (e) {
    let that = this;
    let app = getApp();
    let userTaskListTableId = app.globalData.tableID.userTaskList;
    let tableObject = new wx.BaaS.TableObject(userTaskListTableId);
    let query = new wx.BaaS.Query();
    let uid = that.data.userInfo.id;
    query.compare('created_by', '=', uid);
    tableObject.setQuery(query).find().then(res => {
      console.log(res);

      let objects = res.data.objects;
      // 请求objects数据库
      if (objects != null && objects.length > 0) {
        let tipsTableId = app.globalData.tableID.tips;
        let tipTableObject = new wx.BaaS.TableObject(tipsTableId);
        let tipQuery = new wx.BaaS.Query();
        tipQuery.in('id', objects[0].myTaskList);
        tipTableObject.setQuery(tipQuery).find().then(res => {
          that.setData({
            myTaskList: res.data.objects
          });
        }, e => {
          console.log(e);
          e;
        });
      }
    }, err => {
      console.log(err);
    });
  },
  userInfoHandler(data) {
    let that = this;
    wx.BaaS.handleUserInfo(data).then(res => {
      wx.showToast({
        title: '登录成功',
        image: '../image/success.png'
      });
      console.log(res)
      that.setData({
        isLoginIn: true,
        userInfo: res
      });
      that.showMyTaskList();
    }, res => {
      console.log(res);
      wx.showToast({
        title: '网络故障',
        image: '../image/netError.png'
      });
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
    this.showMyTaskList();
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