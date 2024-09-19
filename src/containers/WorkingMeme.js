import FileSaver from 'file-saver';
import { useState } from 'react';

// import styles from './WorkingMeme.module.scss';

export default function WorkingMeme() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [imageName, setImageName] = useState('buzz');
  /* const [imageUrl, setImageUrl] = useState(
    `https://api.memegen.link/images/${imageName}.jpg`,
  ); */

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
          }}
        />
        <label htmlFor="bottomText">Bottom text: </label>
        <input
          value={bottomText}
          id="bottomText"
          onChange={(event) => {
            setBottomText(event.currentTarget.value);
          }}
        />
        <br />
        <label htmlFor="memeTemplate">Meme template</label>
        <input
          id="memeTemplate"
          onKeyDown={(event) =>
            (event.currentTarget.value && event.key) === 'Enter'
              ? setImageName(event.currentTarget.value)
              : ''
          }
        />
        <button
          type="button"
          onClick={() => {
            FileSaver.saveAs(
              `https://api.memegen.link/images/${imageName}/${topText}/${bottomText}.jpg`,
              `${imageName}.jpg`,
            );
          }}
        >
          Download
        </button>
        <br />
        <img
          data-test-id="meme-image"
          id="meme-image"
          alt={`Meme ${imageName} ${topText} ${bottomText}`}
          src={`https://api.memegen.link/images/${imageName}/${topText ? encodeURIComponent(topText) : ''}%2F${bottomText ? encodeURIComponent(bottomText) : ''}.jpg`}
          width="600"
        />
      </form>
    </>
  );
}
