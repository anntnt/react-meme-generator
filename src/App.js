import React, { useEffect, useState } from 'react';
import WorkingMeme from './containers/WorkingMeme';

const App = () => {
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch('https://api.memegen.link/images?filter=cat')
      .then((response) => response.json())
      .then((data) => {
        console.log('data: ' + data);
        setAllMemes(data);
      })
      .catch((error) => console.log(error.message));
  }, []); // Empty dependency array ensures it runs once after component mounts

  return (
    <div className="App">
      <WorkingMeme />
    </div>
  );
};

export default App;
