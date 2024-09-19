import './App.css';
import { useSelector } from 'react-redux'; 
import { useEffect, useState } from 'react';
import AddNew from './todos/AddNew';
import TodoList from './todos/TodoList';

function App() {
  
  return (
    <section className="main-section py-4 d-flex flex-column align-items-center">
      <h1 className="text-center text-uppercase fw-bold mb-4">ToDo List</h1>
      <main className="todo-container mx-inline">
        <AddNew />
        <TodoList />
      </main>
    </section>
  );
}

export default App;
