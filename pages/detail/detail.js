// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //指数详情数据
    detailData:[],
    //新闻数据
    news:[],
    //加载新闻数量
    count:15
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 将前一个页面传入过来的数据进行接收
    this.setData({
      detailData:options
    });
    //console.log(this.data.detailData);
  },
  //点击新闻标题进入新闻详情页
  GoNewsDetail:function (e) {
    let newsLink = e.currentTarget.dataset.newslink;
    console.log(newsLink);
    wx.navigateTo({
      url: 'newsDetail/newsDetail?link='+newsLink,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that =this;
    wx.request({
      url: 'https://api.apiopen.top/getWangYiNews',
      data:{
        count:that.data.count
      },
      success(res){
        console.log(res.data.result);
        that.setData({
          news:res.data.result
        });
      }
    })
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
    //上拉加载更多新闻数据
    this.data.count+=20;
   
    var that = this;
    //显示加载组件
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.apiopen.top/getWangYiNews',
      data:{
        count:that.data.count
      },
      success(res){
        console.log(res.data.result);
        that.setData({
          news:res.data.result
        });
        //隐藏加载组件
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})