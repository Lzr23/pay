$(function() {
	$('body').children('[dialog-url != undefined]').click(function() {
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
	}
})