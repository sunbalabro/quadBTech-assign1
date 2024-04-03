import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [
    ]
}

export const todoSlice = createSlice({
    name: 'Todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const { id, todoName, completed } = action.payload;
            state.todos.push({ id, todoName, completed });
        },
        deleteTodo: (state, action) => {
            const newTodo = state.todos.filter(todo => todo.id != action.payload.id)
            state.todos = newTodo
        },
        completedTodo: (state, action) => {
            const todo = state.todos.find((item) => item.id == action.payload.id)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        editTodo: (state, action) => {
            const { id, todoName } = action.payload;
            const todoIndex = state.todos.findIndex((todo) => todo.id === id);
            state.todos[todoIndex].todoName = todoName;
        }
    }
})

export const { addTodo, deleteTodo, completedTodo, editTodo } = todoSlice.actions
