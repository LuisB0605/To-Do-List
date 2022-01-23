import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext(); 

function TodoProvider(props) {
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


    return (
        <TodoContext.Provider value={{
            loading,
            error,
            totalTodos,
            completedTodos,
            search,
            setSearch,
            searchedTodos,
            completeTodos,
            deleteTodos, 
        }}>
           {props.children} 
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };
