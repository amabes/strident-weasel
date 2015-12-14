// Author
// Alan Joseph Mabry
// https://github.com/amabes

var grade = function(str1, str2) {

  // Tracking total errors
  this.allErrors = [];
  this.countErrors = 'None';

  // Tracking original strings
  this.original = {
    str1: str1,
    str2: str2
  }

  var tupler = function(arr1, arr2) {

    var tuples = [];

    for (var i = 0; i < arr1.length; i++) {

      tuples.push([arr1[i], arr2[i]]);

    }

    return tuples;

  }

  var groupWords = function(str1, str2, callback) {
    str1 = str1.split(' '); // #TODO experiment with .match(/.*?[\.\s]+?/g);
    str2 = str2.split(' ');

    console.log(str1);
    console.log(str2);

    callback(str1, str2);

  }

  var isTypo = function() {

  }

	var createTupleHighlights = function(verdict, error_type, arr1, arr2){

		console.log('/ '+verdict+' / '+error_type+' /');

		var t1b,
				t1a = this.original.str1.indexOf(arr1);

		if (t1a === -1) {

			t1a = 0;
			t1b = arr2.length;

		} else {

			t1b = this.original.str1.indexOf(arr1) + arr1.length;

		}

		var t2b,
				t2a = this.original.str2.indexOf(arr2);

		if (t2a === -1) {

			t2a = 0;
			t2b = arr2.length;

		} else {

			t2b = this.original.str2.indexOf(arr2) + arr2.length;

		}

		var tupe = {
			0: [t1a, t1b],
			1: [t2a, t2b]
		}


		// Aggregate all typos into one error
		for (var y = 0; y < this.allErrors.length; y++) {

			if (this.allErrors[y][1] === error_type) {

				// add to existing list of typos
				this.allErrors[y][2].push(tupe);

				return false;

			}

		}

		this.allErrors.push([verdict, error_type, [tupe]]);

	}

  var traverseWords = function(arr1, arr2, n) {

    console.log('/ / / / traverse / / / / /');
    console.log(arr1)
    console.log(arr2)

    // Since NOT equal
    // Loop through each character to determine diff.
    // each word can have up to one typo
    // Need to handle swaps next...

    // Track errors
    var errors = 0;

    // Setup pointer
    var j = 0;

    for (var x = 0; x < arr1.length; x++) {

      console.log('(errors) = ' + errors);

      if (errors <= 2) {
        //if (arr1[x].length === arr2[x].length) {

        if (x !== j) {

          // Checking TYPOS
          console.log("arr2[j] : " + arr2[j]);

          if (arr1[x] !== arr2[j] && arr2[j] != undefined) {

            // wrong_word 1
						createTupleHighlights(false,'wrong_word',arr1,arr2); //this.allErrors.push([false, "wrong_word", [n]]);
						console.log(this.allErrors);
						alert('1');
						errors++;

            return false;

          } else if (j >= arr1[x].length) {

            // Typo
            createTupleHighlights(true,'typo',arr1,arr2);
						console.log(this.allErrors);
						alert('2');
						return false;

          }

        } else {

          // Have not found a typo yet

          if (arr1[x] !== arr2[x] && arr1[x] !== arr2[x + 1] && arr1[x] !== arr2[x - 1]) {

            // swap
            // wrong word
						createTupleHighlights(false,'wrong_word',arr1,arr2);

						//if (errors < arr1.length - 1) {}
            //console.log('(SWAP or WRONG WORD)');
						return false;

            errors++;

          } else {

            // Increase pointer to keep checking string
            j += 1;
            errors++;

          }

        }

        j++;

      } else {

        console.log('more than one error in word');

				this.allErrors.push(['none', 'wrong_word', []]);
				console.log(this.allErrors);
				alert('3');
				return false;

        //return false;
      }

      //j++;

    }

    console.log('/ / / / / / / / / /');

  }

  var checkErrors = function(arr1, arr2, n) {

    if (arr1[n] !== arr2[n]) {
      // Words are not equal
      // Potential typo, swap or wrong_word case

      console.log('## [' + n + '] ##');
      traverseWords(arr1[n], arr2[n], n);

    }

    if (n === 0) {
      return 'done'; // 1
    }

    return checkErrors(arr1, arr2, n - 1);

  }

  var sanitize = function(str) {

    // Lowercase
    str = str.toLowerCase();

    // Strip Punctuation (http://stackoverflow.com/a/4328722/1564463)
    str = str.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    return str.replace(/\s{2,}/g, " ");

  }

  var highlight = function(arr1, arr2, errors) {

    console.log(errors);
    //console.log(this.original.str1);
    //console.log(this.original.str2);

    var result = this.original.str2.split('');

    for (var i = 0; i < errors.length; i++) {
      //if (errors[i][1] == 'typo') {

        for (var j = 0; j < errors[i][2].length; j++) {

          //console.log('errors[' + j + '][2][' + j + '][1][0] ', errors[i][2][j][1][0]);
          //console.log('errors[' + j + '][2][' + j + '][1][1] ', errors[i][2][j][1][1]);

          var correct_spelling = this.original.str1.slice(errors[i][2][j][0][0], errors[i][2][j][0][1]);

          result.splice(errors[i][2][j][1][0], 0, '<span type="'+errors[i][1]+'"><span>'+errors[i][1]+': ' + correct_spelling + '</span>');
          result.splice(errors[i][2][j][1][1] + 1, 0, '</span>');

        }

      //}

    }

    console.log(result);

    $('#highlighter').html(result.join(''));

  }

  var success = function() {

  }

  var error = function() {

  }

  ////////////////////////////////////////

  if (str2.length == 0) {

    this.allErrors.push([false, "missing 2"]); // #TODO add tuples

    return false;

  }

  // RM Punctuation
  str1 = sanitize(str1);
  str2 = sanitize(str2);

  // Convert strings to arrays
  groupWords(str1, str2, function(arr1, arr2) {

    // Triage, determine appropriate error
    checkErrors(arr1, arr2, arr1.length - 1);

    console.log('- - - - highlight - - - ');
    highlight(arr1, arr2, this.allErrors);
    console.log('- - - - /highlight - - - ');
    // FALSE
    //
    // Cases: multiple typos, wrong_word, missing
    // return tuples consisting of indices
    // corresponding to begining,end of troubled word

    // TRUE
    //
    // Cases: singular typo, swaps

  });

}
