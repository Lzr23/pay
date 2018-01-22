$(function () {
	///////删除产品规格
	$('.productSpec-delete').click(function () {
		var self = this
		layer.confirm('确认删除该规格？', function(index) {
			$(self).closest('tr').remove()
			layer.close(index)
		})
	})
	
	///////新增产品规格
	
	
	/////////////新增规格值
	function specValueAdd (obj) {
		obj.click(function () {
			var newValue = $(this).closest('div').clone()
			
		})
	}
})