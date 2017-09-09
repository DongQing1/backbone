//创建集合
var ImgModel=require('../model/model')
var ImgCollention = Backbone.Collection.extend({
	//绑定模型类
	model:ImgModel,
	//获取数据
	//数据的路径
	url:'data/imageList.json',
	modelId:0,
	//定义获取数据的方法
	fetchData:function(){
		var me=this;
		//发ajax
		$.get(this.url,function(res){
			if(res && res.errno === 0){
				//对数组倒序
				res.data.sort(function(){
					return Math.random() > .5 ? 1:-1;
				})
				//添加id
				_.forEach(res.data,function(obj,index,arr){
					obj.id = ++ me.modelId; 
					// console.log(obj)
				})
				//添加到集合中，调用实例化对象的add方法
				me.add(res.data);
				// console.log(me)
			}
		})
	}
})
module.exports = ImgCollention;