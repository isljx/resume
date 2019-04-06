// JavaScript Document
function tabs($obj, resize,fn) {
    $obj.each(function () {
        var tabitems = $(this).children().eq(0);
        var tabbodys = $(this).children().eq(1);
        var oitem = tabitems.children("ul").children("li");
        var obody = tabbodys.children("ul").children("li");
        var litems = oitem.length;

        if (resize) {
            var witems = tabitems.width();
            tabitems.children("ul").width(witems);
            var woitem = Math.floor(witems / litems) - 1;
            oitem.width(woitem);
            oitem.eq(0).width(witems - (woitem + 1) * litems + woitem);
        }
        oitem.each(function () {
            var _index = $(this).index();
            if ($(this).hasClass("selected")) {
                obody.eq(_index).show().siblings("li").hide();

            }
            $(this).click(function () {
                $(this).addClass("selected").siblings("li").removeClass("selected");
                obody.eq(_index).show().siblings("li").hide();
                fn();
                
            })
        });
        

    })
}

function changeImgTable($obj) {
    $obj.children("h1").children("div.right").find("a.bg").click(function () {
        $(this).addClass("display-none");
        $(this).siblings(".tb").removeClass("display-none");
        $obj.children("div").children("div.tableDiv").removeClass("display-none");
        $obj.children("div").children("div.ImgListBlock").addClass("display-none");
    });

    $obj.children("h1").children("div.right").find("a.tb").click(function () {
        $(this).addClass("display-none");
        $(this).siblings(".bg").removeClass("display-none");
        $obj.children("div").children("div.tableDiv").addClass("display-none");
        $obj.children("div").children("div.ImgListBlock").removeClass("display-none");
    });
}

function changeImgTable1($obj) {
    $obj.children("a.tb").click(function () {
        $(this).addClass("display-none");
        $(this).siblings(".bg").removeClass("display-none");
        $obj.siblings("div.imgList").children("div.imgDiv").removeClass("display-none");
        $obj.siblings("div.imgList").children("table").addClass("display-none");
    });

    $obj.children("a.bg").click(function () {
        $(this).addClass("display-none");
        $(this).siblings(".tb").removeClass("display-none");
        $obj.siblings("div.imgList").children("div.imgDiv").addClass("display-none");
        $obj.siblings("div.imgList").children("table").removeClass("display-none");
    });
}

//指标说明定位
var timer;

function hideTState($obj) {
    timer = setTimeout(function () { $obj.hide(); }, 2000);
}

function targetState($obj) {
    $obj.children("h1").children("div.right").find("a.zs").click(function () {
        var left = $(this).offset().left;
        var _width = $obj.children("div").children("div.targetState").width();
        $obj.children("div").children("div.targetState").css("left", left - _width);
        $obj.children("div").children("div.targetState").show();
    });

    $obj.children("div").children("div.targetState").children("h2").children("span.s-r").click(function () {
         $obj.children("div").children("div.targetState").hide();
    });
}

function hideTState1($obj) {
    $obj.children("h2").children("span.s-r").find("img").click(function () {
        $obj.hide();
    });
}


/** 色块鼠标经过 **/
function colorHover($obj){
	$obj.hover(
	  function(){
		  $(this).addClass("hover");
	  },
	  function(){
		  $(this).removeClass("hover");
	  }
	);
};

/*KPI页小表格左右滚动*/
function scroLR(){
	var mw = $(".center-page dl dd").outerWidth();
	
	var max = $(".center-page dl dd").length;
	
	$(".right_arr").addClass("hover");
	$(".center-page dl").width(mw*max/2);
	var mw2 = $(".center-page dl dd").width(mw*max/16);
	var left = 0;
	var timer = 0;
	$(".left_arr").click(function(){
		if(timer<1){
			left = left - mw*4;
			$(".center-page dl").animate({"left":left},400);
			timer++;
			$(".right_arr").removeClass("hover");
			if(timer==1){
			    $(this).addClass("hover");
			}
		}	
	});
	$(".right_arr").click(function(){
		if(timer>0){
			left = left + mw*4;
			$(".center-page dl").animate({"left":left},400);
			timer--;
			$(".left_arr").removeClass("hover");
			if(timer == 0)
			{
				$(this).addClass("hover");
			}
		}
	});
	
}

