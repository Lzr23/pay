$(function() {
	numSub()
	numAdd()
	navToggle()
	fly()

	/////////////////商品数量加减功能
	function numSub() {
		$(".jiang").click(function() {
			var num = parseInt($(this).siblings('.num').text())
			if(num == 1) {
				return
			} else {
				$(this).siblings('.num').text(num - 1)
			}
		})
	}

	function numAdd() {
		$(".jia").click(function() {
			var num = parseInt($(this).siblings('.num').text());
			$(this).siblings('.num').text(num + 1)
		})
	}
	///////////////////导航栏当前分类切换
	function navToggle() {
		$(".classify li").click(function() {
			$(this).siblings().children().removeClass("current")
			$(this).children().addClass("current")
		})
	}
	///////////////////加入购物车小球动画
	function fly() {
		var offset = $('.head-cart-num').offset();
		$('.jia').click(function(event) {
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
})