// JavaScript Document
$(function(){
	//手风琴效果
		$("div.accrodion_format>div.accrodion-tab").click(function(e) {
			var obj = $(this).next();
			var index = $(this).index();
			var obj_i = $(this).children("i");
			if(obj.css("display") == "none"){
				if(index == 2 || index == 4){
						obj_i.removeClass("icon-cate").addClass("icon-cate_2");
				}else if(index == 6){
					obj_i.removeClass("icon-cate_last").addClass("icon-cate_last_2");
				}else{
							obj_i.removeClass("icon-cate_first").addClass("icon-cate_first_2");
						}
				
				obj.slideDown("fast");
				if(obj.hasClass("slick-format")){
					$('.slick').slick({
						slidesToShow: 5,
						slidesToScroll: 5,
						arrows: false,
						dots: true
					});	
				}
				//obj.show();
				obj.siblings(".accrodion-content").hide();
				var tabSib = $(this).siblings(".accrodion-tab");
				$(this).addClass("selected");
				var tabi = $(this).siblings(".accrodion-tab.selected").children("i");
				var tabi_index = $(this).siblings(".accrodion-tab.selected").index();
				//sildeTimeOut(tabi,tabi_index);
				//setTimeout(sildeTimeOut(tabi,tabi_index),200);
				setTimeout(function(){
						if(tabi_index == 2 || tabi_index == 4){
							tabi.addClass("icon-cate").removeClass("icon-cate_2");
						}else if(tabi_index == 6){
							tabi.addClass("icon-cate_last").removeClass("icon-cate_last_2");
						}else{
							tabi.addClass("icon-cate_first").removeClass("icon-cate_first_2");
						}
					},200);
				tabSib.removeClass("selected");
				
				
			}else{
				
            	obj.slideUp("fast");
				/*setTimeout(sildeTimeOut(obj_i,index),200);*/
				$(this).removeClass("selected");
				
				var t = setTimeout(function(){
						if(index == 2 || index == 4){
							obj_i.addClass("icon-cate").removeClass("icon-cate_2");
						}else if(index == 6){
							obj_i.addClass("icon-cate_last").removeClass("icon-cate_last_2");
						}else{
							obj_i.addClass("icon-cate_first").removeClass("icon-cate_first_2");
						}
					},200);
					
					
				
			}
			
        });
		
		
		//表格点击颜色变换效果
		$('.common-table').find('td').parent('tr').click(function(){
	        $(this).addClass('active').siblings('tr').removeClass('active');
                $('.common-table').find('tr:eq(0)').removeClass('nobottom');
                  })
                 $('.common-table').find('tr:eq(1)').click(function(){
                 $(this).addClass('active').siblings('tr').removeClass('active');
                $('.common-table').find('tr:eq(0)').addClass('nobottom');
                 })
                 $('.common-table').find('tr:eq(1)').hover(function(){
                  $(this).addClass('hover');
                   $('.common-table').find('tr:eq(0)').addClass('borderhover');
                   },function(){
                   $(this).removeClass('hover');
                 $('.common-table').find('tr:eq(0)').removeClass('borderhover');
                   })


		//单元格背景色
		$('.common-table tr:even').addClass("bg");
		$('.common-table2 tr').each(function() {
		  $(this).find('td:eq(0)').addClass('td-gray');
		});
		
		//初始化下拉框控件
		$.divselect(".divselect");
		
		
	})
	//tab切换
	function cate_tabs(obj){
		var tabs = obj.children().eq(0).children("a");
		var tab_content = obj.children().eq(1).children("div");
		tabs.click(function(){
			var _index = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('.index-left').children('div').eq(_index).show().siblings('div').hide();
			tab_content.eq(_index).addClass("selected").siblings('div').removeClass("selected");
		});	
	}
var saveType;
var cateName;
function openShade(dialog_sep,cate_name,save_state){
	saveType = save_state;
	cateName = cate_name;
		$(".shade_div").show();
		var _obj=$(".pop_frame");

		if(dialog_sep == 2){
			_obj=$(".set-action-box");
		}else if(dialog_sep ==3){
			_obj=$(".complex-box");	
		}
		$(_obj).show();
		
		//进入遮罩层隐藏
		$(".shade_div").click(function(){
			_obj.hide();
			$(this).hide();
		
		});
		
}
function closeShade(dialog_sep){
		//进入遮罩层隐藏
		var _obj=$(".pop_frame");
		if(dialog_sep == 2){
			_obj=$(".set-action-box");
		}else if(dialog_sep == 3){
			_obj=$(".complex-box");	
		}
		_obj.hide();
		$(".shade_div").hide();
}
	
/*获取父页面对象*/
function getFrameDom(){
	return $("#markFrame");	
}	
	/* 一个弹出框*/

function jsHoverForone(obj,dialog_sep,cate_name,save_state){
		window.parent.openShade(dialog_sep,cate_name,save_state);
  }
/*关闭弹出框*/
function closeDialog(dialog_sep){
		window.parent.closeShade(dialog_sep);
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

/*手风琴菜单收回时*/
function sildeTimeOut(obj_i,index){
	if(index == 2 || index == 4){
					obj_i.addClass("icon-cate").removeClass("icon-cate_2");
				}else if(index == 6){
					obj_i.addClass("icon-cate_last").removeClass("icon-cate_last_2");
				}else{
					obj_i.addClass("icon-cate_first").removeClass("icon-cate_first_2");
				}
}
/*控制单元格字符数*/
function control_word(obj){
	obj.each(function(index) {
        var text = this.innerHTML;
		var comLeng = 25;
		if(text.length > comLeng){
			this.innerHTML = text.substring(0,comLeng )+"...";	
		}
    });
		
}
function tabs($obj){
	$obj.each(function(){
		var _item = $(this).children().eq(0).children("ul").children("");
		var _body = $(this).children().eq(1).children("ul").children("");
		_item.each(function(){
			if($(this).hasClass("selected")){
				var _index = $(this).index();
				_body.eq(_index).show().siblings("").hide();
			}
		});
		_item.click(function(){
			var _index = $(this).index();
			$(this).addClass("selected").siblings("").removeClass("selected");
			_body.eq(_index).show().siblings("").hide();
		})
	})
}
//高级规则复选框选择
function checkComplex($obj){
	var check_tr = $obj.children().children().children();	
	check_tr.each(function(){
		var check_box = $(this).children().eq(0).children();
		var check_area = $(this).children().eq(1).children();
		if(check_box.attr("checked") == "checked"){
			check_area.addClass("selected");	
		}	
		check_box.click(function() {
            if(check_area.hasClass("selected")){
				
				check_area.removeClass("selected");	
			}else{
				check_area.addClass("selected");
			}
        });
	});
}