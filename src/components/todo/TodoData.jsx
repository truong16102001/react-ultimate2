const TodoData = (props) =>{
    const {todoList, handleDelete, handleUpdate} = props; // use object destructuring
    return (
        <div className="todo-data">
           {
            todoList.map((item, index) => {
                return (
                  <div className="todo-item" key={item.id}>
                    <div>
                      ID: {item.id} - Value: {item.input}
                    </div>
                    <button onClick={() => handleUpdate(item.id)}>Update</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                );
            })
           }
        </div>
    )
}

export default TodoData;