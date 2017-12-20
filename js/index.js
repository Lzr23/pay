$(function(){
	function browserRedirect() {
	      var sUserAgent = navigator.userAgent.toLowerCase();
	      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	      var bIsAndroid = sUserAgent.match(/android/i) == "android";
	      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
	        console.log("phone");
	      } else {
	        console.log("pc");
	      }
	    }
	    browserRedirect()
	    numSub()
	    numAdd()
	    navToggle()
	/////////////////商品数量加减功能
	function numSub() {
		$(".jiang").click(function() {
			var num = parseInt($(this).siblings('.num').text())
			if (num == 1) {
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
})