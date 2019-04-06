// JavaScript Document

function controlpage($obj){
	var control = $obj.children().eq(1);
	var body = $obj.children().eq(0);
	var h=$obj.height();
	var time = 400;
	/*初始化对象*/

	var scrollFunc=function(e){
		var _index=control.children(".selected").index();
		var top = _index * h;
	    e=e || window.event;
	    var b;
	    if(e.wheelDelta){//IE/Opera/Chrome
	        e.wheelDelta>0?b=1:b=0
	    }else if(e.detail){//Firefox
	        e.detail?b=0:b=1
	    }

	    if(b){//上滚
	    	if(0-top+h<=0){
		    	body.animate({top:0-top+h},time);
		    	control.children().eq(_index).prev().addClass("selected").siblings().removeClass("selected");
	    	}
	    }else{//下滚
	    	if(0-top-h>0-h*control.children("").length){
		    	body.animate({top:0-top-h},time);
		    	control.children().eq(_index).next().addClass("selected").siblings().removeClass("selected");
	    	}
	    }

	}

	control.children().click(function(){
		var top = $(this).index()*h;
		body.animate({top:0-top},time);
		$(this).addClass("selected").siblings().removeClass("selected");

	})

	/*注册鼠标滚动事件*/
	if(document.addEventListener){
	    document.addEventListener('DOMMouseScroll',scrollFunc,false);
	}//Firefox
	document.onmousewheel=scrollFunc;//IE/Opera/Chrome
}

/*格式化百分比*/
Number.prototype.toPercent = function(){
	return (Math.round(this * 10000)/100).toFixed(2) + '%';
}

//人员占比
function manPercent($obj,data){
		var _this = $obj;
		var num = data;
		var ceilNum = Math.floor(num*10000);
		var manNum = Math.floor(num*10);
		_this.empty();
		 for(var i=0;i<manNum;i++){
		 	_this.append("<span class=\"man-a\"></span>");
		 }
		if(ceilNum%1000 != 0) {
			_this.append("<span class=\"man-h\"></span>");
			for(var i=0;i<10-manNum-1;i++){
				_this.append("<span class=\"man-e\"></span>");
			}
		}else{
			for(var i=0;i<10-manNum;i++){
				_this.append("<span class=\"man-e\"></span>");
			}
		}

}

//运营商混合占比
function marketPercent($obj,data){
	$obj.each(function(){
		var _this = $(this);
		_this.parent().addClass("manPercent")
		_this.empty();
		if(data.length>0){
			for(var i=0; i<data.length;i++){
				var _div = $("<div></div>");
				_div.addClass(data[i].name);
				_div.css("z-index",i)
				_this.append(_div);
				var _num=0;
				for(var j =i; j<data.length; j++){
					_num= _num+data[j].num
				}
				manPercent(_div,_num);
			}
		}

	})
}

//二项单选
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


//+---------------------------------------------------
 //| 把日期分割成数组
 //+---------------------------------------------------
Date.prototype.toArray = function(){
    var myDate = this;
    var myArray = Array();
    myArray[0] = myDate.getFullYear();
    myArray[1] = myDate.getMonth();
    myArray[2] = myDate.getDate();
    myArray[3] = myDate.getHours();
    myArray[4] = myDate.getMinutes();
    myArray[5] = myDate.getSeconds();
    return myArray;
 }

