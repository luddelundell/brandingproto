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
    });
    // function setBrand(){
    //     var brand10 = $(':root').css('--brand')+'10';
    //     var brand20 = $(':root').css('--brand')+'20';
    //     var brand40 = $(':root').css('--brand')+'35';
    //     $(':root').css('--brand10', brand10 );
    //     $(':root').css('--brand20', brand20 );
    //     $(':root').css('--brand40', brand40 );
    // };
      
    // setBrand();
});