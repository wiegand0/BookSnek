//belly is the mechanic attached to the player that adds depth to the classic snake game

import { dictionaryAPI } from './dictionaryAPI';

const belly = function () {
  let stomach = 'TEST';
  let score = 0;

  function destroy() {
    stomach = '';
    score = 0;
  }

  function update(addMe) {
    if (addMe === '~') {
      searchBelly();
      return;
    }

    stomach += addMe;
  }

  async function searchBelly() {
    // Abort if stomach is empty or is 1 or less letters
    if (stomach === '' || stomach.length <= 1) return;
    
    let wordsArr = [];

    //tempWord to be s
    let tempWord = stomach;

    //find all possible contiguous subsets of stomach
    for (let i = 0; i < tempWord.length; i++) {
      for (let j = i; j < tempWord.length; j++) {
        let newStr = '';
        for (let k = i; k <= j; k++) {
          newStr += tempWord[k];
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

    for (const word of wordsArr) {
      const validWord = await checkWord(word);
      if (validWord) break;
    }
    //If the belly has changed search again to check for other words
    if(stomach !== tempWord) searchBelly();
  }

  async function checkWord(theWord) {
    let valid = false;
    const wordValidity = await dictionaryAPI(theWord);

    if (
      wordValidity.title === 'No Definitions Found' ||
      wordValidity[0].meanings[0].partOfSpeech === 'symbol' ||
      wordValidity[0].meanings[0].partOfSpeech === 'abbreviation' ||
      wordValidity[0].meanings[0].partOfSpeech === 'prefix' ||
      wordValidity[0].meanings[0].partOfSpeech === 'suffix'
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

  function emptyWord(theWord) {
    let regex = new RegExp(theWord, 'i');

    let newStomach = stomach.replace(regex, '');

    console.log(
      'FROM: ' + stomach + ' REPLACED: ' + theWord + ' NEW: ' + newStomach,
    );

    stomach = newStomach;
  }

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
