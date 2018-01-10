$(function() {
	$('body').find('[dialog-url != undefined]').click(function() {
		var url = $(this).attr('dialog-url')
		var id = $(this).attr('dialog-id')
		var title = $(this).attr('dialog-title')
		var width = $(this).attr('dialog-width')
		var height = $(this).attr('dialog-height')
		var top = $(this).attr('dialog-top')

		$(this).showDialog(url, id, title, width, height, top)
	})
})

///////////////显示弹出框
$.fn.extend({
	showDialog: function (url, id, title, width, height, top) {
		title = title || '会话弹框'
		top = top || 0

		if (url != undefined && url != '') {
			$.ajax({
				type: "get",
				url: url,
				success: function(html) {
					var content = $(html).siblings('div')
					if (content.hasClass('modal')) {  //判断请求到的内容是否为弹出框,是则更改id后添加到页面中，否则新建
						console.log($('#' + id))
						if ($('#' + id)[0] == undefined) {  //判断是否已经添加该模态框，没有则添加，否则显示
							var htmlId = content.attr('id')
							$('body').append(html)
							$('#' + htmlId).css({
								'top': top,
								'width': width,
								'height': height
							})
							$('#' + htmlId).attr('id', id)
						}
						$("#" + id).modal("show")
					} else {
						if ($('#' + id)[0] == undefined) {
							var dialog = $('<div style="top: ' + top + 'px" class="modal fade" id="' + id + '" tabindex="-1" role="dialog" aria-labelledby="' + id + '">' +
								'<div class="modal-dialog " role="document">' +
								'<div class="modal-content">' +
								'<div class="modal-header vip-tital">' +
								'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span id="closeDialog" aria-hidden="true">&times;</span></button>' +
								'<h4 class="modal-title">' + title + '</h4>' +
								'</div>' +
								'<div class="modal-body" style="height:' + height + 'px;width:' + width + 'px">' +
								'</div>' +
								'</div>' +
								'</div>' +
								'</div>')

							$('body').append(dialog)
							$("#" + id + " .modal-body").append(html)
						}
						$("#" + id).modal("show")
					}

				}
			});
		}
	},
	
	//////////////复选框全选功能
	SelectAll: function () {
		var oInput = document.querySelectorAll($(this).selector + ' .myCheckbox')
		for (var i = 1; i < oInput.length; i++) {
				oInput[i].onclick = function () {
					for (var i = 1; i< oInput.length; i++) {
						if (oInput[i].checked == false) {
							$('.vipSelectAll').removeAttr('checked')
							return
						}
					}
					$('.vipSelectAll').prop('checked', true)
				}
		}
		
		document.querySelector('.vipSelectAll').onclick = function () {
			for (var i = 1; i < oInput.length; i++) {
				oInput[i].checked = $(this).prop('checked') 
			}
		}
	},
	
	///////////////////表单验证
	testForm: function () {
		  $($(this).selector).validate({
		    rules: {
		      firstname: "required",
		      lastname: "required",
		      username: {
		        required: true,
		        minlength: 2
		      },
		      card: {
		      	required: true,
		      	minlength: 3
		      },
		      password: {
		        required: false,
		        minlength: 5
		      },
		      tel: {
		      	required: true,
		      	digits:true,
		      	rangelength:[5,11]
		      },
		      confirm_password: {
		        required: true,
		        minlength: 5,
		        equalTo: "#password"
		      },
		      email: {
		        required: true,
		        email: true
		      },
		      topic: {
		        required: "#newsletter:checked",
		        minlength: 2
		      },
		      agree: "required"
		    },
		    messages: {
		      firstname: "请输入您的名字",
		      lastname: "请输入您的姓氏",
		      username: {
		        required: "请输入用户名",
		        minlength: "用户名必需由两个以上字符组成"
		      },
		      card: {
		      	required: '请输入卡号',
		      	minlength: "卡号必需由三个以上字符组成"
		      },
		      tel: {
		      	required: '请输入电话号码',
		      	digits: '请输入数字',
		      	rangelength: "号码长度在5到11之间"
		      },
		      password: {
		        required: "请输入密码",
		        minlength: "密码长度不能小于 5 个字母"
		      },
		      confirm_password: {
		        required: "请输入密码",
		        minlength: "密码长度不能小于 5 个字母",
		        equalTo: "两次密码输入不一致"
		      },
		      email: "请输入一个正确的邮箱",
		      agree: "请接受我们的声明",
		      topic: "请选择两个主题"
		     }
		    })
		$($(this).selector).submit(function () {
			event = event || window.event
//			event.preventDefault()
		})
//		$.validator.setDefaults({
//		    submitHandler: function(form) {
////		    	form.submit()
//				
//		    	toastr.success("提交成功");
//		    }
//		})
	}
})