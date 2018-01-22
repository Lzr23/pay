/** 
 处理全选或全部反选
**/
function selectAll(obj){
	jQuery(obj).change(function(){ 
		var is_checked = $(this).prop("checked"); 
		$('.ftCheckbox').prop("checked",is_checked);
	});
	var oInput = $('.ftCheckbox')
	for (var i = 1; i < oInput.length; i++) {
			oInput[i].onclick = function () {
				for (var i = 1; i< oInput.length; i++) {
					if (oInput[i].checked == false) {
						$('.selectAll').removeAttr('checked')
						return
					}
				}
				$('.selectAll').prop('checked', true)
			}
	}
} 

$.fn.extend({
	checkSelected: function () {
		var oInput = $($(this).selector + ' .ftCheckbox')
		for (var i = 1; i < oInput.length; i++) {
			if (oInput[i].checked == true) {
					return true
				}
		}
		return false
	}
})

function getReferenceForm(elm) {
	while(elm && elm.tagName != 'BODY') {
		if(elm.tagName == 'FORM') return elm;
		elm = elm.parentNode;
	}
	return null;
}


$(function() {
	
	$('body').find('.selectAll').click(function() { 
		jQuery(this).val("");//全选按钮的值放空，避免提交后出现on
		selectAll(this);
	})
	 
 //回车提交
	$(document).keyup(function(event){
	  if(event.keyCode ==13){
	    $("#ListForm").submit();
	    $("#theForm").submit();
	  }
	})
	
	///////////////////商品分类栏切换
	$(".classify li").click(function () {
		$(this).siblings().children().removeClass("current")
		$(this).children().addClass("current")
	})
	
	/////////////////支付方式选中
	$(".ftPayment li").click(function() {
		$('.ftPayment .Hui-iconfont-xuanzhong1').remove()
		$(this).append('<i class="Hui-iconfont Hui-iconfont-xuanzhong1"></i>')
		$(".ftPayment li").removeClass('payment-current')
		$(this).addClass('payment-current')
	})
})

