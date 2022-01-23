import React from 'react';
import { AppUI } from './AppUI';
import './App.css';

/*const defaulTodos = [
  { text: 'Ver videos de curso de React', completed: true },
  { text: 'Ver videos de NFT', completed: false },
  { text: 'Socializar', completed: false },
];*/


function useLocalStorage(itemName, initialValue) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem('itemName');
      let parsedItem;
      
      if (!localStorageItem) {
        localStorage.setItem('itemName', JSON.stringify(initialValue));
        parsedItem = initialValue;
      } else {
        parsedItem = JSON.parse(localStorageItem);
      }

      setItem(parsedItem);
      setLoading(false);
      } catch(error) {
        setError(error);
      }
    }, 1000);
  });

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    }
    catch(error) {
      setError(error);
    }
  };

  return {
    item,
    saveItem,
    loading,
    error,
  };
};


function App() {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TDOS_V1', []); 

 
  const [search, setSearch] = React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!search.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = search.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const completeTodos = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text == text);
    const newTodos = [...todos];    
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const deleteTodos = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text == text);
    const newTodos = [...todos];    
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  // console.log('Render (antes del use effect');

  // React.useEffect(() => {
  //  console.log('use effect');
  // }, [totalTodos]);

  // console.log('Render (luego del use effect)');

  return (
    <AppUI 
    loading={loading}
    error={error}
    totalTodos={totalTodos}
    completedTodos={completedTodos}
    search={search}
    setSearch={setSearch}
    searchedTodos={searchedTodos}
    completeTodos={completeTodos}
    deleteTodos={deleteTodos}
    />
  );
}

export default App;