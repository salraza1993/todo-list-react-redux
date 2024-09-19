import './App.css';
import { useSelector } from 'react-redux'; 
import { useEffect, useState } from 'react';
import AddNew from './todos/AddNew';
import TodoList from './todos/TodoList';

function App() {
  const allTodos = useSelector(state => state.todo.todos);
  
  return (
    <section className="main-section py-4 d-flex flex-column align-items-center">
      <h1 className="text-center text-uppercase fw-bold mb-4">ToDo List</h1>
      <main className="todo-container mx-inline">
        <AddNew />
        {
          allTodos.length > 0 ? <TodoList data={allTodos} /> :
          <div className="alert alert-warning" role="alert">
            There are no todo lists available!
          </div>
        }
      </main>
    </section>
  );
}

export default App;
