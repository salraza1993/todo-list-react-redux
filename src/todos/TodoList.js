import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import TodoSingleItem from './TodoSingleItem';
function TodoList() {
  const allTodos = useSelector(state => state.todo.todos);
  return (
    <ul className="todo-list">
      {
        allTodos.length > 0 ? allTodos.map((todo, index) => { 
          return <TodoSingleItem key={index} data={todo} />;
        }) :
        <div className="alert alert-warning" role="alert">
          There are no todo lists available!
        </div>
      }
    </ul>
  )
}

export default TodoList