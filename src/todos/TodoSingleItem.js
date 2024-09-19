import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { completeTodo, removeTodo, updateTodo } from '../features/todos/todosSlice';

function TodoSingleItem({ data }) {
  const allTodos = useSelector(state => state.todo.todos);

  const dispatch = useDispatch();
  const [isAlreadyExist, setIsAlreadyExist] = useState(false);
  const [updateValue, setUpdateValue] = useState(null);
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const editTodoHandler = (value) => {
    setIsEditEnabled(true);
    setIsAlreadyExist(false);
    setUpdateValue(value);
  };
  const updateTodoHandler = (itemId) => {
    const isAlreadyAvailable = allTodos.some(todo => todo.content === updateValue);
    if (isAlreadyAvailable) { 
      setIsAlreadyExist(true);
    } else {
      dispatch(updateTodo({ id: itemId, content: updateValue }));
      setIsEditEnabled(false);
      setIsAlreadyExist(false);
    }
  };

  const completeTodoTaskHandler = (itemId) => {
    dispatch(completeTodo({ id: itemId, completed: true }));
    setIsEditEnabled(false);
  }
  return (
    <>
      <li className={data.completed ? "todo-list__item completed" : "todo-list__item"} id={data.id} title="">
        {
          isEditEnabled ? <input
            onChange={(e) => setUpdateValue(e.target.value)}
            type="text"
            className="form-control"
            value={updateValue} /> :
            <div className="__heading fs-5 fw-bold">{data.content}</div>
        }
        <div className="__buttons flex-shrink-0 d-flex gap-1">
          {
            isEditEnabled && !data.completed ?
              <div className="__edit" id={data.id} onClick={() => updateTodoHandler(data.id)}>
                <i className="fa-solid fa-check"></i>
              </div> : !data.completed ?
                <div className="__edit" id={data.id} onClick={() => editTodoHandler(data.content)}>
                  <i className="fa-solid fa-pencil"></i>
                </div> : <></>
          }
          {
            !data.completed &&
            <div className="__complete" id={data.id} onClick={() => completeTodoTaskHandler(data.id)}>
              <i className="fa-solid fa-check-square"></i>
            </div>
          }
          <div className="__delete" id={data.id} onClick={() => dispatch(removeTodo(data.id))}>
            <i className="fa-solid fa-trash-alt"></i>
          </div>
        </div>
      </li>
      {
        isAlreadyExist && <div class="alert alert-danger" role="alert">
          This <strong>"{updateValue}"</strong> Todo already exists in the list!
        </div>
      }
    </>
  )
}

export default TodoSingleItem