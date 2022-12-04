import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { todosSelector } from '../store/reducers/todosSlice'
import TodoForm from './TodoForm'
import Todo from './Todo'
import { markComplete, deleteTodo, getTodos } from '../store/reducers/todosSlice'
import { useEffect } from 'react'

const Todos = () => {
    const todos = useSelector(todosSelector)

    const dispatch = useDispatch()

    const handleCompleted = id => {
        dispatch(markComplete(id))
    }

    const handleDelete = id => {
        dispatch(deleteTodo(id))
    }

    useEffect(() => {
        dispatch(getTodos())
    }, [dispatch])

    return (
        <div className='todo-list'>
            <TodoForm />
            <ul>
                {todos.map(todo =>
                    <Todo
                    id={todo.id}
                    completed={todo.completed}
                    title={todo.title}
                    onMark={handleCompleted}
                    onDelete={handleDelete}
                    />
                )}
            </ul>
        </div>
    )
}

export default Todos