import React from 'react';

export default function MemeCard({ memeObject }) {
  return (
    <div>
      <h1>{memeObject.name}</h1>
      <img alt="meme" src={memeObject.blank} />
    </div>
  );
}
