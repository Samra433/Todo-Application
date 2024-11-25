import React, { useState } from 'react';
import red_tick from '../assets/red_tick.png'
import not_tick from '../assets/not_tick.png'
import del from '../assets/del_icon.png'
import edit_Todo from '../assets/edit_Todo.png'

const Todoitems = ({text, id, isComplete,isEditing, deleteTodo, editTodo,toggleEdit, toggle}) => {
  
  const [newText, setNewText] = useState(text);
  const handleEditChange = (e) => {   
     setNewText(e.target.value);        
    };
    

    const handleSave = () => {          
        editTodo(id, newText);            
      };
  return (

    <div className='flex items-center my-3 gap-2'>


      <div  onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer'>
        <img className='w-5' src={isComplete ? red_tick : not_tick} alt="" />
        {isEditing ? (
          <>
            <input
              type="text"
              value={newText} 
              onChange={handleEditChange} 
              className="bg-slate-300 text-slate-700 text-[16px] ml-4 flex-1 h-7 pl-5 pr-2 border-none focus:outline-none placeholder:text-slate-600"
            />
            <button onClick={handleSave} className=" text-slate-100 text-[16px] ml-4 bg-red-500  h-7 pl-2 pr-2">Save</button>
          </>
        ) : (
          <p className={`text-slate-700 ml-4 text-[18px] decoration-rose-600 ${isComplete ? 'line-through' : ''}`}>
            {text}
          </p>
        )}
      </div>
      <img onClick={() => { toggleEdit(id) }} className='w-5 cursor-pointer' src={edit_Todo} alt="" />
      <img onClick={()=>{deleteTodo(id)}} className='w-4 cursor-pointer' src={del} alt="" />

    </div>
  )
}

export default Todoitems
