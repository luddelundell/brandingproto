$(document).ready(function(){
    $('input[type=radio][name=style]').change(function() {
        var styleType = $(this).val();
        $('body').removeClass();
        if (styleType !== 'standard') {
            $('body').addClass(styleType);
        }               
    });
    $('.showcase').mouseenter(function(){
        var e ='.list-'+$(this).attr('id');
        $(e).addClass('hightlight');
    })
    $('.showcase').mouseleave(function(){
        var e ='.list-'+$(this).attr('id');
        $(e).removeClass('hightlight');
    })
    $('.menuitem__button').click(function(){
        $(this).parent().find('ul').slideToggle();
        $(this).parent().toggleClass('expanded');
    })
});