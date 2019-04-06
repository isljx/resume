/*注册事件*/
$(function(){
	
	var control = $(".toggle-icon");
	var body = $(".toggle-list>ul");
	var w = $(control).width();
	var num;
	var time = 400;
	//初始化对象 

	var scrollFunc=function(e){ 
		var _index=$(control).children(".selected").index();
		num = _index;
		var left = _index * w;
	    e=e || window.event; 
		
	    var b;
	    if(e.wheelDelta){//IE/Opera/Chrome 
	        e.wheelDelta>0?b=1:b=0
	    }else if(e.detail){//Firefox 
	        e.detail?b=0:b=1
	    } 

	    if(b){//上滚
		  if(num>0){
		  num--;
		  var aa = 0-left+w;
	    	if(aa<=0){
		    	body.animate({left:-1000*num},time);
		    	control.children().eq(_index).prev().addClass("selected").siblings().removeClass("selected");
	    	}}
	    }else{//下滚
		   if(num<3){
		   num++;
		   var s = 0-left-w;
		   var ss = 0-w*$(control).children().length;
	    	if(s>ss){
		    	body.animate({left:-1000*num},time);
		    	control.children().eq(_index).next().addClass("selected").siblings().removeClass("selected");
	    	}}
	    }

	} 

	//注册鼠标滚动事件
	if(document.addEventListener){ 
	    document.addEventListener('DOMMouseScroll',scrollFunc,false); 
	}//Firefox 
	document.onmousewheel=scrollFunc;//IE/Opera/Chrome   
    
	
    /*箭头切换列表*/
	
	var flag = true;
	$('.arrow-left').click(function(){
	  if(flag == true){
	  flag = false;
	  var t = $('div.toggle-list>ul');
	  var posit = t.position().left;
	  //alert(posit);
	  if(posit<=-1000){
		  var inde = $(".toggle-icon span.selected").index();
		  var new_posit = posit+1000;
		  $(t).animate({left: new_posit},"normal",function(){flag=true});
	      $(".toggle-icon span").eq(inde-1).addClass('selected').siblings('span').removeClass('selected');
		  }
	   else{
		$(t).css("left","-3000px");
		$(".toggle-icon span").eq(3).addClass('selected').siblings('span').removeClass('selected');
		flag=true }}
	 	})
	
	$('.arrow-right').click(function(){
	  if(flag == true){
	  flag = false;
	  var t = $('div.toggle-list>ul');
	  var posit = t.position().left;
	  //alert(posit);
	  if(posit>=-2000){
		  var inde = $(".toggle-icon span.selected").index();
		  var new_posit = posit-1000;
		  $(t).animate({left: new_posit},"normal",function(){flag=true});
	      $(".toggle-icon span").eq(inde+1).addClass('selected').siblings('span').removeClass('selected');
		  }
		else{
	 	$(t).css("left","0px");
		$(".toggle-icon span").eq(0).addClass('selected').siblings('span').removeClass('selected');
		flag=true }}
	})
 
    /*小圆点切换列表*/
	$('.toggle-icon span').mouseover(function(){
  	
	var inde = $(this).index();
	var t = $('div.toggle-list>ul');
	if(inde == 0){
	  $(t).animate({left: "0"},"normal");
	  $(this).addClass('selected').siblings('span').removeClass('selected');}
	if(inde == 1){
	  $(t).animate({left: "-1000"},"normal");
	  $(this).addClass('selected').siblings('span').removeClass('selected');}
	if(inde == 2){
	  $(t).animate({left: "-2000"},"normal");
	  $(this).addClass('selected').siblings('span').removeClass('selected');}
	if(inde == 3){
	$(t).animate({left: "-3000"},"normal");
	$(this).addClass('selected').siblings('span').removeClass('selected');}
	 	
	})
	
	//立即体验
	$(".part-b input").click(function(){
		
	  var p = window.parent.document.getElementById("pop");
	  var s = window.parent.document.getElementById("shade");
	  $(p).hide();
	  $(s).hide();
	})
    
	//页面加载窗口事件
	var width = $(window).width();
		if(width<1280){
			$(".arrow-left,.arrow-right").addClass("arrow-common");}
		else{
			$(".arrow-left,.arrow-right").removeClass("arrow-common");}
	
	//窗口改变事件
	$(window).resize(function(){
		
		var width = $(this).width();
		if(width<1280){
			$(".arrow-left,.arrow-right").addClass("arrow-common");}
		else{
			$(".arrow-left,.arrow-right").removeClass("arrow-common");}
		})
	
 })   
