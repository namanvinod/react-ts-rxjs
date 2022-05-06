import React, { useState, useEffect, Fragment } from 'react';
import './style.css';

const BASE_URL = 'https://www.breakingbadapi.com/api';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const getCharacters = async () => {
    const characterList = await fetch(
      `https://www.breakingbadapi.com/api/characters`
    ).then((res) => res.json());
    console.log(characterList);
    setCharacters(characterList.slice(0, 5));
  };

  const searchCharacters = async () => {
    const searchResult = await fetch(
      `${BASE_URL}/characters?name=${searchText}`
    ).then((res) => res.json());

    // console.log(1, searchResult);
    setSearchResults(searchResult);
  };

  const handleSearch = (e) => {
    if (e.target.value < 3) {
      setSearchText('');
    }

    setSearchText(e.target.value);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  useEffect(() => {
    if (searchText.length < 3) return;
    searchCharacters();
  }, [searchText]);

  return (
    <Fragment>
      <h4>Some Random Characters</h4>
      <div className="random-character-list">
        {characters?.map((character) => (
          <li key={character.char_id}>{character.name}</li>
        ))}
      </div>
      <h5>Search Here:</h5>
      <input type="text" onChange={handleSearch} />
      <div className="padding-10">
        {searchResults?.map((character) => (
          <div key={character.char_id}>
            <img className="character-img" src={character.img} />
            <strong>{character.name}</strong>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
export default App;
