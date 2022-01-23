import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoSearch.css';

function TodoSearch() {
  const { search, setSearch } = React.useContext(TodoContext)

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