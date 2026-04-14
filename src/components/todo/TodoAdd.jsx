import { useState } from "react"
const TodoAdd = ({addNew}) => {

    const [inputValue, setInputValue] = useState("") // init = empty, similar getter and setter value

    const handleChange = (input) => {
        setInputValue(input) // set entered input to inputValue 
    }

    const handleClick = () => {
        addNew(inputValue)
        setInputValue("")
    }

    return(
        <div className='todo-new'>
            <input type="text" value={inputValue} onChange={(event) => {handleChange(event.target.value)}}/>
            <button onClick={handleClick}>Add</button>
        </div>
    )
}

export default TodoAdd;