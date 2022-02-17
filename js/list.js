$(document).ready(function(){
    $('#favcolor').change(function(){
      $( "#foo" ).empty();
        let hsl = hexToHSL($(this).val());
        $(':root').css('--brand-h', hsl[0] );
        $(':root').css('--brand-s', hsl[1]+'%' );
        $(':root').css('--brand-l', hsl[2]+'%' );
        // $(':root').css('--brand-complement', 'hsl('+hsl[0]/2+','+hsl[1]+'%,'+hsl[2]+'%)');
        var pickerColor = $(this).val().slice(1,7);
        var brc = invertHex(pickerColor);
        var brcH = '#'+ invertHex(pickerColor);
        $(':root').css('--brand-complement', brcH );
        $('.color-val').text($(this).val());

        $.getJSON("https://webaim.org/resources/contrastchecker/?fcolor="+pickerColor+"&bcolor=FFFFFF&api", function(w){
          var q = "pass";    
          $("#foo").append("<p>Ratio: " +w.ratio + " vs. #FFFFFF</p>");
          if (w.AA == 'pass') {q="pass"} else {q="fail"}
          $("#foo").append("<p class='"+q+"'>AA: " +w.AA + "</p>");
        });

        $.getJSON("https://webaim.org/resources/contrastchecker/?fcolor="+pickerColor+"&bcolor=000000&api", function(b){
          var q = "pass";  
          $("#foo").append("<p>Ratio: " +b.ratio + " vs. #000000</p>");
          if (b.AA == 'pass') {q="pass"} else {q="fail"}
          $("#foo").append("<p class='"+q+"'>AA: " +b.AA + "</p>");
        });

        // $.getJSON("https://webaim.org/resources/contrastchecker/?fcolor="+pickerColor+"&bcolor="+brc+"&api", function(b){
        //   var q = "pass";  
        //   $("#foo").append("<p>Ratio: " +b.ratio + " vs. "+brc+"</p>");
        //   if (b.AA == 'pass') {q="pass"} else {q="fail"}
        //   $("#foo").append("<p class='"+q+"'>AA: " +b.AA + "</p>");
        // });
    })

    $('input[type=radio][name=style]').change(function() {

        var styleType = $(this).val();
        $('body').removeClass();
        if (styleType !== 'standard') {
            $('body').addClass(styleType);
            $('#standardColors').hide();
        }               
        else {
          $('#standardColors').show();
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
    function invertHex(hex) {
        return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
      }
      
     // invertHex('00FF00'); // Returns FF00FF


    function hexToHSL(H) {
        // Convert hex to RGB first
        let r = 0, g = 0, b = 0;
        if (H.length == 4) {
          r = "0x" + H[1] + H[1];
          g = "0x" + H[2] + H[2];
          b = "0x" + H[3] + H[3];
        } else if (H.length == 7) {
          r = "0x" + H[1] + H[2];
          g = "0x" + H[3] + H[4];
          b = "0x" + H[5] + H[6];
        }
        // Then to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
      
        if (delta == 0)
          h = 0;
        else if (cmax == r)
          h = ((g - b) / delta) % 6;
        else if (cmax == g)
          h = (b - r) / delta + 2;
        else
          h = (r - g) / delta + 4;
      
        h = Math.round(h * 60);
      
        if (h < 0)
          h += 360;
      
        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        return [h, s, l];
        // return "hsl(" + h + "," + s + "%," + l + "%)";
      }
});