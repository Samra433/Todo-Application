import React, { useEffect,useRef, useState } from 'react'
import todo_icon from "../assets/todo_icon.png"
import Todoitems from './Todoitems'
const Todo = () => {
  const [todoList, setTodoList]= 
  useState(localStorage.getItem("todo")?
JSON.parse(localStorage.getItem("todo")): []);
  const inputRef= useRef();
  const add = ()=>{
    const inputText= inputRef.current.value.trim();
    if(inputText===""){
      return null;
    }
    const newTodo= {
      id:Date.now(),
      text:inputText,
      isComplete:false,
      isEditing: false,
    }
    setTodoList((prev)=>[...prev, newTodo]);
    inputRef.current.value="";
  }
  const deleteTodo =(id)=>{
    setTodoList((prevTodo)=>{
     return prevTodo.filter((todo)=> todo.id !== id)
    })
  }
  const editTodo = (id, newText) => {
    setTodoList((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
      )
    );
  };
  const toggleEdit = (id) => {
    setTodoList((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };
  
const toggle = (id)=>{
  setTodoList((prevTodo)=>{
    return prevTodo.map((todo)=>{
      if( todo.id === id){
        return {...todo, isComplete:!todo.isComplete}
      }
      return todo;
    })

  })
}
 useEffect(()=>{
  localStorage.setItem('todo', JSON.stringify(todoList))
 },[todoList])
 
  return (
    <div className='bg-slate-200 place-self-center w-10/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      
      <div className='flex justify-center my-6 gap-2'>
        <img className='size-9' src={todo_icon} alt="" />
        <h1 className=' text-4xl font-semibold'>To-Do List</h1>
      </div>

      <div className='flex items-center bg-slate-300 rounded-full my-3'>
        <input ref={inputRef} className='bg-transparent outline-none border-0 flex-1 h-14 pl-6 pr-2  placeholder:text-slate-600' type="text" placeholder='Add Task' />
        <button onClick={add} className='border-none rounded-full bg-red-500 w-28 h-14 text-gray-100 text-lg font-medium cursor-pointer'>ADD +</button>
      </div>

      <div>
        {todoList.map((item,index)=>{
          return <Todoitems key={index} text={item.text} id={item.id}
          isComplete={item.isComplete} isEditing={item.isEditing} deleteTodo={deleteTodo} editTodo={editTodo} toggleEdit={toggleEdit} toggle={toggle}/>
        })}
      </div>
    </div>
    
    
)}

export default Todo
