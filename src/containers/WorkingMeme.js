import FileSaver from 'file-saver';
import { useState } from 'react';

// import styles from './WorkingMeme.module.scss';

export default function WorkingMeme() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [imageName, setImageName] = useState('buzz');
  const [imageUrl, setImageUrl] = useState(
    `https://api.memegen.link/images/${imageName}.jpg`,
  );
  const [topTextArr, setTopTextArr] = useState([]);
  const [bottomTextArr, setBottomTextArr] = useState([]);
  const [imageNameArr, setImageNameArr] = useState([]);

  const [timer, setTimer] = useState(null);

  const specialCharacters = {
    '#': '~h',
    '?': '~q',
    '/': '~s',
  };
  function convertSpecialChar(text) {
    for (const [char, pattern] of Object.entries(specialCharacters)) {
      text = text.replaceAll(char, pattern);
    }
    return text;
  }

  const onChangeHandler = (value, func, storageName) => {
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      // Get existing session storage's content, if any. Otherwise, return an empty array:
      const currentArray =
        JSON.parse(window.localStorage.getItem(storageName)) || [];
      currentArray.push(value);

      // Add currentArray to the session storage object:
      window.localStorage.setItem(storageName, JSON.stringify(currentArray));

      const data = window.localStorage.getItem(storageName);
      if (data !== null) func(JSON.parse(data));
    }, 2000);
    setTimer(newTimer);
  };
  // render history of top text
  const topTextArrItems = topTextArr.map((topTextItem) => (
    <li key={`topText-${topTextItem.id}`}>{topTextItem}</li>
  ));
  const bottomTextArrItems = bottomTextArr.map((bottomTextItem) => (
    <li key={`bottomText-${bottomTextItem.id}`}>{bottomTextItem}</li>
  ));
  const imageNameArrItems = imageNameArr.map((imageNameItem) => (
    <li key={`imageName-${imageNameItem.id}`}>{imageNameItem}</li>
  ));
  return (
    <>
      <h1> Meme Generator</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label htmlFor="topText">Top text: </label>
        <input
          value={topText}
          id="topText"
          onChange={(event) => {
            setTopText(event.currentTarget.value);
            onChangeHandler(
              event.currentTarget.value,
              setTopTextArr,
              'TOP_TEXT',
            );
          }}
        />
        <label htmlFor="bottomText">Bottom text: </label>
        <input
          value={bottomText}
          id="bottomText"
          onChange={(event) => {
            setBottomText(event.currentTarget.value);
            onChangeHandler(
              event.currentTarget.value,
              setBottomTextArr,
              'BOTTOM_TEXT',
            );
          }}
        />
        <br />
        <label htmlFor="memeTemplate">Meme template</label>
        <input
          id="memeTemplate"
          onKeyDown={(event) => {
            if ((event.currentTarget.value && event.key) === 'Enter') {
              setImageName(event.currentTarget.value);
              onChangeHandler(
                event.currentTarget.value,
                setImageNameArr,
                'IMAGE_NAME',
              );
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            setImageUrl(
              (topText &&
                bottomText &&
                `https://api.memegen.link/images/${imageName}/${convertSpecialChar(topText)}%2F${convertSpecialChar(bottomText)}.jpg`) ||
                (topText &&
                  `https://api.memegen.link/images/${imageName}/${convertSpecialChar(topText)}.jpg`) ||
                (bottomText &&
                  `https://api.memegen.link/images/${imageName}/${convertSpecialChar(bottomText)}.jpg`) ||
                `https://api.memegen.link/images/${imageName}.jpg`,
            );
          }}
          data-test-id="generate-meme"
        >
          Generate
        </button>
        <button
          type="button"
          onClick={() => {
            FileSaver.saveAs(imageUrl, `${imageName}.jpg`);
          }}
        >
          Download
        </button>
        <br />
        <img
          data-test-id="meme-image"
          id="meme-image"
          alt={`Meme ${imageName} ${topText} ${bottomText}`}
          src={imageUrl}
          width="600"
        />
      </form>
      <h1>top text history</h1>
      <ul>{topTextArrItems}</ul>
      <h1>bottom text history</h1>
      <ul>{bottomTextArrItems}</ul>
      <h1>template history</h1>
      <ul>{imageNameArrItems}</ul>
    </>
  );
}
