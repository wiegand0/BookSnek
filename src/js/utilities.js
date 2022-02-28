async function dictionaryAPI(theWord) {
  const requestURL = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + theWord;
  const response = await fetch(requestURL);
  return await response.json()
}

export { dictionaryAPI };
