import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Form, Input, InputNumber, Popconfirm, Table } from 'antd';
import { useEffect, useState } from 'react';
import { completedTodo } from '../../reducer/reducer'
import { EditOperation } from './EditOperation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
export const ListOfTodos = ({ todo, setTodo }) => {
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [complete, setComplete] = useState(true)
  const EditableContext = React.createContext(null);
  const todoData = useSelector(state => state.todos)
  const dispatch = useDispatch()
  const [editableRow, setEditableRow] = useState(null);
  const isEditing = (record) => record.key === editableRow;
  useEffect(() => {
    console.log({ todoData })
    const newDataSource = todoData.map((item) => {
      return {
        id: item.id,
        todoName: item.todoName,
        completed: item.completed
      }
    });
    setDataSource(newDataSource);

  }, [todoData])

  const checkComplete = (record) => {
    const todoId = record.id
    dispatch(completedTodo(record))
    console.log(record)


  }
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
   const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditableRow(record.key);
  };
  const cancel = () => {
    setEditableRow(null);
  };
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataSource(newData);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  
  const handleDelete = (id) => {
    const newData = dataSource.filter((item) => item.id !== id);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'Completed',
      dataIndex: 'completed',
      width: '5%',
      render: (text, record) => (
        <input
          type="checkbox"
          checked={text}
          onChange={() => checkComplete(record)}
        />
      ),
      responsive: ['sm']
    },
    {
      title: 'todoName',
      dataIndex: 'todoName',
      width: '30%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '5%',
      render: (_, record) =>
        dataSource.length >= 1 && !record.completed ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <FontAwesomeIcon icon={faTrashAlt} style={{width: '30px' , fontSize: '25px' , color: '#B486C7'}} />
          </Popconfirm>
        ) : null,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '5%',
      render: (_, record) => {
        const editable = isEditing(record);
        return  !record.completed ? (
          <EditOperation todo={record} />
        ): null;
      },
    },
  
  ];
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const mergedColumns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  console.log({ todoData })

  return (
    <div className='tableWrapper'>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered  
        dataSource={dataSource}
        columns={mergedColumns}
        scroll={{ x: true }}
      />
    </div>
  )

}