//创建模型
//在拓展模型的构造函数中配置显示图片的宽度和高度
//显示图片的宽度 （屏幕宽度-边距）/2
var w = ($(window).width()-3*6)/2
var ImgModel=Backbone.Model.extend({
	// w1/h1=w/h  h=w/w1*h1
	initialize:function(){
		var h= w/this.attributes.width * this.attributes.height;
		// 将数据存储在模型实例化对象中
		this.attributes.drawWidth=w;
		this.attributes.drawHeight=h;
	} 
})
//暴露接口
module.exports = ImgModel;