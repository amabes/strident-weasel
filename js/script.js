$(document).ready(function(){

	$('#key').change(function(data){

		var value = $(this).val();

		var placeholder = $(this).find('option[value="'+data.target.value+'"]').attr('sample');

		$('#user-input').attr('placeholder', placeholder);

	});

	$('#submit-answer').submit(function(data){

		var key = $('#key').val(),
			answer = $('#user-input').val();

		grade(key, answer);

		return false;

	});

});
