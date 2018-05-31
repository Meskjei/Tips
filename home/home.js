// home/home.js
var amapFile = require('../libs/amap-wx.js');
var markersData = [];
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipData: [],
    currentTab: 0 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current,
    })
  },
  showDetail: function(e){
    console.log(e.currentTarget.dataset.tip);
    app.globalData.currentTip = e.currentTarget.dataset.tip;
    wx.navigateTo({
      url: '../detail/detail'
    });
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
    var that = this;
    let tableID = app.globalData.tableID.tips;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let longitude = res.longitude;
        let latitude = res.latitude;
        let currentPoint = new wx.BaaS.GeoPoint(longitude, latitude);
        let tip = new wx.BaaS.TableObject(tableID);
        let query = new wx.BaaS.Query();
        query.withinCircle('position', currentPoint, 2);
        tip.setQuery(query).find().then(function (res) {
          console.log(res.data);
          that.setData({ tipData: res.data.objects });
        }, function (err) {
          console.log(err);
          wx.showToast({
            title: '网络故障',
            image: '../image/netError.png'
          });
        })
      }
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
  userInfoHandler(data) {
    console.log(data)
    wx.BaaS.handleUserInfo(data).then(res => {
      console.log(res);  
    }, res => {
      console.log(res);
    })
  }
})