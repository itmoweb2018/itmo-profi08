$('.fortyLink').mouseover(function(){
		$('.forty').css({
				background: "#9bf1ff"
			})
	})

	$('.header-button, .landing-button').mouseover(function(){
		$('.hh, .fas, .lh').css({ color: "#9bf1ff" })
	})

	$('.header-button, .landing-button').mouseout(function(){
		$('.hh, .fas, .lh').css({ 
			color: "#fff" 
		})
	})

	$('.forty, .fortyLink').mouseout(function(){
		$('.forty').css({ background: "#fff" })
	})

	var current = 2;
	$('.menuBtn').click(function(){
		if (current % 2 == 0) {
			addY();
		}else{
			removeY();
		}
	});

	function addY(){
		$('#Btn').addClass('rotateL');
		$('#Btn').addClass('rotateR');
		$('.logo').css({ opacity: '0' })
		$('.middleLine').css({
			opacity: '0'
		});
		$('.menu').fadeIn(800);
		current++;

	}

	function removeY(){
		$('#Btn').removeClass('rotateL');
		$('#Btn').removeClass('rotateR');
		$('.logo').css({ opacity: '1' })
		$('.middleLine').css({
			opacity: '1'
		});
		$('.menu').fadeOut(800);
		current++;
	}

