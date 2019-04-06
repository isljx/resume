jQuery.divselect = function(divselect) {
	$(divselect).click(function(){
		var _ul=$(this).children("ul");
		if(_ul.css("display")=="none"){
			$(".divselect ul").hide();
			_ul.slideDown("fast");
		}else {
			_ul.slideUp("fast");
		}
		return false;
	});
	$(divselect).find("ul li a").click(function(){
		var txt = $(this).text();
		$(this).parent().parent().siblings().html(txt);
		var value = $(this).attr("selectid");
		$(this).parent().parent().parent().next().val(value);
		$(this).parent().parent().hide();
		return false;
	});
	
	$(document).click(function(){
		$(".divselect ul").hide();
	});
   
};