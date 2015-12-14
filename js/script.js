var customKey = function() {

  var person = prompt("Enter custom text", "Nag a ram!");

  if (person != null) {

    $('<option value="' + person + '">' + person + '</option>').insertBefore($('option[value="0000"]'));

    $('#key').val(person);

    $('#user-input').attr('placeholder', '').val('').focus();

    $('#highlighter').hide();

  } else {

    $('#user-input').focus();

  }
}

var keyChange = function(that, data) {

  var value = that.val();

  if (value == "0000") {
    customKey();
    return false;
  }

  var placeholder = that.find('option[value="' + data.target.value + '"]').attr('sample');

  $('#user-input').attr('placeholder', placeholder).val('');

  $('#highlighter').hide();

  $('#user-input').focus();

}

var submitAnswer = function() {

  var key = $('#key').val(),
    answer = $('#user-input');

  if (answer.val() == '') {
    alert('Try again.')
    return false;
  }

  $('#highlighter').show();

  $('#highlighter').click(function() {
    $(this).hide();
    answer.focus();
  });

  grade(key, answer.val());

  answer.blur();

}

$(document).ready(function() {

  $('#key').change(function(data) {

    keyChange($(this), data);

  });

  $('#submit-answer').submit(function() {

    submitAnswer();

    return false;

  });

});
