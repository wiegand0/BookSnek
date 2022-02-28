//belly is the mechanic attached to the player that adds depth to the classic snake game

import { dictionaryAPI } from './utilities';

const belly = function () {
  let stomach = 'TEST';
  let score = 0;

  function destroy() {
    stomach = '';
    score = 0;
  }

  //if not a word evaluation tile (~) add letter to belly
  function update(addMe) {
    if (addMe === '~') {
      searchBelly();
      return;
    }

    stomach += addMe;
  }

  //creates the array of all possible words
  async function searchBelly() {
    // Abort if stomach is empty or is 1 or less letters
    if (stomach === '' || stomach.length <= 1) return;
    
    let wordsArr = [];

    //tempStomach to be searched
    let tempStomach = stomach;

    //tempStomach tempStomach
    //find all possible contiguous subsets of stomach
    for (let i = 0; i < tempStomach.length; i++) {
      for (let j = i; j < tempStomach.length; j++) {
        let newStr = '';
        for (let k = i; k <= j; k++) {
          newStr += tempStomach[k];
        }
        //we only care about them if they are at least 2 letters long
        //lazy way out, consider reworking logic eliminating unecessary loops
        if (newStr.length >= 2) {
          wordsArr.push(newStr);
        }
      }
    }

    //sort array by length, longest to shortest
    wordsArr.sort(function (a, b) {
      return b.length - a.length;
    });

    //sending words to be searched, will break when first word is found
    for (const word of wordsArr) {
      const validWord = await checkWord(word);
      if (validWord) break;
    }

    //If the belly has changed search again to check for other words
    if(stomach !== tempStomach) searchBelly();
  }

  //calls the API, checks returned JSON to see if a word came back
  async function checkWord(theWord) {
    let valid = false;
    const wordReturned = await dictionaryAPI(theWord);

    if (
      wordReturned.title === 'No Definitions Found' ||
      wordReturned[0].meanings[0].partOfSpeech === 'symbol' ||
      wordReturned[0].meanings[0].partOfSpeech === 'abbreviation' ||
      wordReturned[0].meanings[0].partOfSpeech === 'prefix' ||
      wordReturned[0].meanings[0].partOfSpeech === 'suffix'
    ) {
      console.log('Setting ' + theWord + ' False');
      valid = false;
    } else {
      console.log('Setting ' + theWord + ' True');
      valid = true;
      scoreWord(theWord);
    }
    return valid;
  }

  //removes valid words from the belly
  function emptyWord(theWord) {
    //turn word into reg exp search
    let regex = new RegExp(theWord, 'i');

    //remove word from the belly
    let newStomach = stomach.replace(regex, '');

    console.log(
      'FROM: ' + stomach + ' REPLACED: ' + theWord + ' NEW: ' + newStomach,
    );

    //set updated belly
    stomach = newStomach;
  }

  //scores word
  function scoreWord(theWord) {
    //an array ordered from most to least used letters in the english language
    let letterWorth = [
      'e',
      't',
      'a',
      'i',
      'n',
      'o',
      's',
      'h',
      'r',
      'd',
      'l',
      'u',
      'c',
      'm',
      'f',
      'w',
      'y',
      'g',
      'p',
      'b',
      'v',
      'k',
      'q',
      'j',
      'x',
      'z',
    ];
    let scored = 0;
    let tempWord = theWord.toLowerCase();
    for (let i = 0; i < tempWord.length; i++) {
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
    update,
    getContent,
    destroy,
  };
};

export { belly };
