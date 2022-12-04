import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import axios from "axios"

//
export const getTodos = createAsyncThunk('todos/getAllTodos', async() =>{
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    return res.data
})

export const addTodo = createAsyncThunk('todos/addTodo', async title => {
    const newTodo = {
        id: nanoid(),
        title,
        completed: false
    }
    await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo)
    return newTodo
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async id => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    return id
})

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        allTodos: []
    },

    reducers: {
        markComplete(state, action) {
            state.allTodos = state.allTodos.map(todo => {
                if (todo.id === action.payload)
                    todo.completed = !todo.completed
                return todo
            })
        },

    },
    extraReducers: {
        //Get Todos
        [getTodos.fulfilled]: (state, action) => {
            console.log('Fetching data done')
            state.allTodos = action.payload
        },

        // Add new todo
        [addTodo.fulfilled]: (state, action) => {
            console.log('Add new data done')
            state.allTodos.unshift(action.payload)
        },

        //Delete todo
        [deleteTodo.fulfilled]: (state, action) => {
            console.log('Delete data done')
            state.allTodos = state.allTodos.filter(todo => 
                todo.id !== action.payload)
        }
    }
})


//Reducer
const todosReducer = todosSlice.reducer

//Selector
export const todosSelector = state => state.todosReducer.allTodos

// Actions export
export const {markComplete} = todosSlice.actions

export default todosReducer