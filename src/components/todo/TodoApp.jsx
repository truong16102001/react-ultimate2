import TodoAdd from './TodoAdd';
import TodoData from './TodoData';
import reactLogo from '../../assets/react.svg'
import { useState } from 'react';
const TodoApp = () =>{
    const [todoList, setTodoList] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const addNew = (inputValue) => {
        const newInput = {id: randomIntFromInterval(1,1000000), input: inputValue}
        setTodoList([...todoList, newInput]); // use spread to add newInput to array
    }

    const handleDelete = (itemId) => {
        const isConfirmed = window.confirm(
          `Do you want to remove item with id = ` + itemId,
        );
        if (isConfirmed) {
          setTodoList(todoList.filter((item) => item.id !== itemId));
        }
    };

    const handleUpdate = (itemId) => {
        const itemToEdit = todoList.find((item) => item.id === itemId);
        if (itemToEdit) {
            setCurrentItem(itemToEdit);
            setIsUpdateModalOpen(true);
        }
    };

    return (
      <>
        <div className="todo-container">
          <div className="todo-title">Todo List</div>
          <TodoAdd addNew={addNew} />
          {todoList.length > 0 ? (
            <TodoData
              todoList={todoList}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ) : (
            <div className="todo-image">
              <img className="logo" src={reactLogo} alt="react logo" />
            </div>
          )}
        </div>
        {isUpdateModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <input
                type="text"
                value={currentItem?.input || ""}
                onChange={
                  (event) =>
                    setCurrentItem({
                      ...currentItem,
                      input: event.target.value,
                    }) //giữ các trường khác của currentItem và chỉ thay đổi trường input
                }
              />
              <button
                onClick={() => {
                  setTodoList(
                    todoList.map((item) =>
                      item.id === currentItem.id
                        ? { ...item, input: currentItem.input }
                        : item,
                    ),
                  );
                  setIsUpdateModalOpen(false);
                }}
              >
                Save
              </button>
              <button onClick={() => setIsUpdateModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </>
    );
}

export default TodoApp;