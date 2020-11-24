// import * as echarts from "../ec-canvas/echarts"
//定义两个数组，给图表传入数据
// var oneData =[];
// var twoData =[];
//给图表设置属性
// function setChartOption(chart){
//   var option = {
//     color: "red",  //线的颜色
//     grid:{
//       x:15,
//       x2:25,
//       show:false
//     },
//     xAxis: {        //设置X轴
//         type: 'category',
//         boundaryGap: false,
//         data: oneData,
//         show:false
//     },
//     yAxis: {    //设置y轴
//         x: 'center',
//         type: 'value',
//         show:false,
//         splitLine: {
//                 lineStyle: {
//                     type: 'dashed'
//                 }
//         }
//     },
//     series: {    //绘制线的数据
//             name: 'temperature',
//             type: 'line',
//             smooth: true,
//             itemStyle:{
//               normal:{
//                 label:{
//                   //是否显示拐点数值
//                   show:true,
//                   offset:[10,0],
//                   //自定义拐点数值
//                   formatter: (params) => { return (params.value + "℃") }
//                 }
//               }
//             },
//             data: twoData
//         },
//         //关闭绘图动画
//         animation:false
//   };
//   chart.setOption(option);
// }
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scrollHorizontal:{
      type:Boolean,
      value:true
    },
    scrollVertical:{
      type:Boolean,
      value:false
    },
    scrollItemData:{
      type:Array,
      value:[]
    }
    ,
    lineXData:{
      type:Array,
      value:[]
      // ,
      //监听数据变化并将值设置给data中的自定义数组
      // observer:function(val){
      //   this.setData({
      //     xData:val
      //   });
      // }
    },
    lineYData:{
      type:Array,
      value:[]
      // ,
      //监听数据变化并将值设置给data中的自定义数组
      // observer:function(val){
      //   this.setData({
      //     yData:val
      //   });
      // }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // ecLine:{
    //   lazyLoad:true
    // },
    // xData:[],
    // yData:[]
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    //初始化图表并传入所需要的的数据
    // getLineData:function(arrXData,arrYData){
    //   const that =this;
    //   oneData = arrXData;
    //   twoData = arrYData
    //   that.initChart();  
    // },
    //初始化图表
    // initChart:function(){
    //   var that = this;
    //   that.chartComponent.init((canvas,width,height)=>{
    //     const chart =echarts.init(canvas,null,{
    //       width:width,
    //       height:height
    //     })
    //     //设置图表属性
    //     setChartOption(chart);
    //     that.chart = chart;
    //     return chart;
    //   });
    // }
  },
  ready:function(){
    // var that = this;
    // 获取组件
    // that.chartComponent = that.selectComponent("#lineChart");
    // 传入时间和温度数组
    // that.getLineData(that.data.xData,that.data.yData);
    // console.log(that.data.xData);
  }
  
})

