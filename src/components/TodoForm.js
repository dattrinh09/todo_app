import React, { useState } from 'react'
import { useRef } from 'react'
import { addTodo } from '../store/reducers/todosSlice'
import { useDispatch } from 'react-redux'

const TodoForm = () => {
    const [title, setTitle] = useState('')
    const inputRef = useRef()

    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        if(title !== ''){
            dispatch(addTodo(title))
        }
        setTitle('')
        inputRef.current.focus()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />  
                <input
                    type="submit"
                    value="Add"
                />
            </form>
        </div>
    )
}

export default TodoForm