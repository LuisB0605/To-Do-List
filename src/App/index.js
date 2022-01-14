import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import './App.css';

/*const defaulTodos = [
  { text: 'Ver videos de curso de React', completed: true },
  { text: 'Ver videos de NFT', completed: true },
  { text: 'Socializar', completed: false },
];*/

function App() {
  const localStorageTodos = localStorage.getItem('TODOS_V1');
  let parsedTodos = [];
  
  if (!localStorageTodos) {
    localStorage.setItem('TODOS_V1', JSON.stringify([]));
    parsedTodos = [];
  } else {
    parsedTodos = JSON.parse(localStorageTodos);
  }
  

  const [todos, setTodos] = React.useState(parsedTodos);
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

  const saveTodos = (newTodos) => {
    const stringifiedTodos = JSON.stringify(newTodos);
    localStorage.setItem('TODO_V1', stringifiedTodos);
    setTodos(newTodos);
  };


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