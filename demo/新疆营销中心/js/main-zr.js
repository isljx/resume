// JavaScript Document
$(function(){
	$.divselect(".divselect");
	jsHoverForone()
});
/* 一个弹出框*/

function jsHoverForone(){

    $(".btn").click(function(){

		$(".shade_div").show();
		
		var _obj=$(".pop_frame").css("z-index","1005");
		$(_obj).show();
		

		//进入遮罩层隐藏
		$(".shade_div,.icon-close").click(function(){
			_obj.hide();
			$(".shade_div").hide();
		});
		
		
	});
  }
/* 多个弹出框*/
function jsHoverFormore(){

	$(".div1,.div2,.div3,").click(function(){

		$(".shade_div").show();

		var cwidth=$(this).width()*1.3;
		var cheight=$(this).height()*1.3;

		var top=$(this).position().top;
		var left=$(this).position().left;
		var cleft=0;
		var ctop=0;

		switch(this.className){
		   case "div1":
		   	 ctop=top-$(this).height()*0.3/2;
		   	 cleft=left;
		   break;
		   case "div2":
		     ctop=top-$(this).height()*0.3/2;
		   	 cleft=left-$(this).width()*0.3/2;
		   break;
		   case "div3":
		     ctop=top-$(this).height()*0.3/2;
		   	 cleft=left-$(this).width()*0.3;
		   break;
		}

		var _obj=$(this).clone().appendTo(".main").css({position:"absolute",top:ctop+"px",left:cleft+"px",width:cwidth+"px",height:cheight+"px","z-index":"1003"});
		var _dataBox=_obj.find(".data_box");
		_dataBox.addClass("bg_earth");
		var dheight=_dataBox.height()*1.3;
		_dataBox.css("height",dheight+"px");

		//进入遮罩层隐藏
		$(".shade_div").click(function(){
			_dataBox.parent().remove();
			$(this).hide();
		});

	});
}