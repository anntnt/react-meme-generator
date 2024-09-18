import React, { useEffect, useState } from 'react';
import ResultsContainer from './containers/ResultsContainer';
import SearchContainer from './containers/SearchContainer';

const App = () => {
  const [allMemes, setAllMemes] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch('https://api.memegen.link/templates')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setAllMemes(data);
      })
      .catch((error) => console.log(error.message));
  }, []); // Empty dependency array ensures it runs once after component mounts

  const searchMemes = (event) => {
    setSearchText(event.target.value);
  };

  const filterMeme = (text) => {
    return allMemes.filter((meme) => meme.name.toLowerCase().includes(text));
  };

  return (
    <div className="App">
      <SearchContainer searchMemes={searchMemes} />
      <ResultsContainer memes={filterMeme(searchText)} />
    </div>
  );
};

export default App;
