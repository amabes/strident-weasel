// Author
// Alan Joseph Mabry
// https://github.com/amabes

var grade = function(str1, str2) {

    var tupler = function(arr1, arr2) {

        var tuples = [];

        for (var i = 0; i < arr1.length; i++) {

            tuples.push([arr1[i], arr2[i]]);

        }

        return tuples;

    }

    var groupWords = function(str1, str2, callback) {
        str1 = str1.split(' ');
        str2 = str2.split(' ');

        console.log(str1);
        console.log(str2);

        callback(str1, str2);

    }

    var traverseWords = function() {
        // Since NOT equal
        // Loop through each character to determine diff.
        // each word can have up to one typo
        // Need to handle swaps next...
        for (var x = 0; x < arr1[n].length; x++) {

            console.log('errors = ' + errors);
            //if(arr1[n][x]===arr2[n][x]){return true;}

            if (errors < arr1.length - 1) {

                if (arr1[n][x].length === arr2[n][x].length) {
                    // swap
                    // wrong word
                    console.log(n + '|' + x + ' = ' + arr1[n][x] + ' : ' + arr2[n][x]);

                    if (errors < arr1.length - 1) {}
                    console.log('swap or wrong word');

                    errors++;

                } else if (arr1[n][x] !== arr2[n][x]) {

                    errors++;

                }

            } else {

                console.log('more than one error in word');

            }

        }
    }

    var checkErrors = function(arr1, arr2, n) {
        // Spec arguably excluded delete cases, so I didn't account for that
        // tuples index's include spaces, don't forget to account for that.
        // Success handling
        // Error handling
        // Need to make sure original strings includin puctuation remain in tact for highlighting

        // Tracking errors count per word
        var errors = 0;

        console.log(n + ' = ' + arr1[n] + ' : ' + arr2[n]);

        if (arr1[n] === arr2[n]) {
            // Words are equal
            // Nothing to do...
            console.log('EQUAL');

        } else if (arr1[n].length === arr2[n].length) {
            // Word lengths are equal
            // Potential swap or wrong_word case

            console.log('swap or wrong_word');

        } else if (arr2[n].length <= arr1[n].length + 1) {
            // swap, wrong_word or typo case
            errors++;
            console.log('swap or wrong_word or typo');

        } else {
            // Potential wrong_word case
            // Potential multiple typo case
            errors++;
        }

        console.log('j = ' + j);

        if (n === 0) {
            return 'done'; // 1
        }

        j++;
        return checkErrors(arr1, arr2, n - 1);

    }

    var stripPunctuation = function(str){
		// http://stackoverflow.com/a/4328722/1564463
		str = str.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
		return str.replace(/\s{2,}/g," ");
    }

    var highlight = function(){

    }

    var success = function(){

    }

    var error = function(){

    }

    ////////////////////////////////////////

	// Setup pointer
    var j = 0;

	// RM Punctuation
	str1 = stripPunctuation(str1);
	str2 = stripPunctuation(str2);

	// Convert strings to arrays
	groupWords(str1,str2,function(arr1,arr2){

		// Triage, determine appropriate error
		checkErrors(arr1,arr2,arr1.length-1);

		// FALSE
		//
		// Cases: multiple typos, wrong_word, missing
		// return tuples consisting of indices
		// corresponding to begining,end of troubled word

		// TRUE
		//
		// Cases: singular typo, swaps

	});

	////////////////////////////////////////
	
}

var outcome = grade('This is my house.', 'This is mi hhouse');

console.log(outcome);

// Question to ask company:

// In regards to Swaps, is this for any two letters or just the characters "ae" & "ea" ?



// Keywords:

// Tuple
// One away (edit distance 1 / word)
// Swaps (ae,ea) 
// Ignore punctuation



// Input:

// Unicode string (key/baseline),
// Unicode String (user input)



// Output:

// Correct, blame, highlights



// Results:

// True
// None
// Typo
// Missing
// Wrong_word



// Methods needed:

// grade method
// highlight method (takes highlights as input & manipulates DOM to illustrate errors)
// swap
// 1 away


// Criteria/What's expected:

// if there is a typo in the student's answer
// if a word is missing or
// if a word is wrong. If the program finds a common mistake it should highlight it.

