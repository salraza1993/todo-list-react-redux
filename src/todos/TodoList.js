import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { completeTodo, removeTodo, updateTodo } from '../features/todos/todosSlice';
function TodoList({ data }) {
  const dispatch = useDispatch();
  const [updateValue, setUpdateValue] = useState(null);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  
  const editTodoHandler = (value) => {
    setIsEditEnabled(true)
    setUpdateValue(value)
  }
  const updateTodoHandler = (itemId) => { 
    dispatch(updateTodo({ id: itemId, content: updateValue }))
    setIsEditEnabled(false);
  }
  
  const completeTodoTaskHandler = (itemId) => { 
    dispatch(completeTodo({ id: itemId, completed: true }))
    setIsEditEnabled(false);
  }

  return (
    <ul className="todo-list">
      {
        data.map((todo, index) => { 
          return <li key={index} className={todo.completed ? "todo-list__item completed" : "todo-list__item"} id={todo.id} title="">
            {
              isEditEnabled ? <input
                onChange={(e) => setUpdateValue(e.target.value)}
                type="text"
                className="form-control"
                value={updateValue} /> :
              <div className="__heading fs-5 fw-bold">{todo.content}</div>
            }
            <div className="__buttons flex-shrink-0 d-flex gap-1">              
              {
                isEditEnabled && !todo.completed ?
                  <div className="__edit" id={todo.id} onClick={() => updateTodoHandler(todo.id)}>
                    <i className="fa-solid fa-check"></i> 
                  </div> : !todo.completed ?
                  <div className="__edit" id={todo.id} onClick={() => editTodoHandler(todo.content)}>
                    <i className="fa-solid fa-pencil"></i> 
                  </div> : <></>
              }
              {
                !todo.completed && 
                <div className="__complete" id={todo.id} onClick={() => completeTodoTaskHandler(todo.id)}>
                  <i className="fa-solid fa-check-square"></i>
                </div>
              }
              <div className="__delete" id={todo.id} onClick={() => dispatch(removeTodo(todo.id))}>
                <i className="fa-solid fa-trash-alt"></i>
              </div>
            </div>
          </li>
        })
      }
    </ul>
  )
}

export default TodoList