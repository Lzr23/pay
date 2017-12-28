$(function() {
	var isVipLabelShow = false //标识新增会员标签是否可见

	haveChecked()
	deleteConfirm()
	vipLoss()
	vipReset()
	
	isShowVipLabel()
	vipLabelAdd()

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

	////////重置密码等弹框前确认是否已经选中元素
	function haveChecked () {
		$(".vip-nav").click(function(event) {
			var modal = {
				vipNav3: '#VIPManage-reset',
				vipNav4: '#VIPManage-modify',
				vipNav7: '#VIPManage-loss',
				vipNav8: '#VIPManage-deleteMore',
				vipNav9: '#VIPManage-patch',
			}
			event = event || window.event;
			var target = event.srcElement || event.target;
			var targetClass = $(target).attr('class')
			if(targetClass == 'vipNav3' || targetClass == 'vipNav4' || targetClass == 'vipNav7' ||
				targetClass == 'vipNav8' || targetClass == 'vipNav9') {
				var myCheckbox = $('.vipManage-info .myCheckbox')
				for(var i = 0; i < myCheckbox.length; i++) {
					if(myCheckbox[i].checked == true) {
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
		$(".vipHandle-delete").click(function() {
			var self = this
			$(".delete-confirm").click(function() {
				$(self).closest('tr').remove()
			})
		})
	}

	////////会员挂失状态更改
	function vipLoss () {
		$('.loss-confirm').click(function() {
			var myCheckbox = $('.vipManage-info .myCheckbox')
			for(var i = 0; i < myCheckbox.length; i++) {
				if(myCheckbox[i].checked == true) {
					console.log(myCheckbox.eq(i).closest('td').next('td'))
					myCheckbox.eq(i).closest('td').next('td').append('<span style="color:red">(已挂失)</span>')
					myCheckbox.eq(i).attr('checked', 'false')
				}
				myCheckbox[i].checked = false
			}
		})
	}

	//////////会员重置密码
	function vipReset () {
		$('.reset-confirm').click(function() {
			var myCheckbox = $('.vipManage-info .myCheckbox')
			for(var i = 0; i < myCheckbox.length; i++) {
				myCheckbox[i].checked = false
			}
		})
	}

	//////////新增会员标签
	function isShowVipLabel () {  /////显示隐藏操作框
		$('.VIPLabelBt').click(function() {
			if(!isVipLabelShow) {
				$('.label-container').css('display', 'flex')
			} else {
				$('.label-container').css('display', 'none')
			}
			isVipLabelShow = !isVipLabelShow
		})
	}
	
	//////////添加标签
	function vipLabelAdd () {  //////切换新增标签和输入框
		$('.label-add').click(function() {
			$('.label-add span').css('display', 'none').siblings('input').css('display', 'inline-block')
			$('.label-add input').focus()
			
			document.querySelector('.label-add input').onkeyup = function(event) {  ///////添加标签到列表里
				event = event || window.event
				if(event.keyCode === 13) {
					var content = $(this).val()
					$(this).val('')
					$(this).css('display', 'none').siblings('span').css('display', 'inline-block')
					var oLi = $('<li><p>' + content + '</p><span>X</span></li>')
					$('.label-container ul').append(oLi)
					var top = parseInt($('.label-container').css('top'))
					$('.label-container').css('top', top - 20 + 'px')
					vipLabelChoice(oLi)
					showLabelDelete(oLi)
				}
			}
		})
	}

	//////////删除会员标签
	function showLabelDelete (oLi) {
		var oSpan = oLi.children('span')
		oSpan.click(function (event) {
			window.event ? window.event.cancelBubble = true : event.stopPropagation()
			$('#VIPManage-labelDelete').modal('show')
			document.querySelector('.labelDeleteConfirm').onclick = function () {
				oSpan.closest('li').remove()
				var top = parseInt($('.label-container').css('top'))
				console.log("asd")
				$('.label-container').css('top', top + 20 + 'px')
			}
		})
	}
	
	//////////选择会员标签
	function vipLabelChoice (oLi) {
		oLi.click(function() {
			console.log('p')
		})
	}
})