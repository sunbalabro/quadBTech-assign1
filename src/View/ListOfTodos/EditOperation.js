import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Form, Input, Popconfirm } from "antd";
import { editTodo } from "../../reducer/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

export const EditOperation = ({todo}) => {
    const [visible, setVisible] = useState(false);
    const [todoName, setTodoName] = useState(todo.todoName);
    const dispatch = useDispatch();
  
    const handleEdit = () => {
      dispatch(editTodo({ id: todo.id, todoName }));
      setVisible(false);
    };
  
    const handleCancel = () => {
      setVisible(false);
    };
  
    const showModal = () => {
      setVisible(true);
    };
  
    const handleTodoNameChange = (e) => {
      setTodoName(e.target.value);
    };
  
  return(

    <div>
      <Popconfirm title="Sure to edit?" onConfirm={showModal}> 
      <FontAwesomeIcon  icon={faPencil} style={{width: '30px' , fontSize: '25px' , color: '#B486C7'}}/>
      </Popconfirm>
      <Modal
        title="Edit Todo"
        visible={visible}
        onOk={handleEdit}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Todo Name">
            <Input
              value={todoName}
              onChange={handleTodoNameChange}
              placeholder="Enter todo name"
            />
          </Form.Item>
        </Form>
      </Modal>
    
    </div>
   )

 }