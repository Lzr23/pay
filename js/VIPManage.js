$(function () {
	deleteConfirm()
	
	////////确认删除会员
	function deleteConfirm () {
		$(".vipHandle-delete").click(function () {
			var self = this
			$(".confirm").click(function () {
				$(self).closest('tr').remove()
			})
		})
	}
})