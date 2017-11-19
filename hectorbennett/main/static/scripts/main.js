// A $( document ).ready() block.
$(document).ready(function () {
    console.log('hello');

    var window_width = get_window_width();
    var window_height = get_window_height();

    $('body').mousemove(function (event) {
        var x_pc = event.pageX / window_width;
        var y_pc = event.pageY / window_height;

        set_bg_css(x_pc, y_pc);
        // set_text_colour(x_pc);
    });

    $(window).on('resize', function () {
        window_width = get_window_width();
        window_height = get_window_height();
    });

});


function get_window_width() {
    return $(window).width();
}

function get_window_height() {
    return $(window).height();
}

function set_bg_css(x_pc, y_pc) {
    var bg = $('#bg-top-half');
    var height = Math.abs(y_pc - 0.5) * 200 + '%';
    var rotation = 90 * x_pc - 45;
    rotation = 'rotate(' + rotation + 'deg)';

    bg.css({
        'position': 'absolute',
        'left': '50%',
        'top': '50%',
        'margin-left': -$(bg).outerWidth() / 2,
        'margin-top': -$(bg).outerHeight() / 2,
        'height': height,
        'transform': rotation,
    });
}

// function set_text_colour(x_pc) {
//     var val = x_pc * 255;
//     var color = 'rgb(' + val + ', ' + val + ', ' + val + ')';


//     $('a').css({'color': color});
// }