$(function(){
	var _lv =["省份","地市","县市","片区","乡镇"]; 
	var _pup = $(".area-pup");

	function getdata(){
		$.getJSON("data/FJ.json",function(data){
		if(data.resultObj&&data.level&&data.depth){
				_pup.empty();
				var _lv_end = parseInt(data.level)+parseInt(data.depth)
				for(var k = data.level; k<_lv_end; k++){
					_pup.append("<div><dt>"+_lv[k]+"：</dt></div>");
				}
				child("000",data.resultObj,0);
				_pup.find("dd").click(function(){
					var _this = $(this);
					var _code =  $(this).attr("data-code");
					_this.addClass("selected").siblings("").removeClass("selected");
					_this.parent().parent().next().show().find("dd").removeClass("selected");
					_this.parent().parent().next().show().nextAll().hide();
					$("#code"+_code).show().siblings("dl").hide();
				})
			}
		});
	}
	
	function child(codeid,data,lv){
		if(codeid&&data){
			var _ul = $("<dl id=\"code"+codeid+"\"></dl>");
			for(var i = 0; i<data.length; i++){
				_ul.append("<dd data-code=\""+data[i].home_code+"\">"+data[i].home_name+"</dd>");
				if(data[i].child){
					child(data[i].home_code,data[i].child,lv+1);
				}
			}
			_pup.children("").eq(lv).append(_ul);

		}
	}
	 getdata();
	$(".area").click(function(event){
		if($(".area-pup-box").css("display")=="none"){
			$(".area-pup-box").show();
		}else{
			if(event.target!=$(".area-pup-box")[0]){$(".area-pup-box").hide();}
			
		}
	});
	$(".area-pup-box .btn").click(function(){
		$(".area-pup-box").hide();
	})
})