$(function () {
	goodsNumSub()
	goodsNumAdd()
	goodsDelete()
	navToggle()
	fly()
	closeVIPModal()
	/////////////////商品数量加、减、删除功能
	function goodsNumSub () {
		$(".jiang").click(function() {
			var num = parseInt($(this).siblings('.num').text())
			if(num == 1) {
				return
			} else {
				$(this).siblings('.num').text(num - 1)
			}
		})
	}

	function goodsNumAdd () {
		$(".jia").click(function() {
			var num = parseInt($(this).siblings('.num').text());
			$(this).siblings('.num').text(num + 1)
		})
	}
	
	function goodsDelete () {
		$(".left-delete").closest("td").click(function () {
			$(this).closest("tr").remove()
		})
	}
	///////////////////导航栏当前分类切换
	function navToggle() {
		$(".classify li").click(function () {
			$(this).siblings().children().removeClass("current")
			$(this).children().addClass("current")
		})
	}
	///////////////////加入购物车小球动画
	function fly() {
		var offset = $('.head-cart-num').offset();
		$('.jia').click(function (event) {
			var thisItem = $(this);
			var flyer = thisItem.clone().text('');
			flyer.fly({
				start: {
					left: event.pageX,
					top: event.pageY
				},
				end: {
					left: offset.left + 10,
					top: offset.top + 10,
				},
				onEnd: function() {
					var num = parseInt($('.head-cart-num').text())+1
					$('.head-cart-num').text(num)
					this.destroy()
				}
			});
		});
	}
	////////////////////关闭会员管理时同时关闭所有子级弹框
	function closeVIPModal() {
		$(".closeVIPManage").click(function() {
			$('#vipRecharge').modal('hide')
			$('#VIPManage-add').modal('hide')
			$('#VIPManage-modify').modal('hide')
			$('#VIPManage-delete').modal('hide')
		})
	}
	
	////////////////////快速选择会员搜索
	function vipSearch () {
		
		var searchTimer = setTimeout(function () {
			
		})
	}
})