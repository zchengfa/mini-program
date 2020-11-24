Component({
  /**
   * 组件的属性列表
   */
  properties: {
    buttonText:{
      type:String,
      value:"bttonText"
    },
    city:{
      type:Array,
      value:["item"]
    },
    isShow:{
      type:Boolean,
      value:true
    },
    weatherNow:{
      type:Object,
      value:"[]"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap:function(){
      this.triggerEvent("customevent",{});
    },
    getCuCity:function(e){
      const cityName = e.target.dataset.text;
      const locationid = e.target.dataset.locationid;
      this.triggerEvent("getcity",{cityName,locationid});
      // console.log(cityName);
      // console.log(locationid);
    }
  }
})
