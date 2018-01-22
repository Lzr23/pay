$(function () {
	/////////选项卡
	$("#productManageTab").Huitab({
		index:0
	});
	
	////调用分页器初始化方法
	var totalPage = parseInt($(".total-pages span").text())
	$('#box').paging({
		initPageNo: 1, // 初始页码
		totalPages: totalPage, //总页数
		totalCount: '', // 条目总数
		slideSpeed: 600, // 缓动速度。单位毫秒 
		callback: function(page) { // 回调函数 
		}
	})
	
	////////删除会员
	$(".vipHandle-delete").click(function() {
		var self = this
		layer.confirm('删除商品将删除掉该商品所有信息，确定删除吗？', function(index){
			$(self).closest('tr').remove()
			layer.close(index);
		})
	})
	
	//////////////产品导入
	$('#import').click(function() {
		layer.confirm('确定导入？', function(index){
			layer.close(index);
		})
	})
	
	
	//////////////产品导出
	$('#export').click(function() {
		layer.confirm('确定导出？', function(index){
			layer.close(index);
		})
	})
	
	//////////////产品上、下架
	$('#productOff').click(function () {
		var myCheckbox = $('#productInfo .myCheckbox')
		for (var i = 1; i < myCheckbox.length; i++) {
			if(myCheckbox[i].checked == true) {
				layer.confirm('确认下架所有选中产品吗？', function(index){
					for(var i = 0; i < myCheckbox.length; i++) {
						if(myCheckbox[i].checked == true) {
							console.log(myCheckbox.eq(i).closest('td').next('td'))
							myCheckbox.eq(i).closest('td').next('td').append('<span style="color:red">(已下架)</span>')
							myCheckbox.eq(i).attr('checked', 'false')
						}
						myCheckbox[i].checked = false
						layer.close(index);
					}
				})
				return
			}
		}
		layer.alert('请选中产品')
	})
})
