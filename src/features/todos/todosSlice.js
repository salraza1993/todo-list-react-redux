import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getTodayDate } from "../../common/common";
import { loadTodosFromLocalStorage, saveTodosToLocalStorage } from "../localStorage/localStorage";

const initialState = {
  todos: loadTodosFromLocalStorage()
};



export const todosSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addNewTodo: (state, action) => { 
      console.log(action.payload);
      const newTodo = {
        id: nanoid(),
        content: action.payload,
        date: getTodayDate(),
        completed: false,
      }
      state.todos.push(newTodo)      
      saveTodosToLocalStorage(state.todos);
    },
    updateTodo: (state, action) => {
      const { id, content } = action.payload;
      console.log('id: ', id, 'content: ', content);
      const todo = state.todos.find((item) => item.id === id);
      if (todo) {
        todo.content = content;
        saveTodosToLocalStorage(state.todos)
      }
    },
    completeTodo: (state, action) => {
      const { id, completed } = action.payload;
      const todo = state.todos.find((item) => item.id === id);
      if (todo) {
        todo.completed = completed;
        saveTodosToLocalStorage(state.todos)
      }
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
      saveTodosToLocalStorage(state.todos)
    }
  }
});

export const { addNewTodo, removeTodo, updateTodo, completeTodo } = todosSlice.actions;

export default todosSlice.reducer;