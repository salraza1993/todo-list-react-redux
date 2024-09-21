import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo } from '../features/todos/todosSlice';

function AddNew() {
  const allTodos = useSelector(state => state.todo.todos);
  const input_value_min_length = 3;

  const dispatch = useDispatch();
  
  const [isAlreadyExist, setIsAlreadyExist] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputHandler = (event) => { 
    setInputValue(event.target.value)
    setIsAlreadyExist(false);
  };
  const inputValidation = (value) => {
    if (value.length < input_value_min_length) {
      setError(true);
      setIsValid(false);
      setErrorMessage(`Input Value cannot be less than ${input_value_min_length}`);
    } else {
      setError(false);
      setErrorMessage('');
      setIsValid(true);
    }
    return error;
  }
  const addNewTodoHandler = (e) => {
    e.preventDefault();   
    if (inputValue != '' && !inputValidation(inputValue)) {
      const isAlreadyAvailable = allTodos.some(todo => todo.content === inputValue);
      if (isAlreadyAvailable) {
        setIsAlreadyExist(true);
      } else {
        dispatch(addNewTodo(inputValue));
        setIsAlreadyExist(false);
        setInputValue('')
        setError(false);
        setErrorMessage('');
        setIsValid(false);
      }
    } else {
      new Error('Something went wrong');
    }
  }
  return (
    <>
      <form onSubmit={addNewTodoHandler} action="">
        <div className="todo-input-block rounded p-3 mb-4">
          <label htmlFor="todo_entry" className="form-label fw-semibold">Enter your ToDo Heading</label>
          <div className="d-flex gap-2 align-items-start">
            <div className="d-flex flex-column w-100">
              <input
                value={inputValue}
                onInput={(e) => inputValidation(e.target.value)}
                onChange={(e) => inputHandler(e)}
                type="text"
                name="todo_entry"
                id="todo_entry"
                className={error ? "form-control is-invalid" : isValid ? "form-control is-valid" : "form-control"}
                placeholder="Enter your ToDo Item..." />
              {
                error && <small className="error-message text-danger fw-semibold">
                  {errorMessage}
                </small>
              }
            </div>
            <button type="button" id="submit_button" onClick={addNewTodoHandler} className="btn btn-primary col-4 px-1">
              <i className="fa-solid fa-plus me-2 "></i>
              <span className="__text">Add ToDo Item</span>
            </button>
          </div>
        </div>
        {
          isAlreadyExist && <div class="alert alert-danger" role="alert">
            This <strong>"{inputValue}"</strong> Todo already exists in the list!
          </div>
        }
      </form>
    </>
  )
}

export default AddNew