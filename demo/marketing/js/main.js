// JavaScript Document

//数据表切换
function radioCheck($obj){
	$obj.each(function(){
		var _this=$(this);
		_this.children().click(function(){
			if($(this).hasClass("dis")){
				return false
			}else{
			$(this).addClass("selected").siblings().removeClass("selected");
			}

		})
	})
}
