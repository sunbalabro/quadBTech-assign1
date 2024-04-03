import { Input, Button } from 'antd'
import React, { useState } from 'react'
import { addTodo } from '../../reducer/reducer'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const AddingTodo = ({ todos, setTodos }) => {

  const dispatch = useDispatch()
  const [inputVal, setInputVal] = useState('')
  const handleChange = (e) => {
    setInputVal(e.target.value)
  }
  const addingTodo = () => {
   if(inputVal.length === 0){
    alert('Please Put Todo first !')
   }else{
    dispatch(addTodo({
      todoName: inputVal,
      id: uuidv4(),
      completed: false
    }))
    setInputVal('')
    console.log('successfully added in todo : ')
   }
    
  }
  return (
    <div>
      <Input type='text' onPressEnter={() => addingTodo()} onChange={(e) => handleChange(e)} style={{
        width: '60%',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        marginRight: '20px',
        marginBottom: '30px',
        fontSize: '20px'
      }} 
      
         value={inputVal}  

      />
      <Button onClick={() => addingTodo()}><FontAwesomeIcon icon={faPlus} style={{fontSize: '20px', color: '#7A199C'}} /></Button>
    </div>
  )

}