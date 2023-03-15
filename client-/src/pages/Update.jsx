import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom';

const Update= () => {
const [book,setBook]=useState({
  title:"" ,
  desc: "",
  price: null, 
  cover: "",
})

const navigate = useNavigate()
const location = useLocation()

console.log(location);

const bookId = location.pathname.split("/")[2];
console.log(bookId);


const handelChange = (e)=>{
    setBook((prev)=>({...prev,[e.target.name]:e.target.value}));
}

// console.log(book);
const handelClick = async (e)  =>{
    e.preventDefault()
    try{
        await axios.put("http://localhost:8800/books/" + bookId , book)
        navigate("/")
    }
    catch(err){

        console.log(err);

    }
}


  return (
    <div className='form'>
    <h1> Update Your Art</h1>
    <input type="text" placeholder='title' onChange={handelChange} name="title"/>
    <input type="text" placeholder='desc' onChange={handelChange} name="desc"/>
    <input type="text" placeholder='price' onChange={handelChange} name="price"/>
    <input type="text" placeholder='cover' onChange={handelChange} name="cover"/>
   
   <button className='formbutton' onClick={handelClick}>
    Update Illustration
   </button>

    </div>
  )
}

export default Update

