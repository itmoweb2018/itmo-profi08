$(document).ready(function(){
	$('.link, .hh').click(function(){
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top + "px"
		},{
			duration: 800,
			easing: "swing"
		});
	})
	$(window).scroll(function(){
		var x = $('html,body').scrollTop();
		if (x > 500) {
			$('menu').addClass('active');
		}else{
			$('menu').removeClass('active');
		}
	})
})

