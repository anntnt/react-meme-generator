import React from 'react';
import MemeCard from '../components/MemeCard';

export default function ResultsContainer({ memes }) {
  return (
    <div>
      This is the Results Container
      {memes.map((meme) => {
        return <MemeCard key={`meme-${meme.id}`} memeObject={meme} />;
      })}
    </div>
  );
}
