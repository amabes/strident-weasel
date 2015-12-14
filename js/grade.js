// Author
// Alan Joseph Mabry
// https://github.com/amabes

var grade = function(str1, str2, callback) {

  // Tracking total errors
  this.allErrors = [];

  // Tracking original strings
  this.original = {
    str1: str1,
    str2: str2
  }

  var groupWords = function(str1, str2, callback) {

    str1 = str1.split(' '); // #TODO experiment with .match(/.*?[\.\s]+?/g);
    str2 = str2.split(' ');
    callback(str1, str2);

  }

	var createTupleHighlights = function(verdict, error_type, arr1, arr2){

		//console.log('/ '+verdict+' / '+error_type+' /'+ arr1);

		if(error_type == 'missing'){

			// Add space before if not @ begining to prevent
			// the ossibility of getting the wrong index of
			// simple words like "is" in parts of other words.
			var _arr1 = this.original.str1.split(' ');

			if(_arr1.indexOf(arr1)!=0){
					arr1 = ' '+arr1;
			}

			// Create default array for str2
			arr2 = this.original.str2.split('');

		}

		var t1b,
				t1a = this.original.str1.indexOf(arr1);

		if (t1a === -1) {

			t1a = 0;
			t1b = arr1.length;

		} else {

			t1b = this.original.str1.indexOf(arr1) + arr1.length;

		}

		var t2b,
				t2a = this.original.str2.indexOf(arr2);

		if(error_type == 'missing') {

			// Set both blam coordinates to t1a
			t2a = t1a;
			t2b = t1a;

		} else if (t2a === -1) {

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

				if (this.allErrors[y][1] === 'wrong_word') {

						this.allErrors[y][0] = 'none';

				}

				return false;

			}

		}

		this.allErrors.push([verdict, error_type, [tupe]]);

	}

  var traverseWords = function(arr1, arr2, n) {

    // Since NOT equal
    // Loop through each character to determine diff.
    // each word can have up to one typo
    // Need to handle swaps next...

    // Track errors
    var errors = 0;

    // Setup pointer
    var j = 0;

    for (var x = 0; x < arr1.length; x++) {

      if (errors <= 2) {
        //if (arr1[x].length === arr2[x].length) {

        if (x !== j) {

          // Checking TYPOS

          if (arr1[x] !== arr2[j] && arr2[j] != undefined) {

            // wrong_word 1
						createTupleHighlights(false,'wrong_word',arr1,arr2);

						errors++;

            return false;

          } else if (j >= arr1[x].length) {

            // Typo
            createTupleHighlights(true,'typo',arr1,arr2);

						return false;

          }

        } else {

          // Have not found a typo yet

          if (arr1[x] !== arr2[x] && arr1[x] !== arr2[x + 1] && arr1[x] !== arr2[x - 1]) {

            // swap
            // wrong word
						createTupleHighlights(false,'wrong_word',arr1,arr2);
						return false;

						//if (errors < arr1.length - 1) {}
            errors++;

          } else {

            // Increase pointer to keep checking string
            j += 1;
            errors++;

          }

        }

        j++;

      } else {

        // More than one error in word

				this.allErrors.push(['none', 'wrong_word', []]);

				return false;

      }

      //j++;

    }

  }

  var checkErrors = function(arr1, arr2, n) {

    if (arr1[n] !== arr2[n]) {
      // Words are not equal
      // Potential typo, swap or wrong_word case

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

  var highlight = function(arr1, arr2, errors, callback) {

		$('code').html(errors);

    var result = this.original.str2.split('');

    for (var i = 0; i < errors.length; i++) {

        for (var j = 0; j < errors[i][2].length; j++) {

					var correct_spelling = this.original.str1.slice(errors[i][2][j][0][0], errors[i][2][j][0][1]);

          result.splice(errors[i][2][j][1][0], 0, '<span type="'+errors[i][1]+'"><span>'+errors[i][1]+': ' + correct_spelling + '</span>');

					if(errors[i][1] === 'missing'){

						// Value was missing, insert it
						result.splice(errors[i][2][j][1][1] + 1, 0, correct_spelling+'</span>');

					} else {
						// Value is present, wrap it.
						result.splice(errors[i][2][j][1][1] + 1, 0, '</span>');

					}

        }

    }

    $('#highlighter').html(result.join(''));

  }

	var checkMissing = function(arr1, arr2){

		if (arr2.length <= arr1.length-2) {

			// Missing 2 or more words
			alert({
				message:'Try again. 2 or more words missing.'
			});

		} else if (arr2.length <= arr1.length-1){

			// Missing 1 word
			for (var i=0;i<arr2.length;i++) {

				// Remove words in both arrays that are not present in arr1
				var ar1Index = arr1.indexOf(arr2[i]);

				if (ar1Index!== -1) {
					arr1.splice(ar1Index, 1);
					arr2.splice(i, 1);
					i-=1;

				}

			}

			if(arr1.length>1){

				// Missing 1 word and others contain errors
				// Not sure how to isolate missing word in this scenario

				alert({
					message:'Try again. Missing words and contains other errors.'
				});

				return false;

			}

			// Missing 1 word and there are no other typos, etc.
			createTupleHighlights(false,'missing',arr1[0]);

			return true;

		}

	}

	var checkSame = function(str1,str2){

		if(str1 === str2){

			alert({
				message:'Correct!'
			});

			tryAgain();

			return false;

		}

	}

	var checkEmpty = function(str2){

		if (str2.length === 0) {

			alert({
				message:'Try again.'
			});

	    this.allErrors.push([false, "missing",[]]);

	    return false;

	  }

	}

  ////////////////////////////////////////


	// Check if empty
  checkEmpty(str2);

  // RM Punctuation
  str1 = sanitize(str1);
  str2 = sanitize(str2);

	// Check if strings are the same
	checkSame(str1,str2);

  // Convert strings to arrays
  groupWords(str1, str2, function(arr1, arr2) {

		if(arr1.length === arr2.length){

			// If no words missing, Triage and determine appropriate error
			checkErrors(arr1, arr2, arr1.length - 1);

		} else {

			// Check for missing words
			checkMissing(arr1, arr2);

		}

    highlight(arr1, arr2, this.allErrors, function(){

			// Callback
			if($.isFunction(callback)) callback();

		});



  });

}
