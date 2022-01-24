import React from 'react';
import { TodoContext } from '../TodoContext';

function TodoForm() {
    const [newTodoValue, setNewTodoValue] = React.useState('');
    const {
        addTodo, 
    } = React.useContext(TodoContext);
   
    const onChange = (event) => {
        setNewTodoValue(event.target.value);
    };

    const onCancel = () => {
        
    };
    const onSubmit = (event) => {
        event.preventDefault();
        addTodo(newTodoValue);
    };

        return(
            <form onSubmit={onSubmit}>
                <label>...</label>
                <textarea 
                        value={newTodoValue}
                        onChange={onChange}
                        placeholder='Escribe tu nuevo TODO'
                />
                <div>
                        <button
                           type="button"
                           onClick={onCancel}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                        >
                            Agregar
                        </button>
                </div>
            </form> 
        );
}

export { TodoForm };
