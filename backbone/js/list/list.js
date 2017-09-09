//创建展示页
require('./list.css')
var List= Backbone.View.extend({
//绑定事件
events:{
	//搜索事件
	'tap .inserch span':'gotoSearch',
	//分组事件
	'tap .nav li': 'showTypeImage',
	//返回顶部事件
	'tap .go-top':'goToTop',
	//返回首页
	'tap .go':'goToPrevPage',
	//轮播事件
	'swipeLeft .banner li':'showRightImage',
	'swipeRight .banner li':'showLeftImage'
},
//定义模板
tpl:_.template('<a href="<%=href%>"><img style="<%=style%>" src="<%=src%>" alt=""/></a>'),
//记录高度
leftHeight:0,
rightHeight:0,
//定义获取数据的方法
getData:function(){
	//通过集合获取数据的方法
	this.collection.fetchData();
},
//定义获取容器的方法
getDom:function(){
	this.leftContainer=this.$('.left-container');
	this.rightContainer=this.$('.right-container');
},
//构造函数
initialize:function(){
	//初始化dom元素和获取到的数据
	this.getData();
	this.getDom();	
	//跨模块监听集合的变化
	this.listenTo(this.collection,'add',function(model,collection,models){
		this.render(model);
	this.bindEvent();
	// this.showImgAuto();
	})
},
//定义渲染视图的方法
render:function(model){
	var height=model.get('drawHeight');
	//获取数据
	var obj={
		href:'#layer/'+model.get('id'),
		src:model.get('url'),
		style:'width:'+model.get('drawWidth')+'px;height:'+height+'px'
	}
	//获取容器 
	//获取模板 this.tpl
	//格式化模板
	var html=this.tpl(obj)
	//渲染视图 比较左右的高度
	if(this.leftHeight <= this.rightHeight){
		this.renderLeft(html,height)
	}else{
		this.renderRight(html,height)
	}
},
//定义渲染左侧的函数
renderLeft:function(html,height){
	this.leftContainer.append(html);
	this.leftHeight += height+6 ;
},
//定义渲染右侧的函数
renderRight:function(html,height){
	this.rightContainer.append(html);
	this.rightHeight += height+6 ;
},
// 搜索事件
//获取input内容
getSearchInputValue:function(){
	return this.$('.inserch input').val();
},
//校验内容
checkSearchInputValue:function(query){
	return /^\s*$/.test(query)
},
//过滤集合
collectionFilter:function(query){
	return this.collection.filter(function(model,index,models){
		return model.get('title').indexOf(query)>=0
	})
},
//清空视图
clearView:function(){
	this.leftContainer.html('');
	this.rightContainer.html('');
	this.leftHeight=0;
	this.rightHeight=0;
},
//渲染视图
renderResult:function(result){
	var me=this;
	_.forEach(result,function(model,index,arr){
		me.render(model)
	})
},
//清空输入框
clearInputValue:function(){
	this.$('.inserch input').val('');
},
gotoSearch:function(){
	//获取input内容
	var query = this.getSearchInputValue();
	console.log(query)
	//校验内容
	if(this.checkSearchInputValue(query)){
		alert("请输入内容");
		return;
	}
	//过滤集合
	var result=this.collectionFilter(query);
	//清空视图
	this.clearView();
	//渲染视图
	this.renderResult(result);
	//清空输入框
	// this.clearInputValue();
},
//获取点击分类事件元素的id
getDOMID: function(e) {
	return this.$(e.target).data('type')
},
//过滤
getTypeResult:function(id){
	return this.collection.groupBy('type')[id]
},
showTypeImage:function(e){
	//获取元素id
	var id=this.getDOMID(e);
	console.log(id)
	//过滤
	var result = this.getTypeResult(id);
	// 清空视图
	this.clearView();
	// 渲染数据
	this.renderResult(result);
},
//返回顶部
goToTop:function(){
	window.scrollTo(0, 0)
},
//判断卷动的高度，切换显隐
toggleGoTop:function(){
	if($(window).scrollTop() >= 500){
		this.$('.go-top').show();
	}else{
		this.$('.go-top').hide();
	}
},
//卷动节流
bindEvent:function(){
	var me=this;
	// 按时间节流
	var fn=_.throttle(function(){
		me.getData()
	},500);
	//为window绑定事件
	$(window).on('scroll',function(){
		if ($('body').height()<$(window).scrollTop()+$(window).height()+200) {
			fn();
		}
		me.toggleGoTop();
	})
},
//返回首页
goToPrevPage:function(){
	history.go('*other')
},
//轮播
idx:0,
showRightImage:function(){
	this.idx++;
	if(this.idx>5){
		this.idx=0;	
		this.$('.banner ul').css({"marginLeft":0+'px'});	
		this.idx++;
	}				
	var width=$(window).width();
	console.log(-this.idx*width)
	this.$('.banner ul').animate({"marginLeft":-this.idx*width +'px'},500);
},
showLeftImage:function(){
	// console.log(111)
	var width=$(window).width();
	this.idx--;
	if(this.idx<0){
		this.idx=5;
		this.$('.banner ul').css({"marginLeft":-this.idx*width +'px'});
		this.idx--;
	}
	// console.log(-this.idx*width)
	this.$('.banner ul').animate({"marginLeft":-this.idx*width +'px'},500);
}
})
module.exports = List;
		
		
