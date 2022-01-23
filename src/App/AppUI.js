import React from 'react'; 
import { TodoContext } from '../TodoContext';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';

function AppUI() { 
return(
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />

      <TodoContext.Consumer>
        {({ 
          error, 
          loading, 
          searchedTodos, 
          completeTodos, 
          deleteTodos,
        }) => {
          return (
            <TodoList>
              {error && <p>Desesperate, hubo un error...</p>}
              {loading && <p>Estamos cargando, no desesperes...</p>}
              {(!loading && !searchedTodos.length) && <p>!Crea tu primer TODO!</p>}


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
          );
        }}
      </TodoContext.Consumer>

      <CreateTodoButton />
    </React.Fragment>
);
}

export { AppUI }