//belly is the mechanic attached to the player that adds depth to the classic snake game

var belly = (function() {

	var stomach = "";
	var score = 0;

	function update(addMe) {
		stomach += addMe;
		if(addMe != "")
			searchBelly();
	}

	function searchBelly() {

		let wordsArr = [];

		//tempWord to be s
		let tempWord = stomach;

		//find all possible contiguous subsets of stomach
		for(let i = 0; i < tempWord.length; i++) {
			for(let j = i; j < tempWord.length; j++) {
				let newStr = "";
				for(let k = i; k <= j; k++) {
					newStr += tempWord[k];
				}
				//we only care about them if they are at least 2 letters long
				//lazy way out, consider reworking logic eliminating unecessary loops
				if(newStr.length >= 2) {
					wordsArr.push(newStr);
				}
			}
		}


		//sort array by length, longest to shortest
		wordsArr.sort(function(a,b){return b.length - a.length});

		let validWords = [];
		

		for(const word of wordsArr) {
			console.log("searching..." + word);
			validWord = dictionaryAPI(word);
			if(validWord)
				validWords.push(word);
		}

		//console.log(validWords);
	}

	function dictionaryAPI(theWord){

		let requestURL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + theWord;
		let request = new XMLHttpRequest();
		let valid = false;

		request.open('GET', requestURL);
		request.responseType = 'json';

		//need to return answer variable from this function
		request.onload = function(answer) {
			const wordValidity = request.response;
			//console.log(wordValidity);
			if(wordValidity.title == "No Definitions Found" 
				|| wordValidity.partOfSpeech == "symbol" 
				|| wordValidity.partOfSpeech == "abbreviation" 
				|| wordValidity.partOfSpeech == "prefix" 
				|| wordValidity.partOfSpeech == "suffix") {
				console.log("Setting " + theWord + " False");
				valid = false;
			} else {
				console.log("Setting " + theWord + " True");
				valid = true;
				scoreWord(theWord);
			}

			//callback(answer);
		}

		request.send();

		//let validWord = detect(answer);

		//console.log("I DETECTED... " + validWord);
	}

	function emptyWord(theWord) {
		let regex = new RegExp(theWord, 'i');

		let newStomach = stomach.replace(regex, '');

		console.log("Replaced " + theWord + " : " + newStomach);

		stomach = newStomach;
	}

	function scoreWord(theWord) {
		//an array ordered from most to least used letters in the english language
		let letterWorth = ['e','t','a','i','n','o','s','h','r','d','l','u','c','m','f','w','y','g','p','b','v','k','q','j','x','z'];
		let scored = 0;
		let tempWord = theWord.toLowerCase();
		for(let i = 0; i < tempWord.length; i++) {
			let theLetter = tempWord[i];
			let indexValue = letterWorth.findIndex(find => find == theLetter);
			scored += indexValue;
		}

		emptyWord(theWord);

		//add word score to total belly score
		score += scored;
	}

	function getContent() {
		return stomach;
	}

	return {
		update, getContent
	}
});