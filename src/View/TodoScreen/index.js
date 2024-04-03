import React, { useState } from 'react'
import { AddingTodo } from '../AddingTodo'
import { ListOfTodos } from '../ListOfTodos'
import '../../Style/todoStyle.css'
export const TodoScreen = (props) => {
    const [todos , setTodos] = useState([])
  return(
    <div className='todoContainer'>
      <h1>Todo List</h1>
        <AddingTodo todos={todos} setTodos={setTodos} />
        <ListOfTodos todos={todos} setTodos={setTodos} />
    </div>
   )

 }