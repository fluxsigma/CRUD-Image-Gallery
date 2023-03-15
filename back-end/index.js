// console.log("hello");

import  express  from "express";
import mysql from "mysql"
import cors from "cors"
/////////////////////////////////////////

const app = express()
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"aditya",
    database:"test"

})

//------------middle ware----------
app.use(express.json())  //to get data from body as a json
app.use(cors())

////////////////////////////////////////////
//server
app.get("/", (req,res)=>{
    res.json("hello buddy im backend")
})

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM test.books;"
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

// create
app.post("/books",(req,res)=>{
    const q = "INSERT INTO books (`title`, `desc`,`price`, `cover`) VALUES (?)"
    // const  values = ["title from backend", "desc from backend","cover from whatever"]

    //to get request from body (json format)
    const values =[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,

    ]

    db.query(q,[values],(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

// delete api

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE `id` = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  //update 

  app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });


app.listen(8800,()=>{
    console.log(`im backend localhost:8800`);
})