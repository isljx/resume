/*注册事件*/
$(function(){
    menu();//菜单栏
    iframes($('.tabs-iframe>ul>li'));//iframe切换
    close($('b.close'));//iframe关闭 
    open_newWork();//三级菜单链接点击事件
});

var i=0;
var nn=$(".tabs-iframe ul li").size();
var upnum=0;
$('.menu-list2 li').click(function(){
        blankclick();
        var _span = $(this).text();
        var _target = $('.tabs-iframe').children('ul');
        var c_target = $('ul.iframe');
        i=i+1;
        if(nn<6){
            nn=nn+1;
        var _html ='<li><span class="menu-tab"><span class="menu-tab-r"><span class="menu-tab-c menu-tab-c-r">'
                +_span
                +'</span></span></span><b class=\"close\"></b></li>' ; //新的tab标签
       
        var _cont =  '<li style="display:none;\" >'+
                     '<div class="iframe-div\">'+
                     '<iframe src=\"index'+i+'.html\" width="100%" height="100%" scrolling="auto" frameborder=0 ></iframe>'+
                     '</div></li>';//新的iframe内容
        
        var tabli = $(_html);
        _target.append(tabli);//将新的tab标签添加到.tabs-iframe的ul中
        c_target.append(_cont);//将新的iframe内容添加到.iframe中
        $('.iframe>li:last').show().siblings('li').hide();//页面切换
        $('.tabs-iframe>ul>li:last').addClass('active').siblings('li').removeClass('active');//tab标签样式添加
        $('.menu').children('.menu-content').slideUp();//菜单栏关闭        
        $(".updown").hide();
       iframes(tabli);//将新增加的li加入到iframe切换方法
       close(tabli.find('b.close'));//iframe关闭 
       return false;
        }
        else {
            if(upnum<9){
            var lastli=_target.find("li:last");
            var lastpage=c_target.find("li:eq(5)");
            var oldli="<li><span>"+lastli.text()+"</span><b class=\"close\"></b></li>";
            var oldpage="<li style=\"display:none;\" >"+lastpage.html()+"</li>";
            //var height=$(".updown").height();
            lastli.children().children().children().text(_span);
            $("ul.iframe").find("li").eq(5).find("iframe").attr("src","index"+i+".html");
            var tabli=$(oldli);
            $(".updown ul").append(tabli);
            c_target.append(oldpage);
            //$(".updown").height(height+25);
            $('.menu').children('.menu-content').slideUp();//菜单栏关闭 
            $(".updown").hide();
            $('.iframe>li:eq(5)').show().siblings('li').hide();//页面切换
            $('.tabs-iframe>ul>li:last').addClass('active').siblings('li').removeClass('active');//tab标签样式添加
            newiframes(tabli);//将新增加的li加入到iframe切换方法
            newclose(tabli.find('b.close'));//iframe关闭 
            upnum=upnum+1;
            return false;}
            else{
                $('.menu').children('.menu-content').slideUp(); 
                alert("超过最大菜单数量");}
        }
        
    });


$(".ext-iframe-btn").click(function(){
    blankclick();
    $(".updown").toggle();
    var size=$(".updown ul").find("li").size();
    if(size!=0){
    $(".ext-iframe-btn").toggleClass("active");
    $(".menu-content").slideUp();
    return false;}
})


/*菜单栏*/
function menu(){
	$('.menu').children('a').click(function(){
		$(this).siblings('.menu-content').slideToggle();         
	});
    /*二级菜单事件*/
    $('.menu-list1').find('a').on('mouseenter', function(){
        var _ul = $(this).siblings("ul.menu-list2");//二级菜单
            
        var cnt_h = $(".menu-content").outerHeight();//菜单栏高度        
		var _top = $(this).offset().top;//一级菜单链接距离顶部的高度       
        var h = $(this).parent().outerHeight(true);//该链接父节点li的高度                        
		var _height = _ul.outerHeight(true);//二级菜单的高度
              
        if(_top + h + _height > $(window).height()){
            var pb = $(this).parent().parent().css("padding-bottom").replace("px","");//padding-bottom的距离
            pb = parseInt(pb);
            var _t = h+pb - _height+2;//border-width=2px
            _ul.css({'top': _t});
            
            if($(this).offset().top + _height + h  > $(window).height() ){
                
                var _th = $(window).height() - $(this).offset().top -_height-0;
                _ul.css({'top': _th});
            }else{
                _ul.css({'top': _t});
            } 
            
        }else{
            _ul.css({'top': 0});
        }
    }); 

         
}


