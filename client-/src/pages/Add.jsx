import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
const [book,setBook]=useState({
  title:"" ,
  desc: "",
  price: null, 
  cover: "",
})

const navigate = useNavigate()

const handelChange = (e)=>{
    setBook((prev)=>({...prev,[e.target.name]:e.target.value}));
}

// console.log(book);
const handelClick = async (e)  =>{
    e.preventDefault()
    try{
        await axios.post("http://localhost:8800/books" , book)
        navigate("/")
    }
    catch(err){

        console.log(err);

    }
}


  return (
    <div className='form'>
    <h1>Add New Art</h1>
    <input type="text" placeholder='title' onChange={handelChange} name="title"/>
    <input type="text" placeholder='desc' onChange={handelChange} name="desc"/>
    <input type="text" placeholder='price' onChange={handelChange} name="price"/>
    <input type="text" placeholder='cover' onChange={handelChange} name="cover"/>
   
   <button className='formbutton' onClick={handelClick}>
    Add your Illustration
   </button>

    </div>
  )
}

export default Add