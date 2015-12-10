function myFunction() {
    var person = prompt("Enter custom text", "Nag a ram!");
    if (person != null) {

		$('<option value="'+person+'">'+person+'</option>').insertBefore($('option[value="0000"]'));

		$('#key').val(person);

		$('#user-input').attr('placeholder', '').focus();

    } else {

		$('#user-input').focus();

    }
}

$(document).ready(function(){

	$('#key').change(function(data){

		var value = $(this).val();

		if(value=="0000"){
			myFunction();
			return false;
		}

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
