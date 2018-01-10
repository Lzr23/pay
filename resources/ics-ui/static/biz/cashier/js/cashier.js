$(function () {
	showCartNum()
	navToggle()
	vipChoiceSearch()
	goodsToCart()
	cartDiscount()
	cartChangePrice()
	clearCart()
	iframeLoad()
	
	////////////////计算购物车总价
	function cartTotalPrice () {
		var totalPrice = 0
		for (var i = 0; i<$('.cart-goodsNum').length; i++) {
			totalPrice += parseInt($('.cart-goodsNum').eq(i).text()) * parseFloat($('.cart-goodsPrice').eq(i).text())
		}
		$('.cart-totalPrice').text(totalPrice.toFixed(2))
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
			var cartGoods = $('.cart-goods tr')
			
			for (var i = 1; i < cartGoods.length; i++) {  ////遍历购物车有没有该商品，有则数量加1，否则购物车添加新商品
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
							'<td class="cart-vipPrice">118</td>'+
							'<td><button class="left-delete">X</button></td>'+
							'</tr>')
			goodsNumSub(newGoods.find('.jiang'))
			goodsNumAdd(newGoods.find('.jia'))
			goodsDelete(newGoods.find('.left-delete'))
			cartSelect(newGoods)
			fly(newGoods.find('.jia'))
			$('.cart-goods').append(newGoods)
			$('.head-cart-num').text(parseInt($('.head-cart-num').text()) + 1)
			showCartNum()
			cartTotalPrice()
		})
	}
	
	/////////////////购物车商品数量加、减、删除功能
	function goodsNumSub (obj) {
		obj.click(function(event) {
			event = event || window.event
			event.stopPropagation()
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
		obj.click(function(event) {
			event = event || window.event
			event.stopPropagation()
			var num = parseInt($(this).siblings('.cart-goodsNum').text());
			$(this).siblings('.cart-goodsNum').text(num + 1)
			cartTotalPrice()
		})
	}
	
	function goodsDelete (obj) {
		obj.closest("td").click(function (event) {
			event = event || window.event
			event.stopPropagation()
			var num = parseInt(obj.closest('td').siblings().children('.cart-goodsNum').text())
			$('.head-cart-num').text(parseInt($('.head-cart-num').text()) - num)
			$(this).closest("tr").remove()
			showCartNum()
			cartTotalPrice()
		})
	}
	
	/////////////////////购物车选中商品
	function cartSelect (obj) {
		obj.click(function () {
			if ($(this).hasClass('cartSelect')) {
				$(this).removeClass('cartSelect')
			} else{
				$(this).siblings('tr').removeClass('cartSelect')
				$(this).addClass('cartSelect')
			}
		})
	}
	
	////////////////////购物车商品 折扣
	function cartDiscount () {
		var selectedGoods
		$('.zekou').click(function () {
			var goods = $('.cart-goods tr')
			for (var i = 1; i < goods.length; i++) { ////遍历购物车是否有选中的商品
				if (goods.eq(i).hasClass('cartSelect')) {
					selectedGoods = goods.eq(i)
					$('#discount').modal('show')
					return
				}
			}
			toastr.warning('请在购物车选中商品')
		})
		var oInput = $('#discountInput')
		numberInput(oInput)
		$('.discountConfirm').click(function () {
			var price = Number(parseFloat(selectedGoods.children('.cart-goodsPrice').text()).toFixed(2))
			var vipPrice = Number(parseFloat(selectedGoods.children('.cart-vipPrice').text()).toFixed(2))
			var discount = Number(parseFloat(oInput.val()).toFixed(2))
			var discounted = Number(price * (discount/10)).toFixed(2)
			if (discount > 10 || discount < 1) {
				toastr.warning('折扣必须在1-10之间')
			} else if (discounted < vipPrice) {
				toastr.warning('折扣后的价格不能低于会员单价')
			} else {
				selectedGoods.children('.cart-goodsPrice').text(discounted)
				cartTotalPrice()
				toastr.success('折扣成功')
			}
		})
	}
	
	/////////////////////购物车商品改价
	function cartChangePrice () {
		var selectedGoods
		$('.gaijia').click(function () {
			var goods = $('.cart-goods tr')
			for (var i = 1; i < goods.length; i++) { ////遍历购物车是否有选中的商品
				if (goods.eq(i).hasClass('cartSelect')) {
					selectedGoods = goods.eq(i)
					$('#changePrice').modal('show')
					return
				}
			}
			toastr.warning('请在购物车选中商品')
		})
		var oInput = $('#changePriceInput')
		numberInput(oInput)
		$('.changePriceConfirm').click(function () {
			var price = Number(parseFloat(selectedGoods.children('.cart-goodsPrice').text()).toFixed(2))
			var vipPrice = Number(parseFloat(selectedGoods.children('.cart-vipPrice').text()).toFixed(2))
			var changed = Number(parseFloat(oInput.val()).toFixed(2))
			if (changed < vipPrice) {
				toastr.warning('改价后的价格必须大于会员单价')
			} else {
				selectedGoods.children('.cart-goodsPrice').text(changed)
				cartTotalPrice()
				toastr.success('改价成功')
			}
		})
	}
	
	
	//////////////////////点击数字键盘输入
	function numberInput (oInput) {
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
	
	///////////////////////////////////////结账
	var dealInput  //结账弹框当前输入框对象
	var totalPrice //标记当前总金额
	
	var isFirst = true //标记是否需要重置input值
	$('.deal-section1 input').focus(function () {
		isFirst = true
	})
	$('.deal-close').click(function () {
		isFirst = true
	})
	
	//////////结账弹框初始化
	$('.jiezhang').click(function () {
		if ($('.cart-goodsNum').length <= 0) {  //判断购物车中是否有商品,有则结账，否则提示
			toastr.warning('购物车是空的~~')
		} else {
			$('#deal').modal('show')
			$('.dealMoney1')[0].focus()
			totalPrice = parseFloat($('.cart-totalPrice').text())
			$('.dealMoney1').val(totalPrice)
			$('.deal-reality').val(totalPrice)
			dealInput = $('.dealMoney1')
			
		}
	})
	
	///////////////////监听键盘输入，结账金额变化
	$('.dealMoney1').keyup(function () {
		deal1()
	})
	$('.dealDiscount').keyup(function () {
		deal2()
	})
	$('.deal-reality').keyup(function () {
		deal3()
	})
	
	////////////////////监听数字点击，金额变化
	function changePrice (dealInput) {
		switch (dealInput.attr('class')){
			case 'dealMoney1': deal1(); break;
			case 'dealDiscount': deal2(); break;
			case 'deal-reality': deal3(); break;
		}
		return
	}
	
	////////标记当前输入框
	$('.deal-section1 input').focus(function () {
		dealInput = $(this)
	})
	
	/////////第一种支付输入变化
	function deal1 () {
		if ($('.deal-reality').val() == '0.00') {  //实收为空时，收取购物车总价，否则收取实收的金额
			totalPrice = parseFloat($('.cart-totalPrice').text())
		} else {
			totalPrice = parseFloat($('.deal-reality').val())
		}
		var money1 = parseFloat($('.dealMoney1').val())
		if ($('.dealMoney1').val() != '') {  ////为空时和不为空时
			if (totalPrice >= money1) {
				$('.dealMoney2').text((totalPrice-money1).toFixed(2))
				$('.deal-change').text('0.00')
			} else {
				$('.dealMoney2').text('0.00')
				$('.deal-change').text((money1-totalPrice).toFixed(2))
			}
		} else {
			$('.dealMoney2').text((totalPrice).toFixed(2))
			$('.deal-change').text('0.00')
		}
	}
	//////////折扣变化
	function deal2 () {
		var discount = parseInt($('.dealDiscount').val())
		var newPrice = (totalPrice * discount) / 100
		if ($('.dealDiscount').val() != '') {
			$('.dealMoney1').val((newPrice).toFixed(2))
			$('.dealMoney2').text('0.00')
			$('.deal-change').text('0.00')
			$('.deal-reality').val((newPrice).toFixed(2))
		}
	}
	//////////实收变化
	function deal3 () {
		var reality = parseFloat($('.deal-reality').val())
		if ($('.deal-reality').val() != '') {
			var discount = (reality/totalPrice) * 100
			$('.dealDiscount').val((discount).toFixed(2))
			$('.dealMoney1').val((reality).toFixed(2))
		}
	}
	
	/////////选择员工
	$('.deal-staff-info').click(function () {
		$(this).siblings('li').children('i').removeClass('deal-staffSelected')
		$(this).children('i').addClass('deal-staffSelected')
	})
	
	///////////选择支付方式
	var payWayNum = 0 //标记当前选择的支付方式数量
	$('.dealPayWay li').click(function () {
		if ($('.dealPayWay .dealPayWay-group i').is('.dealPayWay-selected')) {  //是否为组合支付
			if ($(this).children('i').is('.dealPayWay-selected')) { //如果当前点击的支付方式已选中则取消选中，否则反之
				if ($(this).attr('class') == 'dealPayWay-group') {  //取消组合支付则初始化数量标记
					payWayNum = 0
					$('.dealPayWay li i').removeClass('dealPayWay-selected')
					$('.dealPayWay-cash i').addClass('dealPayWay-selected')
					$('.dealType1').text('现金')
				} else {  //取消选择的支付方式
					payWayNum -= 1
					if (payWayNum == 0) {  //如果没有选中的支付方式，则默认选择现金
						payWayNum = 1
						$(this).children('i').removeClass('dealPayWay-selected')
						$('.dealPayWay-cash').children('i').addClass('dealPayWay-selected')
						$('.dealType1').text('现金')
						return
					}
					$(this).children('i').removeClass('dealPayWay-selected')
					for (var i = 0; i < $('.dealPayWay li').length; i++) {    //遍历选中的支付方式
						if ($('.dealPayWay li i').eq(i).is('.dealPayWay-selected')) {
							changePayWay($('.dealPayWay li').eq(i), payWayNum)
							return
						}
					}
				}
			} else {  //添加支付方式，最多两种
				if (payWayNum < 2) {
					payWayNum += 1
					$(this).children('i').addClass('dealPayWay-selected')
					changePayWay($(this), payWayNum)
				} else {
					return
				}
			}
		} else {  //不是组合支付
			$(this).siblings('li').children('i').removeClass('dealPayWay-selected')
			$(this).children('i').addClass('dealPayWay-selected')
			changePayWay($(this), 1)
		}
	})
	
	////////改变支付方式显示
	function changePayWay (obj, num) {
		var payWay = {
			'dealPayWay-cash': '现金',
			'dealPayWay-card1': '储蓄卡',
			'dealPayWay-card2': '银行卡',
			'dealPayWay-zhifubao': '支付宝',
			'dealPayWay-weixin': '微信',
			'dealPayWay-youhui': '优惠券',
			'dealPayWay-code': '扫码支付',
		}
		if (num == 1) {
			$('.dealType1').text(payWay[obj.attr('class')])
			$('.dealType2').text('待收')
		} else if (num == 2) {
			$('.dealType2').text(payWay[obj.attr('class')])
		}
	}
	
	
	////////点击数字输入
	$('.deal-counter').on('click', function (event) {
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
			dealInput.val(count[$(target).attr('class')])
			changePrice(dealInput)
		} else if ($(target).attr('class') == 'deal-clear') {  ////清除
			dealInput.val('0.00')
			if (dealInput.attr('class') == 'dealMoney1') {
				deal1()
			}
			isFirst = true
		} else if ($(target).attr('class') == 'deal-remove') {  ////抹零
			if (dealInput.attr('class') == 'dealMoney1') {
				totalPrice = parseInt(dealInput.val())
				$('.deal-reality').val(parseInt(dealInput.val()))
			}
			dealInput.val(parseInt(dealInput.val()))
			
		} else if (isFirst) {
			dealInput.val(count[$(target).attr('class')])
			changePrice(dealInput)
			isFirst = false
		} else {
			dealInput.val(dealInput.val() + count[$(target).attr('class')])
			changePrice(dealInput)
		}
		
	})
	
	///////////////////商品导航栏切换
	function navToggle() {
		$(".classify li").click(function () {
			$(this).siblings().children().removeClass("current")
			$(this).children().addClass("current")
		})
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