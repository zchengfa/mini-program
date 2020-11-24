// pages/index/index.js
import * as echarts from '../../components/ec-canvas/echarts';
//定义两个数组给图标传入数据
var xData = [];
var yData = [];
//给图表设置属性
function setChartOption(chart){
  var option = {
    color: "red",  //线的颜色
    grid:{
      x:15,
      x2:25,
      show:false
    },
    xAxis: {        //设置X轴
        type: 'category',
        boundaryGap: false,
        data: xData,
        show:false
    },
    yAxis: {    //设置y轴
        x: 'center',
        type: 'value',
        show:false,
        splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
        }
    },
    series: {    //绘制线的数据
            name: 'temperature',
            type: 'line',
            smooth: true,
            itemStyle:{
              normal:{
                label:{
                  //是否显示拐点数值
                  show:true,
                  offset:[10,0],
                  //自定义拐点数值
                  formatter: (params) => { return (params.value + "℃") }
                }
              }
            },
            data: yData
        },
        //关闭绘图动画
        animation:false
  };
  chart.setOption(option);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前城市
    currentCity:"城市",
    //城市列表数组
    list:[],
    //是否显示或隐藏城市列表
    isShow:false,
    //按钮点击次数
    bindNum:0,
    //实时天气数组
    weatherNow:[],
    //24小时天气预报数组
    forecastHours:[],
    //7天天气预报数组
    forecastDaily:[],
    //api密钥
    apiKey:"60879f33446243b69feae07dee897ec9",
    //生活指数数组
    lifeData:[],
    //canvas图表对象
    ec: {
      //图表懒加载
      lazyLoad:true
    },
    //生成canvas图片路径
    canvasImagePath:""
    // ,
    // lineXData:[],
    // lineYData:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前用户的位置以及当地的天气状况
    this.getUserLocationWeather();
    
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //下拉刷新，重新获取天气位置等数据
    this.getUserLocationWeather();
    
  },
  //点击按钮显示隐藏城市列表
  getCity:function(e){
    if(this.data.bindNum %2 ==0){
      this.setData({
        isShow:true,
        bindNum:this.data.bindNum +1
      });
    }
    else{
      this.setData({
        isShow:false,
        bindNum:this.data.bindNum +1
      });
    }
   
  },
  //点击城市列表事件
  getCurrentCity:function(e){
    // console.log(e.detail);
    this.setData({
      currentCity:e.detail.cityName,
      isShow:false,
      bindNum:this.data.bindNum +1
    });
    //获取用户点击的城市ID
    const location = e.detail.locationid;

    //获取用户当前位置的实时天气数据
    this.getWeather("https://devapi.qweather.com/v7/weather/now?",location);

    //获取用户位置的24小时天气预报数据
    this.getWeather("https://devapi.qweather.com/v7/weather/24h?",location);

    //获取用户位置的未来3天天气预报数据
    this.getWeather("https://devapi.qweather.com/v7/weather/7d?",location);

    //获取当前城市的生活指数数据
    this.getLifeData(location);
  },
  //获取天气数据函数(需传入天气api网址以及位置)
  getWeather:function(url,location){
    const that = this;
    wx.request({
      url:url ,
      data:{
        location:location,
        key:that.data.apiKey
      },
      success(res){
        //判断天气api网址参数并进行相应的赋值
        if(url =="https://devapi.qweather.com/v7/weather/now?"){
          const nowArr = res.data.now;
          nowArr.icon = "../../images/WeatherIcon/64/" + nowArr.icon +".png";
          that.setData({
            weatherNow:nowArr
          });
          //console.log(that.data.weatherNow);
        }
        else if(url =="https://devapi.qweather.com/v7/weather/24h?"){
          const hoursArray = res.data.hourly;
          const xData = [];
          const yData = [];
          for(var i=0;i<hoursArray.length;i++){
            //自定义返回过来的24小时天气数据
            hoursArray[i].fxTime = hoursArray[i].fxTime.slice(11,16);
            hoursArray[i].icon = "../../images/WeatherIcon/64/" + hoursArray[i].icon + ".png";
            hoursArray[i].pressure = hoursArray[i].pressure + "hPa";
            hoursArray[i].humidity = "湿度： " + hoursArray[i].humidity + "%";
            hoursArray[i].windSpeed = "风力： " + hoursArray[i].windSpeed + "级";

            //将时间和温度添加到新数组
            xData.push( hoursArray[i].fxTime);
            yData.push(hoursArray[i].temp);
          }
          that.setData({
            forecastHours:hoursArray
          });
          //获取组件
          that.chartComponent = that.selectComponent("#my-lineChart");
          //传入时间和温度数组
          that.getLineData(xData,yData);
          setTimeout(()=>{
            that.saveImage("#my-lineChart");
          },500);
         
        }
        else{
          const dailyArray = res.data.daily;
          // const xData = [];
          // const yData = [];
          for(var i=0;i<dailyArray.length;i++){
            //自定义返回的7天天气数据
            dailyArray[i].tempMax = dailyArray[i].tempMax;
            dailyArray[i].tempMin = dailyArray[i].tempMin;
            dailyArray[i].fxDate = dailyArray[i].fxDate.slice(5);
            dailyArray[i].fxDate =  dailyArray[i].fxDate.replace("-","/");
            dailyArray[i].iconDay = "../../images/WeatherIcon/64/" + dailyArray[i].iconDay + ".png";
            dailyArray[i].iconNight = "../../images/WeatherIcon/64/" + dailyArray[i].iconNight + ".png";
            dailyArray[i].pressure = dailyArray[i].pressure + "hPa";
            dailyArray[i].humidity = "湿度： " + dailyArray[i].humidity + "%";
           
            // xData.push(dailyArray[i].fxDate);
            // yData.push(dailyArray[i].tempMin);
          }
          that.setData({
            forecastDaily:dailyArray
            // ,
            // lineXData:xData,
            // lineYData:yData
          });
          //console.log(that.data.lineXData,that.data.lineYData);
        }
      },
      fail(err){
        console.log(err);
      }
    })
  },
  //封装获取用户当前的地理位置以及当前位置的实时数据、24小时天气预报数据以及7天天气预报数据函数
  getUserLocationWeather:function(){
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '刷新中...',
    })
    const that = this;
    //获取用户当前位置
    wx.getLocation({
      altitude: 'altitude',
      success(res){
        const longitude = res.longitude;
        const latitude = res.latitude;
        const location = longitude + "," +latitude;
        const url = 'https://geoapi.qweather.com/v2/city/lookup?';
        //传入用户当前位置获取当前用户所在位置的城市
        wx.request({
          url: url,
          data:{
            location:location,
            key:that.data.apiKey
          },
          success(res){
            const city = res.data.location[0].adm2;
            that.setData({
              currentCity:res.data.location[0].name
            });
            //获得用户当前所在城市后再获取该城市所有的市区列表
            wx.request({
              url: url,
              data:{
                location:city,
                key:that.data.apiKey
              },
              success(res){
                that.setData({
                  list:res.data.location
                });
                //数据获取成功之后停止刷新并隐藏刷新样式
                wx.hideLoading();
                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh();
              }
            })
            //console.log(that.data.currentCity);
          }

        });

        //获取用户位置的实时天气数据
        that.getWeather("https://devapi.qweather.com/v7/weather/now?",location);

        //获取用户位置的24小时天气预报数据
        that.getWeather("https://devapi.qweather.com/v7/weather/24h?",location);

        //获取用户位置的未来3天天气预报数据
        that.getWeather("https://devapi.qweather.com/v7/weather/7d?",location);

        //获取当前城市的生活指数数据
        that.getLifeData(location);
      },
      //判断获取地理位置失败的原因并作出相应的提示
      fail(err){
        console.log(err["errMsg"]);
        //判断是否授权
        if(err["errMsg"]=="getLocation:fail:auth denied"){
          wx.getSetting({
            withSubscriptions: true,
            success(res){
              console.log(res.authSetting);
              //判断用户是否允许授权，未授权则弹出未授权提示框
              if(!res.authSetting["scope.userLocation"]){
                //弹出提示框引导用户进入设置页面进行授权
                wx.showModal({
                  showCancel:false,
                  title:"提示！",
                  content:"由于您未授权程序获取您的位置信息，无法获取您的天气，请授权。",
                  confirmText:"去授权",
                  confirmColor:"green",
                  success(res){
                    //点击去授权打开授权设置页面
                    if(res.confirm){
                      wx.openSetting({
                        withSubscriptions: true,
                        success(res){
                          //再次判断是否允许授权，若允许则开始获取位置以及天气等数据
                          if(res.authSetting["scope.userLocation"]){
                            //获取用户当前的地理位置和天气数据   
                            that.getUserLocationWeather();
                          }
                          
                        }
                      })
                    }
                  }
                })
              }
              //用户已授权，开始获取数据
              else{
                that.getUserLocationWeather();
              }
            }
          }) 
        }
        //判断未成功获得位置的原因是否是由于频率限制的
        else if(err["errMsg"=="getLocation:fail meet frequency limit, please slowdown and try again later"]){
          //受到微信小程序访问频率限制，弹出提示框
          wx.showModal({
            showCancel:false,
            title:"提示！",
            content:"fail meet frequency limit, please slowdown and try again later",
            confirmText:"知道了",
            confirmColor:"green",
            success(res){
              //关闭刷新
                wx.hideLoading();
                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh();
            }
          })
        }
        //判断手机gps是否打开
        else{
          //弹出提示框，提醒用户手机GPS未打开
          wx.showModal({
            showCancel:false,
            title:"提示！",
            content:"您的手机未开启GPS功能，请开启。",
            confirmText:"知道了",
            confirmColor:"green",
            success(res){
              //关闭刷新
                wx.hideLoading();
                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh();
            }
          })
          
        }

      }
    })
  },
  //封装获取当前城市的生活指数数据函数
  getLifeData:function(location){
    var that = this;
    wx.request({
      url: 'https://devapi.qweather.com/v7/indices/1d?',
      data:{
        location:location,
        key:that.data.apiKey,
        type:"1,2,3,4,5,6,8,9,15,16"
      },
      success(res){
       that.setData({
         lifeData:res.data.daily
       });
       //console.log(that.data.lifeData);
      }
    })
  },
  //获取折线数据
  getLineData:function(arrXData,arrYData){
    const that =this;
    xData = arrXData;
    yData = arrYData
    that.initChart();  
  },
  //初始化图表
  initChart:function(){
    this.chartComponent.init((canvas,width,height)=>{
      const chart =echarts.init(canvas,null,{
        width:width,
        height:height
      })
      //给图表设置属性
      setChartOption(chart);
      this.chart = chart;
      //返回图表
      return chart;
    });
  },
  //将canvas生成图片得到一个图片临时路径
  saveImage:function(chartComponent) {
    var that = this;
    //获取需要保存成图片的组件
    var chartComponent = that.selectComponent(chartComponent);
        chartComponent.canvasToTempFilePath({
          success(res){
            //console.log("tempFilePath:",res.tempFilePath);
            //将保存好的图片的路径赋给canvasImagePath
            that.setData({
              canvasImagePath:res.tempFilePath
            });
          },fail(err){
            console.log(err);
          }
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