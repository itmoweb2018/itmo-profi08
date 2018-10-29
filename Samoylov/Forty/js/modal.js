$(document).ready(function(){
	$('.nav').click(function(){
		$('.div--layer').toggle(300);
	})

	$('.close').click(function(){
		$('.div--layer').fadeOut(300);
	})

	$('.forty-link').mouseover(function(){
		$('.forty-link').css({
			color: '#9bf1ff'
		})

		$('#forty').css({
			background: '#9bf1ff'
		})
	})

	$('.forty-link').mouseout(function(){
		$('.forty-link').css({
			color: 'white'
		})

		$('#forty').css({
			background: 'white'
		})
	})

	$('.nav').mouseover(function(){
		$('.nav').css({
			color: '#9bf1ff'
		})
	})

	$('.nav').mouseout(function(){
		$('.nav').css({
			color: 'white'
		})

	})

    $('.description-button').click( function(){
	var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 1000);
        }
	    return false;
    })
})