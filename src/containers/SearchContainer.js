import React, { useState } from 'react';

export default function SearchContainer({ searchMemes }) {
  return (
    <>
      <h1> Meme Search</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          onChange={(event) => {
            searchMemes(event);
          }}
        />
      </form>
    </>
  );
}
