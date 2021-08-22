//belly is the mechanic attached to the player that adds depth to the classic snake game

var belly = (function() {

	var stomach = '';

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
					dictionaryAPI(newStr);
				}
			}
		}



		wordsArr.sort(function(a,b){return b.length - a.length});
		console.log(wordsArr);

		let validWords = [];
		/*

		for(const word of wordsArr) {
			console.log("searching..." + word);
			validWord = dictionaryAPI(word);
			if(validWord)
				validWords.push(word);
		}*/

		console.log(validWords);
	}

	function dictionaryAPI(theWord){

		let requestURL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + theWord;
		let request = new XMLHttpRequest();

		request.open('GET', requestURL);
		request.responseType = 'json';

		request.onload = function(answer) {
			const wordValidity = request.response;
			console.log(wordValidity);
			if(wordValidity.title == "No Definitions Found" 
				|| wordValidity.partOfSpeech == "symbol" 
				|| wordValidity.partOfSpeech == "abbreviation" 
				|| wordValidity.partOfSpeech == "prefix" 
				|| wordValidity.partOfSpeech == "suffix") {
				console.log("RETURNING FALSE");
				answer = false;
			} else {
				console.log("RETURNING TRUE");
				answer = true;
			}

			//callback(answer);
		}

		request.send();

		//let validWord = detect(answer);

		//console.log("I DETECTED... " + validWord);
	}

	function emptyWord(theWord) {
		let regex = /theWord/i;
		let newStomach = stomach.replace(regex, '');

		stomach = newStomach;
	}

	function getContent() {
		return stomach;
	}

	return {
		update, getContent
	}
});