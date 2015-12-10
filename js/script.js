$(document).ready(function(){

	$('#key').change(function(data){

		var value = $(this).val();

		var placeholder = $(this).find('option[value="'+data.target.value+'"]').attr('sample');

		$('#user-input').attr('placeholder', placeholder);

		$('#user-input').focus();

	});

	$('#submit-answer').submit(function(data){

		var key = $('#key').val(),
			answer = $('#user-input');

		grade(key, answer.val());

		answer.blur();

		return false;

	});

});
