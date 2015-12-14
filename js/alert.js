var alert = function(params) {

		var alert = $('#alert');

		var message = '<h3>'+params.message+'</h3>';

		if(typeof(params.disable)=='undefined') params.disable = false;

		if(typeof(params.close)=='undefined') params.close = true;

		var markup = '<div id="alert"><div id="message">'+message+'</div></div>';

		// RM if in DOM
		if (alert.length=!0) {

			alert.remove();

		}

		$('body').append(markup);

		var css = {bottom:'0'};

		if (params.disable) {

			css = {bottom:'0',height:'100%'}

		}

		// Delay
		setTimeout(function(){

      $('#alert').css(css); // set bottom (css handles animation)

    },100);

		if (params.close) {

			setTimeout(function(){

				$('#alert').css({bottom:'-1000px'});

			},3000);

		}

	}
