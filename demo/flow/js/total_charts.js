;(function($){
	$.fn.totalChart = function(options) {    
    	// build main options before element iteration    
	    var opts = $.extend({}, $.fn.totalChart.defaults, options);

	    return this.each(function(){
	    	var _this = $(this);
	    	var _that = this;
	    	var _a = $("<div style=\"width:"+opts.width+"px; position:relative\" class=\"total-charts\"></div>");
	    	_this.empty();
	    	_this.append(_a);
	    	var _table = $("<table width=\"100%\"></table>");
	    	if(opts.chartData.data){
	    		var _data = opts.chartData.data;
	    		for(var i=0;i<_data.length;i++){
	    			//var  _surplus = parseFloat(_data[i].target)-parseFloat(_data[i].grandtotal);
	    			var _progress =Math.round(_data[i].grandtotal/_data[i].target*10000/100).toFixed(0);
	    			var _color = "",_bold="";
	    			if(_data[i].color){
	    				_color = " style=\"color:"+_data[i].color+"\" " 
	    			};
	    			if(_data[i].bold){
	    				_bold = " <strong>"+_data[i].name+"</strong> " 
	    			}else{
	    				_bold = _data[i].name
	    			};
	    			_table.append("<tr><td width=\"15\"><i>"+_data[i].rank+"</i></td><td "+_color+">"+_bold+"</td><td  "+_color+">- "+_progress+"%</td><td>"+_data[i].grandtotal+"W</td><td width=\"65%\"><div style=\"background-color:"+opts.chartData.targetColor+"\"><div style=\"background-color:"+opts.chartData.grandtotalColor+";width:"+_progress+"%\">&nbsp;</div></div></td><td>&nbsp;"+_data[i].target+"W</td></tr>");
	    		}
	    		_a.append(_table);
	    		var _tr = _table.find("tr").eq(0);
	    		var _pd= 0;
	    		for(var j= 0; j<4;j++){
	    			_pd =_pd+ _tr.children("td").eq(j).width();
	    		};
	    		var _left = _pd+parseFloat(_tr.children("td").eq(4).width()*opts.chartData.grandtotalDay);
	    		_line = $("<div style=\"position:absolute; height:100%; width:1px; border-left:1px solid #F00; top:0px; left:"+_left+"px\"></div>");
	    		_a.append(_line);
	    		
	    	}
	    	_this.append("<div class=\"charts-legend\"><span><span class=\"charts-legend-box\" style=\"background-color:"+opts.chartData.grandtotalColor+"\"></span>实际完成值</span><span><span class=\"charts-legend-box\" style=\"background-color:"+opts.chartData.targetColor+"\"></span>目标完成值</span><span><span class=\"charts-legend-box\" style=\"background-color:#f00\"></span>时间进度目标</span></div>");

	    });
	}

	 // 插件的defaults    
  	$.fn.totalChart.defaults = {
      "width":"529"
 	 };   
})(jQuery);