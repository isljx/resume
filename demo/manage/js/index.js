/*注册事件*/
$(function(){
    $('.slick').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        dots: true
    });
    
    /*重点关注，考核指标点击切换*/
    $('.label-tabs').children('a').click(function(){
        var _index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.index-left').children('div').eq(_index).show().siblings('div').hide();
    });
    
    //表格显示项切换
    tabs('.tab-style1');
   
    /*表格点击tr样式切换*/
    $('.common-table').find('td').parent('tr').click(function(){
        $(this).addClass('active').siblings('tr').removeClass('active');
    });
    
});

/*表格切换*/
function tabs(obj) {
	$(obj).children('.tabs-label').children('li').click(function(){
		var _index = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parents('.tab-style1').children('.content-main').children('div').eq(_index).show().siblings('div').hide();
	});
}