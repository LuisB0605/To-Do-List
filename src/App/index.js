import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import './App.css';

/*const defaulTodos = [
  { text: 'Ver videos de curso de React', completed: true },
  { text: 'Ver videos de NFT', completed: false },
  { text: 'Socializar', completed: false },
];*/


function useLocalStorage(itemName, initialValue) {
  const localStorageItem = localStorage.getItem('itemName');
  let parsedItem;
  
  if (!localStorageItem) {
    localStorage.setItem('itemName', JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }

  const [item, setItem] = React.useState(parsedItem);

  const saveItem = (newItem) => {
    const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(newItem);
  };

  return [
    item,
    saveItem,
  ];
};


function App() {
  const [todos, saveTodos] = useLocalStorage('TDOS_V1', []); 

 
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

  console.log('Render (antes del use effect');

  React.useEffect(() => {
    console.log('use effect');
  }, [totalTodos]);

  console.log('Render (luego del use effect)');

  return (
    <React.Fragment>
      <TodoCounter 
        total={totalTodos}
        completed={completedTodos}
      />
      <TodoSearch 
        search={search}
        setSearch={setSearch}
      />

      <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodos(todo.text)}
            onDelete={() => deleteTodos(todo.text)}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;