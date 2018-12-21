// start.js



Page({



  /**

   * 页面的初始数据

   */


  getDataFromOneNet: function () {

    //从oneNET请求我们的Wi-Fi气象站的数据

    const requestTask = wx.request({

      url: 'https://api.heclouds.com/devices/503147273/datapoints?datastream_id=Light,Temperature,Humidity&limit=15',

      header: {

        'content-type': 'application/json',

        'api-key': 'iDmPFvwtVXFitJGaJT8Ucv3M9fI='

      },

      success: function (res) {

        //console.log(res.data)

        //拿到数据后保存到全局数据

        var app = getApp()

        app.globalData.temperature = res.data.data.datastreams[0]

        app.globalData.light = res.data.data.datastreams[1]

        app.globalData.humidity = res.data.data.datastreams[2]

        console.log(app.globalData.light)
        console.log(app.globalData.temperature)

        //跳转到天气页面，根据拿到的数据绘图

        wx.navigateTo({

          url: '../wifi_station/tianqi/tianqi',

        })
//temperature
       //var lengths = app.globalData.light.datapoints.length
        var temp = app.globalData.temperature.datapoints[0].value
        var ligh = app.globalData.light.datapoints[0].value
        var stand1 = 30
        var stand2 = 350
        if ((temp > stand1)&&(ligh > stand2))
        {
          wx.showModal({
            title: '警报',
            content: '火灾和小偷都来了！',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log('用户点击取消')
              }

            }
          })
        }
      //},
      /*调用截至*/
      
        else if ((temp > stand1) && (ligh < stand2)) {
          wx.showModal({
            title: '警报',
            content: '火灾来啦！',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log('用户点击取消')
              }

            }
          })
        }
        else if ((temp < stand1) && (ligh > stand2)) {
          wx.showModal({
            title: '警报',
            content: '小偷来啦！',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log('用户点击取消')
              }

            }
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '一切正常！',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log('用户点击取消')
              }

            }
          })
        }
  },
  change: function (e) {

    /*当有输入时激活发送按钮，无输入则禁用按钮*/

    if (e.detail.value != "") {

      this.setData({

        threshold: e.detail.value,

        opacity: 1,

        disabled: false,

      })

    } else {

      this.setData({

        threshold: 0,

        opacity: 0.4,

        disabled: true,

      })

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



  }
    })
  }
})