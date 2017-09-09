//创建大图页视图
require('./layer.css')
// 窗口高度
var height = $(window).height();
var Layer =Backbone.View.extend({
	//获取大图页模板
	tpl:_.template($('#tpl_layer').text()),
	// 定义渲染的方法
	render: function(id) {
		// console.log(id)
		// 1获取数据
		var model = this.collection.get(id);
		if (!model) {
			// 进入列表页
			Backbone.history.location.replace('#/')
			return;
		}
		this.currentImageId = model.get('id');
		var obj = {
			src: model.get('url'),
			style: 'line-height: ' + height + 'px',
			title: model.get('title')
		}
		// console.log(model)
		// 2获取容器元素
		var dom = this.$('#layer')
		// 3获取模板
		// 4格式化模板
		var html = this.tpl(obj)
		// 5渲染视图
		dom.html(html);
	},
	//定义当前图片的id
	currentImageId:0,
	events:{
		//切换显隐
		'tap .layer .image-container img':'toggleHeader',
		//向左划
		'swipeLeft .layer .image-container img':'showNextImage',
		//向右划
		'swipeRight .layer .image-container img': 'showPrevImage',
		//返回
		'tap .layer .go-back': 'goBack',
		'tap .layer .go-first':'goToPrevPage'
	},
	toggleHeader:function(){
		this.$('.layer .header').toggle();
	},
	showNextImage:function(){
		//当前图片Id+1
		this.currentImageId++;
		// 根据id获取图片
		var model=this.collection.get(this.currentImageId);
		if(model){
			location.hash='#layer/'+this.currentImageId;			
		}else{
			alert('已经是最后一张了')
			this.currentImageId--;
		}
	},
	showPrevImage:function(){
		this.currentImageId--;
		var model = this.collection.get(this.currentImageId);
		if(model){
			location.hash='#layer/'+this.currentImageId;			
		}else{
			alert('已经是第一张了')
			this.currentImageId++;
		}
	},
	goBack: function() {
		history.go(-1)
	},
	goToPrevPage:function(){
		history.go('*other')
	}
})
module.exports = Layer;