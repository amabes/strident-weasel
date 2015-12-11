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

      if (errors <= 1) {
        //if (arr1[x].length === arr2[x].length) {
        // Accounts for hhouse
        //console.log(n + '|' + x + ' = ' + arr1[x] + ' : ' + arr2[j] + ' (j=' + j + ')');

        if (x !== j) {

          // Checking TYPOS
          console.log('...................checking (typos)');
          //console.log(n + '|' + x + ' = ' + arr1[x] + ' : ' + arr2[j] + ' (j=' + j + ')');

					console.log("arr2[j] : "+arr2[j]);

          if (arr1[x] !== arr2[j] && arr2[j] != undefined) {

            // Typo
            console.log('(FALSE : WRONG WORD)');
						this.allErrors.push([false, "wrong_word", [n]]);
            errors++;

            return false;

          } else if (j >= arr1[x].length) {

            // Typo
            console.log('(TRUE : TYPO)');

						console.log('#TYP0');
						console.log(arr1);
						var t1a = this.original.str1.indexOf(arr1);
						var t1b = this.original.str1.indexOf(arr1)+arr1.length;
						console.log(arr2);
						var t2a = this.original.str2.indexOf(arr2);
						var t2b = this.original.str2.indexOf(arr2)+arr2.length;

						console.log('#/TYP0');

						var typoIndex,
								loggedTypo = false,
								tupe = {0:[t1a,t1b], 1:[t2a,t2b]};

						for (var y=0;y<this.allErrors.length;y++) {

							if(this.allErrors[y][1] === 'typo'){

								// add to existing list of typos
								return this.allErrors[y][2].push( tupe );

							}

						}

						return this.allErrors.push([true, 'typo', [ tupe ] ]);

          }

          console.log('..............................');

        } else {

          // Have not found a typo yet

          if (arr1[x] !== arr2[x] && arr1[x] !== arr2[x + 1] && arr1[x] !== arr2[x - 1]) {

            // swap
            // wrong word

            if (errors < arr1.length - 1) {}
            console.log('(error 1 : SWAP or WRONG WORD)');

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
        return false;
      }

      //j++;

    }

    console.log('/ / / / / / / / / /');

  }

  var checkResult = function(results) {

    console.log(this.allErrors);
    console.log(this.original.str1);
    console.log(this.original.str2);

  }

  var checkErrors = function(arr1, arr2, n) {

		if (arr1[n] !== arr2[n]){
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
    // Strip Punctuation
    // http://stackoverflow.com/a/4328722/1564463
    str = str.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    return str.replace(/\s{2,}/g, " ");

  }

  var highlight = function() {

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

		console.log('- - - - checkResult - - - ');
		checkResult();
		console.log('- - - - /checkResult - - - ');
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
