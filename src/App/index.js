import React from 'react';
import { TodoProvider } from '../TodoContext';
import { AppUI } from './AppUI';
import './App.css';

/*const defaulTodos = [
  { text: 'Ver videos de curso de React', completed: true },
  { text: 'Ver videos de NFT', completed: false },
  { text: 'Socializar', completed: false },
];*/


function App() {
  // console.log('Render (antes del use effect');

  // React.useEffect(() => {
  //  console.log('use effect');
  // }, [totalTodos]);

  // console.log('Render (luego del use effect)');

  return (
    <TodoProvider>
      <AppUI />
    </TodoProvider>
  );
}

export default App;