function newiframes(lis) {
	lis.click(function(){
		var _index = $(this).index()+$(".tabs-iframe>ul>li").size();
		var _new=$(this).text();
		var lastli=$(".tabs-iframe ul").find("li:last");
        var lastpage=$(".iframe").find("li").eq($(".tabs-iframe>ul>li").size()-1).find("iframe");
        var oldli=lastli.children().children().children().text();
        var newpage=$(".iframe").find("li").eq(_index).find("iframe");
        var temp=newpage;
        lastli.children().children().children().text(_new);
        $(this).find("span").text(oldli);
        $(".tabs-iframe ul").find("li:last").addClass("active").siblings().removeClass("active");
        //$('.iframe>li').eq(_index).show().siblings('li').hide();
        var alt=temp.prop('src');
        newpage.attr('src',lastpage.prop('src'));
        lastpage.attr('src',alt);
        $('.iframe>li').eq($(".tabs-iframe>ul>li").size()-1).show().siblings('li').hide();


	});
}


function newclose(closeBtns) {
    closeBtns.click(function(){
        var li = $(this).parents('li');
        var _index = li.index()+$(".tabs-iframe>ul>li").size(); 
        var _iframes = $('ul.iframe>li');      
        li.remove();//删除头部tab        
        _iframes.eq(_index).remove(); //删除iframe页 
        upnum=upnum-1;
    });
}





/*iframe切换*/
function iframes(lis) {
	lis.click(function(){
		var _index = $(this).index();        
		$(this).addClass('active').siblings().removeClass('active');
        $('.iframe>li').eq(_index).show().siblings('li').hide();
        $(".menu-content").slideUp();
	});
}

/*关闭页面*/
function close(closeBtns) {
	closeBtns.click(function(){
        var li = $(this).parents('li');
		var _index = li.index(); 
        var _iframes = $('ul.iframe>li');
        var tag=$(".tabs-iframe ul li").size();
        if(tag>6){
        var newli=$(".updown").find("ul li:first").text();
        var _html ='<li><span class="menu-tab"><span class="menu-tab-r"><span class="menu-tab-c menu-tab-c-r">'
                +newli
                +'</span></span></span><b class=\"close\"></b></li>' ;
        var newtab=$(_html);
        var newframe=$("ul.iframe>li").find("li:eq(6)");
        if(li.hasClass('active')&&li.index()!=5)//当前节点是选中页面
        {
            li.prev().addClass('active');//将active添加到前一个页面上
            _iframes.eq(_index-1).show();//显示前一个页面   
            li.remove();//删除头部tab    
            _iframes.eq(_index).remove(); //删除iframe页 
            $(".tabs-iframe>ul").append(newtab);
            $("ul.iframe>li").eq(4).insertAfter(newframe);
            $(".updown").find("li:first").remove();
            newframe.remove();
            iframes(newtab);
            close(newtab.find('b.close'));        
        }
            else{
            li.remove();//删除头部tab    
            _iframes.eq(_index).remove(); //删除iframe页 
            $(".tabs-iframe>ul").append(newtab);
            $("ul.iframe>li").eq(4).insertAfter(newframe);
            $(".updown").find("li:first").remove();
            newframe.remove();
            iframes(newtab);
            close(newtab.find('b.close'));
            $(".tabs-iframe>ul>li:last").addClass("active").siblings().removeClass("active");
            $("ul.iframe>li:eq(5)").show();
            }
        }
        else{

        if(li.hasClass('active'))//当前节点是选中页面
        {
            li.prev().addClass('active');//将active添加到前一个页面上
            _iframes.eq(_index-1).show();//显示前一个页面           
        }
        li.remove();//删除头部tab        
        _iframes.eq(_index).remove(); //删除iframe页
        nn=nn-1; 

       }
	});
}



/*function close(closeBtns) {
    closeBtns.click(function(){
        var li = $(this).parents('li');
        var _index = li.index(); 
        var _iframes = $('ul.iframe>li');
        var a_index;
        if(li.hasClass('active'))//当前节点是选中页面
        {
            li.prev().addClass('active');//将active添加到前一个页面上
            _iframes.eq(_index-1).show();//显示前一个页面           
        }
            li.remove();//删除头部tab        
            _iframes.eq(_index).remove(); //删除iframe页 
       nn=nn-1;
    });
}*/


function blankclick(){
    $(document).click(function(){
      $(".ext-iframe-btn").removeClass("active");
      $(".updown").hide();
    })
}

