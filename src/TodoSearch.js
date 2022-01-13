import React from 'react';
import './TodoSearch.css';

function TodoSearch({ search, setSearch }) {
  const onSearchValueChange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };
  return (
    <input 
      className="TodoSearch" 
      placeholder="This is the Search  🔍" 
      value={search}
      onChange={onSearchValueChange}
    />
  );
}

export { TodoSearch };