var FT={
	/*Json 工具类*/
	isJson:function(str){
		var obj = null; 
		try{
			obj = FT.paserJson(str);
		}catch(e){
			return false;
		}
		var result = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; 
		return result;
	},
	paserJson:function(str){
		return eval("("+str+")");
	},
	/*弹出框*/
	alert:function(title, msg, icon, callback){
		$.messager.alert(title,msg,icon,callback);
	},
	/*弹出框*/
	confirm:function(title, msg,callback){
		$.messager.confirm(title,msg,callback);
	},

	//加载信息
	loading:function(name, overlay) {

		$('body').append('<div id="overlay"></div><div id="preloader">' + name + '..</div>');
		if (overlay == 1) {
			$('#overlay').css('opacity', 0.1).fadeIn(function() {
				$('#preloader').fadeIn();
			});
 
			return false;
		}
 
		$('#preloader').fadeIn();
  
	},

	unloading: function () {
		$('#preloader').fadeOut('fast', function() {
			$('#overlay').fadeOut();
		});
	} ,
	progress:function(title,msg){
		 var win = $.messager.progress({  
            title: title ||'Please waiting',  
            msg: msg ||'Loading data...'  
         }); 
	},
	closeProgress:function(){
		$.messager.progress('close');
	},
	/*重新登录页面*/
	toLogin:function(){
		window.top.location= urls['msUrl']+"/login.shtml";
	},
	checkLogin:function(data){//检查是否登录超时
		if(data.logoutFlag){
			FT.closeProgress();
			FT.alert('提示',"登录超时,点击确定重新登录.",'error',FT.toLogin);
			return false;
		}
		return true;
	}, 
	ajaxJson: function(url,option,callback){
		$.ajax(url,{
			type:'post',
			 	dataType:'json',
			 	data:option,
			 	success:function(data){
			 		//坚持登录
			 		if(!FT.checkLogin(data)){
			 			return false;
			 		}		 	
			 		if($.isFunction(callback)){
			 			callback(data);
			 		}
			 	},
			 	error:function(response, textStatus, errorThrown){
			 		try{
			 			FT.closeProgress();
			 			var data = $.parseJSON(response.responseText);
				 		//检查登录
				 		if(!FT.checkLogin(data)){
				 			return false;
				 		}else{
					 		FT.alert('提示', data.msg || "请求出现异常,请联系管理员",'error');
					 	}
			 		}catch(e){
			 			FT.alert('提示',"请求出现异常,请联系管理员.",'error');
			 		}
			 	},
			 	complete:function(){
			 	
			 	}
		});
	},
	ajaxSynJson: function(url,option,callback){
		$.ajax(url,{
			type:'post',
			dataType:'json',
			async: false,
			data:option,
			success:function(data){
				//坚持登录
				if(!FT.checkLogin(data)){
					return false;
				}		 	
				if($.isFunction(callback)){
					callback(data);
				}
			},
			error:function(response, textStatus, errorThrown){
				try{
					FT.closeProgress();
					var data = $.parseJSON(response.responseText);
					//检查登录
					if(!FT.checkLogin(data)){
						return false;
					}else{
						FT.alert('提示', data.msg || "请求出现异常,请联系管理员",'error');
					}
				}catch(e){
					FT.alert('提示',"请求出现异常,请联系管理员.",'error');
				}
			},
			complete:function(){
				
			}
		});
	},
	submitForm:function(form,callback,dataType){
			var option =
			{
			 	type:'post',
			 	dataType: dataType||'json',
			 	success:function(data){
			 		if($.isFunction(callback)){
			 			callback(data);
			 		}
			 	},
			 	error:function(response, textStatus, errorThrown){
			 		try{
			 			FT.closeProgress();
			 			var data = $.parseJSON(response.responseText);
				 		//检查登录
				 		if(!FT.checkLogin(data)){
				 			return false;
				 		}else{
					 		FT.alert('提示', data.msg || "请求出现异常,请联系管理员",'error');
					 	}
			 		}catch(e){
			 			FT.alert('提示',"请求出现异常,请联系管理员.",'error');
			 		}
			 	},
			 	complete:function(){
			 	
			 	}
			 }
			 FT.ajaxSubmit(form,option);
	},
	saveForm:function(form,callback){
		if(form.form('validate')){
			FT.progress('Please waiting','Save ing...');
			//ajax提交form
			FT.submitForm(form,function(data){
				FT.closeProgress();
			 	if(data.success){
			 		if(callback){
				       	callback(data);
				    }else{
			       		FT.alert('提示','保存成功.','info');
			        } 
		        }else{
		       	   FT.alert('提示',data.msg,'error');  
		        }
			});
		 }
	},
	
	validForm:function(form, validRules, callback, options){

		var config = {
				btnSubmit:".confirmBt", 
				btnReset:".cancelBt",
				tiptype:2,  
				url:"",//覆盖action
				ajaxPost:true
		};
		
		if (typeof options === 'object') {
			config = jQuery.extend(config,options);
		} 
		
		var action = form.attr("action");
		if(config.url && config.url != "") {
			action = config.url;
		}
		jQuery.validator.setDefaults({
			submitHandler: function() {
				 FT.ajaxJson(action, form.serialize(), function(data) {
					  layer.msg(data.msg, function () {
					 		if(jQuery.isFunction(callback)){ 
		 						callback(data);
					 		}
		 				}) 
				  }) 
			}
		});
		
    	return form.validate(validRules);
		 
	},
	/**
	 * 
	 * @param {} url
	 * @param {} option {id:''} 
	 */
	getById:function(url,option,callback){
		FT.progress();
		FT.ajaxJson(url,option,function(data){
			FT.closeProgress();
			if(data.success){
				if(callback){
			       	callback(data);
			    }
			}else{
				FT.alert('提示',data.msg,'error');  
			}
		});
	},

	deleteObj: function(url, callback, options) {
		var config = {  
				confirmMsg: "确认删除吗?" 
		};
		
		if (typeof options === 'object') {
			config = jQuery.extend(config,options);
		} 
		 
		if(config.confirmMsg != "") {
			 var lc = layer.confirm(config.confirmMsg, {
				  btn: ['确定','取消'] //按钮
				}, function(){ 
				  FT.ajaxJson(url, {} , function(data) {
					  layer.msg(data.msg, function () {
					 		if(jQuery.isFunction(callback)){ 
		 						callback(data);
					 		}
		 				}) 
				  })
				}, function(index){
				  layer.close(index); 
				}); 
		}
		
	},
	deleteForm: function(url, callback, options) {
		var config = {  
				confirmMsg: "确认删除吗?",
				formId: "ListForm",
				multId: ""
		};
		
		if (typeof options === 'object') {
			config = jQuery.extend(config,options);
		} 
		
		
		if (config.multId=="") {//没有直接传id，通过form查询选中的
			var multId = "";
			jQuery(":checkbox:checked").each(function(){
			  if(jQuery(this).val()!=""){	  
			    multId=multId+","+jQuery(this).val();
			  }
			});
			if(multId == ""){
				layer.msg("至少选择一条数据记录", {
					  icon: 1,
					  time: 2000 //2秒关闭（如果不配置，默认是3秒）
					});  
				return;
			} 
		}  
		
		//放到隐藏域
	    jQuery("#"+config.formId+" #multId").val(multId);
		var form = jQuery("#"+config.formId)
		if(config.confirmMsg != "") {
			 var lc = layer.confirm(config.confirmMsg, {
				  btn: ['确定','取消'] //按钮
				}, function(){ 
				  FT.ajaxJson(url, form.serialize(), function(data) {
					  layer.msg(data.msg, function () {
					 		if(jQuery.isFunction(callback)){ 
		 						callback(data);
					 		}
		 				}) 
				  })
				}, function(index){
				  layer.close(index); 
				}); 
		}
		
	},
	couterInput: function (id, callback) {  ////数字键盘输入
		var oInput = $('#' + id)
		var count = {
			'num-1': '1',
			'num-2': '2',
			'num-3': '3',
			'num-4': '4',
			'num-5': '5',
			'num-6': '6',
			'num-7': '7',
			'num-8': '8',
			'num-9': '9',
			'num-0': '0',
			'num-dot': '.'
		}
		$('.counter').on('click', function (event) {
			event = event || window.event
			var target = event.target || window.srcElement
			if (count[$(target).attr('class')] != undefined) {
				oInput.val(oInput.val() + count[$(target).attr('class')])
			}
		})
		$('.couterClear').click(function () {
			oInput.val('')
		})
		$('.couterConfirm').click(function () {
			callback()
		})
	}
	
}  
DEBUG = true;
function trace(msg) {if(DEBUG) alert(msg);}