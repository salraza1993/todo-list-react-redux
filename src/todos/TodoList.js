import { useSelector, useDispatch } from 'react-redux';
import TodoSingleItem from './TodoSingleItem';
import { useRef } from 'react';
import { saveAll } from '../features/todos/todosSlice';
function TodoList() {
  let draggedItem = useRef();
  let draggedOverItem = useRef();

  const allTodos = useSelector(state => state.todo.todos);
  const dispatch = useDispatch();

  const onDragStartHandler = (itemId) => {
    draggedItem = itemId;
  };
  const onDragEnterHandler = (itemId) => {
    draggedOverItem = itemId;
  };
  const sortItemsHandler = () => {
    const clonedList = [...allTodos];
    const selectedItem = clonedList[draggedItem];
    const selectedToBeOverlapped = clonedList[draggedOverItem];
    clonedList[draggedItem] = selectedToBeOverlapped;
    clonedList[draggedOverItem] = selectedItem;
    dispatch(saveAll(clonedList))
  };
  
  return (
    <ul className="todo-list">
      {
        allTodos.length > 0 ? allTodos.map((todo, index) => { 
          return <TodoSingleItem itemIndex={index} key={index}
            data={todo}
            onDragEnterHandler={onDragEnterHandler} 
            onDragStartHandler={onDragStartHandler} 
            sortItemsHandler={sortItemsHandler}
            />;
        }) :
        <div className="alert alert-warning" role="alert">
          There are no todo lists available!
        </div>
      }
    </ul>
  )
}

export default TodoList