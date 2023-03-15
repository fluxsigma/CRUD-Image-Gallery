import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllbooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        console.log(res);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllbooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload(); //to refressh if everything works fine
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className="mainbody">
      <h1 className="maintext">Aditya's Gallery</h1>
    
      
        <Link to="/add" className="addtext"><button className="addbutton">Add Your Art </button></Link>
     

      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
      
            <h2 className="title">{book.title}</h2>
            <p className="description">{book.desc}</p>
            <span className="price">{book.price}</span>
      
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
  
            
            <Link to={`/update/${book.id}`}>Update</Link>
            </button>

            </div>
            
        ))}
      </div>

      
    </div>
    </>
  );
};

export default Books;
