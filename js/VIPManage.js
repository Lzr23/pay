$(function() {
	haveChecked()
	deleteConfirm()
	vipLoss()
	
	////////分页器
	$('#box').paging({
		initPageNo: 1, // 初始页码
		totalPages: 20, //总页数
		totalCount: '合计300条数据', // 条目总数
		slideSpeed: 600, // 缓动速度。单位毫秒 
		callback: function(page) { // 回调函数 
			console.log(page);
		}
	})
})

////////重置密码等弹框前确认是否已经选中元素
	function haveChecked () {
		$(".vip-nav").click(function (event) {
			var modal = {
				vipNav3 : '#VIPManage-reset',
				vipNav4 : '#VIPManage-modify',
				vipNav7 : '#VIPManage-loss',
				vipNav8 : '#VIPManage-deleteMore',
				vipNav9 : '#VIPManage-patch',
			}
			event = event || window.event;
	    	var target = event.srcElement || event.target;
	    	var targetClass = $(target).attr('class')
	    	if (targetClass == 'vipNav3' || targetClass == 'vipNav4' || targetClass == 'vipNav7'
	    	|| targetClass == 'vipNav8' || targetClass == 'vipNav9') {
	    		var myCheckbox = $('.vipManage-info .myCheckbox')
	    		for (var i = 0; i < myCheckbox.length; i++) {
	    			if (myCheckbox[i].checked == true) {
	    				$(modal[targetClass]).modal('show')
	    				return
	    			}
	    		}
	    		$('#VIPManage-unchecked').modal('show')
	    	}
		})
	}
	
	////////确认删除会员
	function deleteConfirm () {
		$(".vipHandle-delete").click(function () {
			var self = this
			$(".delete-confirm").click(function() {
				$(self).closest('tr').remove()
			})
		})
	}
	
	////////会员挂失状态更改
	function vipLoss () {
		$('.loss-confirm').click(function (){
			var myCheckbox = $('.vipManage-info .myCheckbox')
			for (var i = 0; i < myCheckbox.length; i++) {
				if (myCheckbox[i].checked == true) {
					console.log(myCheckbox.eq(i).closest('td').next('td'))
					myCheckbox.eq(i).closest('td').next('td').append('<span style="color:red">(已挂失)</span>')
					myCheckbox.eq(i).attr('checked','false')
				}
			}
		})
	}