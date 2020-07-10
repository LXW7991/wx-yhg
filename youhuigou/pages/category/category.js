import { request } from "../../request/index";
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightContentList:[],
    currentIndex:0,
    scrollTop:0
  },
  cates:[],

  // 数据
   async getCates(){
    // request({url:"/categories"})
    // .then(result=>{
    //   this.cates = result.data.message;
    //   // 把接口的数据存储到本地
    //   wx.setStorageSync('cates', {time:Date.now(),data:this.cates});


    //   let leftMenuList = this.cates.map(v=>v.cat_name);
    //   let rightContentList = this.cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContentList
    //   })
    // })
    const res = await request({url:"/categories"});
    this.cates = res;
    // 把接口的数据存储到本地
    wx.setStorageSync('cates', {time:Date.now(),data:this.cates});

    let leftMenuList = this.cates.map(v=>v.cat_name);
    let rightContentList = this.cates[0].children;
    this.setData({
      leftMenuList,
      rightContentList
    })
  },

  handleItemTap(e){
    const {index} = e.currentTarget.dataset;

    let rightContentList = this.cates[index].children;
    this.setData({
      currentIndex:index,
      rightContentList,
      scrollTop:0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const cates = wx.getStorageSync('cates');
    if(!cates){
      this.getCates()
    }else{
      if(Date.now()-cates.time<1000*10){
        this.getCates()
      }else{
        this.cates = cates.data;
        // console.log(cates.data)
        let leftMenuList = this.cates.map(v=>v.cat_name);
        let rightContentList = this.cates[0].children;
        this.setData({
          leftMenuList,
          rightContentList
        })
      }
    }
    
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