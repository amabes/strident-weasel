var customKey = function() {

  var person = prompt("Enter custom text", "Nag a ram!"),
      answer = $('#user-input');

  if (person != null) {

    $('<option value="' + person + '">' + person + '</option>').insertBefore($('option[value="0000"]'));

    $('#key').val(person);

    answer.attr('placeholder', '');

    tryAgain();

  } else {

    answer.focus();

  }
}

var keyChange = function(that, data) {

  var value = that.val();

  if (value == "0000") {
    customKey();
    return false;
  }

  var placeholder = that.find('option[value="' + data.target.value + '"]').attr('sample');

  $('#user-input').attr('placeholder', placeholder);

  tryAgain();

}

var submitAnswer = function() {

  var key = $('#key').val(),
    answer = $('#user-input');

  // Buttons
  $('input[type="submit"]').hide();
  $('#try-again').show();

  $('#highlighter').show();

  grade(key, answer.val(),function(){

    // reset
    tryAgain();

  });

  answer.blur();

  $('#try-again').focus();

}

var tryAgain = function(){

  $('#highlighter').empty().hide();
  $('#user-input').focus().val('');
  $('#try-again').hide();
  $('input[type="submit"]').show();
  $('code').empty();

}

$(document).ready(function() {

  $('#key').change(function(data) {

    keyChange($(this), data);

  });

  $('#try-again').click(function(){

    tryAgain();

  });

  $('#submit-answer').submit(function() {

    submitAnswer();

    return false;

  });

});
