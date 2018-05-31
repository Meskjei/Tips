// upload/upload.js
//PYTBZ-W6MRF-MSCJS-JUYGZ-ZLD6S-36BKY
let QQMapWX = require('../libs/qqmap-wx-jssdk.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerIndex: 0,
    typeArr:["饮食","娱乐","生活","出行"],
    position: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let qqmapsdk = new QQMapWX({
      key: 'PYTBZ-W6MRF-MSCJS-JUYGZ-ZLD6S-36BKY' // 必填
    });
    wx.showLoading({
      title: '正在加载',
    });
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res);
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(addressRes){
            wx.hideLoading();
            console.log(addressRes);
            let position = {
              longitude: res.longitude,
              latitude: res.latitude,
              name: addressRes.result.formatted_addresses.recommend,
              address: addressRes.result.address
            };
            that.setData({ position: position });
          }
        });
        
      },
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
  
  },
  bindPickerChange: function(e){
    console.log(e);
  },
  formSubmit: function(e){
    let that = this;
    let tableID = '37869';
    let index = e.detail.value["picker"];
    
    let latitude = that.data.position.latitude;
    let longitude = that.data.position.longitude;
    let point = new wx.BaaS.GeoPoint(longitude, latitude);
    let tip = {
      tipType: that.data.typeArr[index],
      content: e.detail.value["input"],
      longitude: longitude,
      latitude: latitude,
      position: point,
      isVerified: false,
      participantID: [],
      locationName: this.data.position.name,
      locationAddress: this.data.position.address
    }
    console.log(tip)
    let tipTableObject = new wx.BaaS.TableObject(tableID);
    let tipTable = tipTableObject.create();
    wx.showLoading({
      title: '正在提交',
    })
    tipTable.set(tip).save().then(function (res) {
      wx.showToast({
        title: '提交成功',
        image: '../image/success.png'
      });
    }, function (err) {
      console.log(err);
    })
      
    
  },
  formReset: function(){
    console.log('form表单重置');
  },
  bindChooseLocation: function(e){
    let that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        wx.showToast({
          title: '地点选择成功',
          image: '../image/success.png'
        });
        let longitude = res.longitude;
        let latitude = res.latitude;
        let position = {
          longitude: longitude,
          latitude: latitude,
          name: res.name,
          address: res.address
        }
        that.setData({ position: position });
      },
      fail: function(err){
        console.log(err);
      }
    })
  }
})