//+---------------------------------------------------
//| 取得当前日期所在周是一年中的第几周
//+---------------------------------------------------
Date.prototype.WeekNumOfYear = function()
{
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

//+---------------------------------------------------
//| 日期计算
//+---------------------------------------------------
Date.prototype.DateAdd = function(strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}


//+---------------------------------------------------
//| 取固定日期范围
//+---------------------------------------------------
Date.prototype.DatePart = function(interval)
{
    var myDate = this;
    var partStr='';
    var Week = ['日','一','二','三','四','五','六'];
    switch (interval)
    {
        case 'y' :partStr = myDate.getFullYear();break;
        case 'm' :partStr = myDate.getMonth()+1;break;
        case 'd' :partStr = myDate.getDate();break;
        case 'w' :partStr = Week[myDate.getDay()];break;
        case 'ww' :partStr = myDate.WeekNumOfYear();break;
        case 'h' :partStr = myDate.getHours();break;
        case 'n' :partStr = myDate.getMinutes();break;
        case 's' :partStr = myDate.getSeconds();break;
    }
    return partStr;
}

//+---------------------------------------------------
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
//+---------------------------------------------------
Date.prototype.Format = function(fmt)
{ //author: meizz
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

//+---------------------------------------------------
//| 时间条函数
//+---------------------------------------------------
function timeline($obj,opt){
	var myDate= {"年":{len:2,datatype:'y',datacss:'data-year'},"月":{len:6,datatype:'m',datacss:'data-month'},"周":{len:4,datatype:'w',datacss:'data-week'},"日":{len:10,datatype:'d',datacss:'data-day'}}

	var _control = $obj.children().eq(0).find(".timeline-control").children("");
	_control.empty();
	for(var i = 0; i<opt.length; i++){
		$("<li data=\""+myDate[opt[i]].datatype+"\">"+opt[i]+"</li>").appendTo(_control)
	}
	_control.children("").eq(0).addClass("selected");
	var _timeline = $obj.children().eq(1);
	var _unitNum = _timeline.children().eq(0).children();
	var _unitblock = _timeline.children().eq(1).children();
	var _uniW = _unitblock.width();
	var _unit;
	_unitNum.width(9999999);

	function getWeekFirst(data){
		return data.DateAdd("d",0-data.getDay()+1);
	}

	function getWeekLast(data){
		return data.DateAdd("d",6-data.getDay()+1);
	}

	var s={
		 getTimeLine:function (_datatype,_DW,_objclass,c_data){
			_unitNum.empty();
			_unitblock.empty();
			var rData;
			var _MW = _DW/2;
			var MDW = _uniW/(_DW+1);
			for(i=0;i<_MW; i++){
				var monthAll
				if(c_data){
					monthAll = new Date(Date.parse(c_data.replace(/-/g, "/"))).DateAdd(_datatype,i+1);
				}else{
				 	monthAll = new Date().DateAdd(_datatype,i+1);
				}

				var month = monthAll.DatePart("m");
				var year = monthAll.getFullYear();
				var day = monthAll.DatePart("d");
				if(_datatype=="y"){
					_unitNum.append("<li style=\"width:"+MDW+"px\" data=\""+year+"\/1\/1\" >"+year+"</li>");
				}else if(_datatype=="m"){
					_unitNum.append("<li style=\"width:"+MDW+"px\" data=\""+year+"\/"+month+"\/1\" >"+year+"."+month+"</li>");
				}else if(_datatype=="w"){
					monthAll = monthAll.DateAdd("d",-1);
					var d_f = getWeekFirst(monthAll);
					var d_l = getWeekLast(monthAll);
					_unitNum.append("<li style=\"width:"+MDW+"px\" data=\""+d_f.Format("yyyy\/M\/d")+"\" data-end=\""+d_l.Format("yyyy\/M\/d")+"\">"+d_f.Format("yyyy.M.d")+"-"+d_l.Format("yyyy.M.d")+"</li>");
				} else if( _datatype=="d"){
					_unitNum.append("<li style=\"width:"+MDW+"px\" data=\""+year+"\/"+month+"\/"+day+"\" >"+year+"."+month+"."+day+"</li>");
				}
			}


			for(var i=0;i<=_DW;i++){
				var monthAll
				if(c_data){
					monthAll = new Date(Date.parse(c_data.replace(/-/g, "/"))).DateAdd(_datatype,0-i);
				}else{
				 	monthAll = new Date().DateAdd(_datatype,0-i);
				}
				var month = monthAll.DatePart("m");
				var year = monthAll.getFullYear();
				var day = monthAll.DatePart("d");
				if(_datatype=="y"){
					_unitNum.prepend("<li style=\"width:"+MDW+"px\" data=\""+year+"\/1\/1\">"+year+"</li>");
				}else if(_datatype=="m"){
					_unitNum.prepend("<li style=\"width:"+MDW+"px\" data=\""+year+"\/"+month+"\/1\">"+year+"."+month+"</li>");
				}else if(_datatype=="w"){
					monthAll = monthAll.DateAdd("d",-1);
					var d_f = getWeekFirst(monthAll);
					var d_l = getWeekLast(monthAll);
					_unitNum.prepend("<li style=\"width:"+MDW+"px\" data=\""+d_f.Format("yyyy\/M\/d")+"\" data-end=\""+d_l.Format("yyyy\/M\/d")+"\">"+d_f.Format("yyyy.M.d")+"-"+d_l.Format("yyyy.M.d")+"</li>");
				} else if( _datatype=="d"){
					_unitNum.prepend("<li style=\"width:"+MDW+"px\" data=\""+year+"\/"+month+"\/"+day+"\">"+year+"."+month+"."+day+"</li>");
				}
			}
			for(var i=0; i<=_DW;i++){
				if(i==_MW){
					_unitblock.prepend("<li class=\"selected\" style=\"width:"+MDW+"px\"><b></b></li>")
				}else{
					_unitblock.prepend("<li style=\"width:"+MDW+"px\"><b></b></li>")
				}
			}

			_unitNum.css("right",MDW*_MW);
			_unitNum.attr("class","").addClass(_objclass);


			$("."+_objclass+">li").live('click',function(){
				if($(this).index()<=_MW){
					var _data = new Date(Date.parse(_unitNum.children().eq(0).attr("data").replace(/-/g, "/")));

					for(var i=0;i<_MW;i++){
						var monthAll = _data.DateAdd(_datatype,-1-i);
						var month = monthAll.DatePart("m");
						var day = monthAll.DatePart("d");
						var year = monthAll.getFullYear();
						if(_datatype=="y"){
							_unitNum.prepend("<li style=\"width:"+MDW+"px\" data=\""+year+"\/1\/1\">"+year+"</li>");
						}else if(_datatype=="m"){
							_unitNum.prepend("<li style=\"width:"+MDW+"px\" data=\""+year+"\/"+month+"\/1\">"+year+"."+month+"</li>");
						}else if(_datatype=="w"){
							monthAll = monthAll.DateAdd("d",-1);
							var d_f = getWeekFirst(monthAll);
							var d_l = getWeekLast(monthAll);
							_unitNum.prepend("<li style=\"width:"+MDW+"px\" data=\""+d_f.Format("yyyy\/M\/d")+"\" data-end=\""+d_l.Format("yyyy\/M\/d")+"\">"+d_f.Format("yyyy.M.d")+"-"+d_l.Format("yyyy.M.d")+"</li>");
						} else if( _datatype=="d"){
							_unitNum.prepend("<li style=\"width:"+MDW+"px\" data=\""+year+"\/"+month+"\/"+day+"\">"+year+"."+month+"."+day+"</li>");
						}
					}
					_unitNum.css("right",parseInt(_unitNum.css("right"))+_MW*MDW);
				}

				if($(this).index()>_DW){
					var _data = new Date(Date.parse(_unitNum.children().last().attr("data").replace(/-/g, "/")));

					for(var i=0;i<_MW;i++){
						var monthAll = _data.DateAdd(_datatype,i+1);
						var month = monthAll.DatePart("m");
						var day = monthAll.DatePart("d");
						var year = monthAll.getFullYear();
						if(_datatype=="y"){
							_unitNum.append("<li style=\"width:"+MDW+"px\" data=\""+year+"\/1\/1\">"+year+"</li>");
						}else if(_datatype=="m"){
							_unitNum.append("<li style=\"width:"+MDW+"px\" data=\""+year+"\/"+month+"\/1\">"+year+"."+month+"</li>");
						}else if(_datatype=="w"){
							monthAll = monthAll.DateAdd("d",-1);
							var d_f = getWeekFirst(monthAll);
							var d_l = getWeekLast(monthAll);
							_unitNum.append("<li style=\"width:"+MDW+"px\" data=\""+d_f.Format("yyyy\/M\/d")+"\" data-end=\""+d_l.Format("yyyy\/M\/d")+"\">"+d_f.Format("yyyy.M.d")+"-"+d_l.Format("yyyy.M.d")+"</li>");
						} else if( _datatype=="d"){
							_unitNum.append("<li style=\"width:"+MDW+"px\" data=\""+year+"\/"+month+"\/"+day+"\">"+year+"."+month+"."+day+"</li>");
						}
					}
					_unitNum.css("right",parseInt(_unitNum.css("right"))-_MW*MDW);
				}

				if(!$(this).hasClass("dis")){
					_unitNum.animate({"right":$(this).index()*MDW-MDW*_MW},200);
					 rData=new Date(Date.parse($(this).attr("data").replace(/-/g, "/")));

					 //TODO 回调动作
				}

			});
		},

		//三相选择动作控制
		threePhase:function(){
			var _ini = _control.children().eq(0).html();
			s.getTimeLine(myDate[_ini].datatype,myDate[_ini].len,myDate[_ini].datacss);

			_control.children().click(function(){
				$(this).addClass("selected").siblings().removeClass("selected");
				_unit = $(this).attr("data");
				_unitNum.empty();
				_unitblock.empty();
				var data_unit = $(this).html();
				s.getTimeLine(myDate[data_unit].datatype,myDate[data_unit].len,myDate[data_unit].datacss)
			});
		},

		//设置时间轴
		setTimeLine:function(_d,c_data){
			_control.children().each(function(){
				if(_d==$(this).html()){
					$(this).addClass("selected").siblings("").removeClass("selected");
					s.getTimeLine(myDate[_d].datatype,myDate[_d].len,myDate[_d].datacss,c_data);
				}
			});
			_control.children().click(function(){
				$(this).addClass("selected").siblings().removeClass("selected");
				_unit = $(this).attr("data");
				_unitNum.empty();
				_unitblock.empty();
				var data_unit = $(this).html();
				s.getTimeLine(myDate[data_unit].datatype,myDate[data_unit].len,myDate[data_unit].datacss,c_data)
			});
		}

	}
	return s

}

function tabsNew(obj) {
	obj.children('.tabs-label').children('li').children('a').click(function(e){
		e.preventDefault();
		var _index = $(this).parent('li').index();
		$(this).parent('li').addClass('active').siblings('li').removeClass('active');
		$(this).parents('.tabs-label').siblings('.tabs-content').children('div').eq(_index).show().siblings('div').hide();
	});
}



function tabs($obj){
	$obj.each(function(){
		var _item = $(this).children().eq(0).children("").children("");
		var _body = $(this).children().eq(1).children("").children("");
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

function contentTab($obj,$obj1){
	var _item = $obj.children("");
	var _body = $obj1.children("");
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
}


function showTips($obj){
	$obj.each( function(){
		var _this = $(this);
		var _icon = $(this).find("i");
		var _close =  $(this).find(".close");
		_icon.click(function(){
			_this.addClass("show");
		});
		_close.click(function(){
			_this.removeClass("show");
		})

	})

}