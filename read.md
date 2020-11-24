

## 像鱼天气项目自述文件

### 项目介绍
#### **简介**
*像鱼天气项目是给用户提供天气查询的一款微信小程序,当用户进入小程序时,小程序会获取用户当前的地理位置。根据用户当前的地理位置返回用户当前所在的城市以及用户所在城市的其他市区,用户通过点击城市列表项里的城市名就可以获取到用户所选城市的天气情况。*

#### **安装与使用**
1. 直接在github中下载小程序代码<u>[download](https://github.com/zchengfa/mini-program)</u>
2. 使用微信扫描小程序的二维码查看小程序**(`前提：`若您是第一次扫描该二维码，您会前往申请体验小程序成员页面向开发者提交申请体验小程序。)** ![扫我查看天气小程序](images/QRCode/weatherQRCode.jpg)

#### **使用到的技术**
 1. wxml、js、wxss(页面内容、页面行为、页面样式)。
 2. echarts图表框架(在小程序中用于绘制天气温度折线图)。
 3. components组件开发(小程序使用了组件化开发，城市模块与实时天气模块写在now组件中,24小时、7天天气模块以及生活指数模块分别写在了hours、daily和life组件中)。

#### **写项目过程中遇到的问题**
##### 1. 在使用天气API时获取不到数据。
+ `原因`：
 1.1 使用天气API时传入的参数不对，或者缺少一些必要的参数的参数
<<<<<<< HEAD
 ```
 wx.request({
 	url:url ,
 	data:{
 		location:location
 	},
 	success(res){}
 ```
 + `解决`: 代码中缺少key参数(天气api开发者密钥)
 + `总结`: 代码中缺少key参数(天气api开发者密钥)
 1.2必备参数都传入，未关闭域名证书认证、未将使用到的api域名添加为合法域名。
 + `解决`:在开发工具中勾选不认证域名证书、在微信公众平台开发设置中添加合法域名。

+ `总结`：在使用api获取数据时，要注意api必需参数是否传入、传入的参数是否有用、以及确认是否将域名合法化。

##### 2. 在使用echarts绘图框架时无法将canvas放入scroll-view组件中进行滑动。
 + `原因`：
 1. 小程序不支持在scroll-view组件中嵌套canvas组件。

		```
		<scroll-view scroll-x>
		  <view class="image-container">
		    <ec-canvas  class="canva" id="my-lineChart" canvas-id="mychart-line" ec="{{ ec }}"></ec-canvas>
		  </view>
		</scroll-view>
		```
###### <u>[来自微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html)</u>

**`Bug&Tip`**
1. tip: 基础库 2.4.0以下`不支持嵌套`textarea、map、<u>`canvas`</u>、video 组件
2. tip: scroll-into-view 的优先级高于 scroll-top
3. tip: 在滚动 scroll-view 时会阻止页面回弹，所以在 scroll-view 中滚动，是无法触发 onPullDownRefresh
4. tip: 若要使用下拉刷新，请使用页面的滚动，而不是 scroll-view ，这样也能通过点击顶部状态栏回到页面顶部
5. tip: scroll-view 自定义下拉刷新可以结合 WXS 事件响应 开发交互动画

##### 3.指数详情页面中的新闻资讯部分，无法进入新闻详情网页。
  + `原因`：个人小程序项目不支持跳转到外部网页
###### <u>[来自微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)</u>
  +`注意`:承载网页的容器。会自动铺满整个小程序页面，<u>`个人类型的小程序暂不支持使用`</u>。
  
  +`解决方式`: 1.您申请的小程序不是个人类型以及海外类型的小程序。
  
  + 2.进入<u>[小程序后台](https://mp.weixin.qq.com/)</u>页面，设置-开发者设置-业务域名中将要跳转的域名添加进去。
   ![设置业务域名](https://img.jbzj.com/file_images/article/201909/2019092014082643.png)
   ![下载校验文件](https://img.jbzj.com/file_images/article/201909/2019092014082644.png)