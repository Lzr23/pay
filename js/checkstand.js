$(function () {
	showCartNum()
	goodsNumSub($(".jiang"))
	goodsNumAdd($(".jia"))
	goodsDelete($(".left-delete"))
	fly($('.jia'))
	navToggle()
	vipChoiceSearch()
	goodsToCart()
	clearCart()
	iframeLoad()
	
	////////////////计算购物车总价
	function cartTotalPrice () {
		var totalPrice = 0
		for (var i = 0; i<$('.cart-goodsNum').length; i++) {
			totalPrice += parseInt($('.cart-goodsNum').eq(i).text()) * parseFloat($('.cart-goodsPrice').eq(i).text())
		}
		$('.cart-totalPrice').text(totalPrice)
	}
	
	////////////////清空购物车
	function clearCart () {
		$('#clearBt').click(function () {
			$('.cart-item').remove()
			$('.head-cart-num').text('0').css('display', 'none')
			$('.cart-totalPrice').text('0')
		})
	}
	
	////////////////监听是否显示购物车数量
	function showCartNum () {
		var num = parseInt($('.head-cart-num').text())
		if (num == 0) {
			$('.head-cart-num').css('display', 'none')
		} else {
			$('.head-cart-num').css('display', 'inline')
		}
	}
	
	////////////////将商品添加到购物车
	function goodsToCart () {
		$('.goods').on('click', function () {
			var goodsId = $(this).attr('id')
			var goodsName = $(this).eq(0).find('.goods-name').text()
			var goodsPrice = parseFloat($(this).find('.goods-price').text())
			var cartGoods = $('.cart-goodsNum')
			
			for (var i = 0; i < cartGoods.length; i++) {
				
				if ($(cartGoods).eq(i).attr('id') == goodsId) {
					var cartGoodsNum = parseInt($(cartGoods).eq(i).find('.cart-goodsNum').text())
					$(cartGoods).eq(i).find('.cart-goodsNum').text(cartGoodsNum + 1)
					$('.head-cart-num').text(parseInt($('.head-cart-num').text()) + 1)
					showCartNum()
					cartTotalPrice()
					return
				}
			}
			var newGoods = $('<tr class="cart-item" id=' + goodsId + '>'+
							'<td class="cart-goodsName">' + goodsName + '</td>'+
							'<td>'+
							'<i class="jiang"></i>'+
							'<span class="cart-goodsNum">1</span>'+
							'<i class="jia">+</i>'+
							'</td>'+
							'<td class="cart-goodsPrice">' + goodsPrice + '</td>'+
							'<td class="cart-discountPrice">118</td>'+
							'<td><button class="left-delete">X</button></td>'+
							'</tr>')
			goodsNumSub(newGoods.find('.jiang'))
			goodsNumAdd(newGoods.find('.jia'))
			goodsDelete(newGoods.find('.left-delete'))
			fly(newGoods.find('.jia'))
			$('.cart-goods').append(newGoods)
			$('.head-cart-num').text(parseInt($('.head-cart-num').text()) + 1)
			showCartNum()
			cartTotalPrice()
		})
	}
	
	/////////////////购物车商品数量加、减、删除功能
	function goodsNumSub (obj) {
		obj.click(function() {
			var num = parseInt($(this).siblings('.cart-goodsNum').text())
			if(num == 1) {
				return
			} else {
				$(this).siblings('.cart-goodsNum').text(num - 1)
				$('.head-cart-num').text(parseInt($('.head-cart-num').text()) - 1)
				cartTotalPrice()
			}
		})
	}

	function goodsNumAdd (obj) {
		obj.click(function() {
			var num = parseInt($(this).siblings('.cart-goodsNum').text());
			$(this).siblings('.cart-goodsNum').text(num + 1)
			cartTotalPrice()
		})
	}
	
	function goodsDelete (obj) {
		obj.closest("td").click(function () {
			var num = parseInt(obj.closest('td').siblings().children('.cart-goodsNum').text())
			$('.head-cart-num').text(parseInt($('.head-cart-num').text()) - num)
			$(this).closest("tr").remove()
			showCartNum()
			cartTotalPrice()
		})
	}
	///////////////////商品导航栏切换
	function navToggle() {
		$(".classify li").click(function () {
			$(this).siblings().children().removeClass("current")
			$(this).children().addClass("current")
		})
	}
	///////////////////加入购物车小球动画
	function fly(obj) {
		var offset = $('.head-cart').offset();
		obj.click(function (event) {
			event = event || window.event
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
					showCartNum()
					cartTotalPrice()
					this.destroy()
				}
			});
		});
	}
	
	////////////////////快速选择会员搜索
	function vipChoiceSearch () {
		var searchTimer
		$('.vipChoice-search').keyup(function () {
			$('.vipChoice-info tr').css('display', 'none')
			clearTimeout(searchTimer)
			searchTimer = setTimeout(function () {
				$('.vipChoice-info tr').css('display', 'table-row')
			},700)
		})
		
	}
	
	/////////////////////结账
	var dealInput  //结账弹框当前输入框对象
	var isFirst = true //标记是否需要重置input值
	$('.deal-section1 input').focus(function () {
		isFirst = true
	})
	$('.deal-close').click(function () {
		isFirst = true
	})
	/////////监听键盘输入，结账金额变化
	$('.dealMoney1').keyup(function () {
		deal1()
	})
	$('.dealDiscount').keyup(function () {
		deal2()
	})
	$('.deal-reality').keyup(function () {
		deal3()
	})
	
	$('.jiezhang').click(function () {
		
		if ($('.cart-goodsNum').length <= 0) {  //判断购物车中是否有商品,有则结账，否则提示
			toastr.warning('购物车是空的~~')
		} else {
			$('#deal').modal('show')
			$('.dealMoney1')[0].focus()
			var totalPrice = parseFloat($('.cart-totalPrice').text())
//				var money1 = $('dealMoney1').val()
//				var money2 = parseFloat($('dealMoney2').text())
			$('.dealMoney1').val(totalPrice)
			$('.deal-reality').val(totalPrice)
			
			dealInput = $('.dealMoney1')
			
		}
	})
	/////////第一种支付输入变化
	function deal1 () {
		var totalPrice
		if ($('.deal-reality').val() == '0.00') {  //实收为空时，收取购物车总价，否则收取实收的金额
			totalPrice = parseFloat($('.cart-totalPrice').text()) 
		} else {
			totalPrice = parseFloat($('.deal-reality').val())
		}
		var money1 = parseFloat($('.dealMoney1').val())
		if ($('.dealMoney1').val() != '') {  ////为空时和不为空时
			if (totalPrice >= money1) {
				$('.dealMoney2').text(checkPrice(totalPrice-money1))
				$('.deal-change').text('0.00')
			} else {
				$('.dealMoney2').text('0.00')
				$('.deal-change').text(checkPrice(money1-totalPrice))
			}
		} else {
			$('.dealMoney2').text(checkPrice(totalPrice))
			$('.deal-change').text('0.00')
		}
	}
	//////////折扣变化
	function deal2 () {
		var totalPrice = parseFloat($('.cart-totalPrice').text())
		var discount = parseInt($('.dealDiscount').val())
		var newPrice = (totalPrice * discount) / 100
		if ($('.dealDiscount').val() != '') {
			$('.dealMoney1').val(checkPrice(newPrice))
			$('.dealMoney2').text('0.00')
			$('.deal-change').text('0.00')
			$('.deal-reality').val(checkPrice(newPrice))
		}
	}
	//////////实收变化
	function deal3 () {
		var totalPrice = parseFloat($('.cart-totalPrice').text())
		var reality = parseFloat($('.deal-reality').val())
		if ($('.deal-reality').val() != '') {
			var discount = (reality/totalPrice) * 100
			$('.dealDiscount').val(checkPrice(discount))
			$('.dealMoney1').val(checkPrice(reality))
		}
	}
	
	/////////选择员工
	$('.deal-staff-info').click(function () {
		$(this).siblings('li').children('i').removeClass('deal-staffSelected')
		$(this).children('i').addClass('deal-staffSelected')
	})
	
	////////改变当前输入框
	$('.deal-section1 input').focus(function () {
		dealInput = $(this)
	})
	
	////////点击数字输入
	$('.deal-counter img').click(function (event) {
		event = event || window.event
		var target = event.srcElement || event.target
		var count = {
			'deal-1': '1',
			'deal-2': '2',
			'deal-3': '3',
			'deal-4': '4',
			'deal-5': '5',
			'deal-6': '6',
			'deal-7': '7',
			'deal-8': '8',
			'deal-9': '9',
			'deal-0': '0',
			'deal-20': '20',
			'deal-50': '50',
			'deal-100': '100',
			'deal-dot': '.',
		}
		if ($(target).attr('class') == 'deal-20' || $(target).attr('class') == 'deal-50' || $(target).attr('class') == 'deal-100') {
			dealInput.val(count[$(this).attr('class')])
			changePrice(dealInput)
		} else if (isFirst) {
			dealInput.val(count[$(this).attr('class')])
			changePrice(dealInput)
			isFirst = false
		} else {
			dealInput.val(dealInput.val() + count[$(this).attr('class')])
			changePrice(dealInput)
		}
		
	})
	////////////监听数字点击，金额变化
	function changePrice (dealInput) {
		switch (dealInput.attr('class')){
			case 'dealMoney1': deal1(); break;
			case 'dealDiscount': deal2(); break;
			case 'deal-reality': deal3(); break;
		}
		return
	}
	///////////处理数据，只保留到小数点后两位
	function checkPrice (num) {
		num += ''
		if (num.indexOf('.') != -1) {
			var leng
			if (num.length - 2 >= num.indexOf('.')) {
				leng = num.indexOf('.')+2
			} else {
				leng = num.length
			}
			num = parseFloat(num.substr(0,leng))
		} else {
			num = parseFloat(num + '.00')
		}
		
		return num
	}
	
	/////////////////////改变加载iframe的页面初始状态
	function iframeLoad () {
		if ($('#vipIframe').attr('src').split('?')[1].substr(-1) == 0) {
			$(window.frames["vipIframe"].document).find("header").css('display', 'none')
			$(window.frames["vipIframe"].document).find('.pngfix').addClass('open')
			$(window.frames["vipIframe"].document).find('body').addClass('big-page')
			$(window.frames["vipIframe"].document).find('.Hui-article-box').css('top', 0)
			$(window.frames["vipIframe"].document).find('.Hui-aside').css('top', 0)
		}
		
	}
})