//路由
// require('../lib/underscore');
// require('../lib/zepto');
// require('../lib/zepto.touch');
// require('../lib/backbone');
require('../reset.css');
var  Layer= require('../layer/layer');
var  List= require('../list/list');
var ImgCollection = require('../collection/collection');
// 实例化集合
var ic = new ImgCollection();
//实例化展示页
var list = new List({el:'#app',collection:ic});
//实例化大图页
var layer = new Layer({el:'#app',collection:ic});
//拓展路由类
var Router=Backbone.Router.extend({
	//配置
	routes:{
		// 大图页
		'layer/:id': 'showLayer',
		// 列表页
		'*other': 'showList'
	},
	showLayer:function(id){
		layer.render(id);
		$('#layer').show();
		$('#list').hide();
	},
	showList:function(){
		// console.log('list')
		$('#layer').hide();
		$('#list').show();
	}
})
// 第二步 实例化
var router = new Router();
// 第三步 启动路由
// Backbone.history.start();

Backbone.history.start();