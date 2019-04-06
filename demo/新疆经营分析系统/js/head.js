/*注册事件*/
$(function(){
    menu();//菜单栏
    iframes($('.tabs-iframe>ul>li'));//iframe切换
    close($('b.close'));//iframe关闭 
    open_newWork();//三级菜单链接点击事件
});


/*菜单栏*/
function menu(){
	$('.menu').children('a').click(function(){
		$(this).siblings('.menu-content').slideToggle();         
	});
    /*二级菜单事件*/
    /*$('.menu-list1').find('a').click(function(){*/
    $('.menu-list1').find('a').on('mouseenter', function(){
        //$(".menu-list2").hide();
           
        var _ul = $(this).siblings("ul.menu-list2");//二级菜单
        /*_ul.show();    */
        var cnt_h = $(".menu-content").outerHeight();//菜单栏高度        
		var _top = $(this).offset().top;//一级菜单链接距离顶部的高度       
        var h = $(this).parent().outerHeight(true);//该链接父节点li的高度                        
		var _height = _ul.outerHeight(true);//二级菜单的高度
        var windH = $(window).height();//浏览器高度
              
        if(_top + h + _height > windH){
            var pb = $(this).parent().parent().css("padding-bottom").replace("px","");//padding-bottom的距离
            pb = parseInt(pb);
            var _t = h+pb - _height+2;//border-width=2px
            _ul.css({'top': _t});
            
            if(_top + _height + h  > $(window).height() ){
                
                var _th = $(window).height() - $(this).offset().top -_height-21;
                _ul.css({'top': _th});
            }else{
                _ul.css({'top': _t});
            } 
            
        }else{
            _ul.css({'top': -21});
        }
    }); 
    /*三级菜单事件*/
    /*$('.menu-list2').find('a').click(function(){*/
    $('.menu-list2').find('a').on('mouseenter', function(){
        /*设置三级菜单宽度*/
        var _index = $(this).siblings('.menu-out').children('ul').length;
        if(_index >0){
            var _width = _index * 165 - 15;//ul的宽度为150margin-right：15，最后一列没有margin-right：15，故减去15
            $(this).siblings('.menu-out').css('min-width',_width);
        }
        
        var _ul = $(this).siblings("div.menu-out");//三级菜单 
        /*_ul.show(); */ 
        var cnt_h = $(".menu-content").outerHeight();        
		var _top = $(this).offset().top;//一级菜单链接距离顶部的高度
        var h = $(this).parent().outerHeight(true);//该链接父节点li的高度                
		var _height = _ul.outerHeight(true);//三级菜单的高度
        var windH = $(window).height();//浏览器高度
        var _t;
        if(_top + h + _height > windH){
            var pb = $(this).parent().parent().css("padding-bottom").replace("px","");//padding-bottom的距离
            pb = parseInt(pb);
            _t = h+pb - _height+2;//border-width=2px
          
            if(_top + _height + h > $(window).height() ){
                
                var _th = $(window).height() - $(this).offset().top -_height-21;
                _ul.css({'top': _th});
            }else{
                _ul.css({'top': _t});
            } 
            
        }
        else{
            _ul.css({'top': -21});
        }       
        
    });
         
}

/*iframe切换*/
function iframes(lis) {
	lis.click(function(){
		var _index = $(this).index();        
		$(this).addClass('active').siblings().removeClass('active');//替换标签样式
        $('.iframe>li').eq(_index).show().siblings('li').hide();//iframe切换
	});
}

/*关闭页面*/
function close(closeBtns) {
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
       
	});
}

/*三级菜单点击事件*/
function open_newWork() {
	$('.menu-list3 li').click(function(){
        var _span = $(this).text();
        var _target = $('.tabs-iframe').children('ul');
        var c_target = $('ul.iframe');
        var _html ='<li><span class="menu-tab"><span class="menu-tab-r"><span class="menu-tab-c menu-tab-c-r">'
                +_span
                +'</span></span></span><b class=\"close\"></b></li>' ; //新的tab标签
       
        var _cont =  '<li style="display:none;\" >'+
                     '<div class="iframe-div\">'+
                	 '<iframe src="index4.html" width="100%" height="100%" scrolling="auto" frameborder=0 ></iframe>'+
                     '</div></li>';//新的iframe内容
        
        var tabli = $(_html);
        _target.append(tabli);//将新的tab标签添加到.tabs-iframe的ul中
        c_target.append(_cont);//将新的iframe内容添加到.iframe中
        $('.iframe>li:last').show().siblings('li').hide();//页面切换
        $('.tabs-iframe>ul>li:last').addClass('active').siblings('li').removeClass('active');//tab标签样式添加
        $('.menu').children('.menu-content').slideUp();//菜单栏关闭        
        
       iframes(tabli);//将新增加的li加入到iframe切换方法
       close(tabli.find('b.close'));//iframe关闭 
	});
}
