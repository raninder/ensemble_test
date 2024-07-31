const express = require('express');
const cors = require("cors");
const db = require('./query.js')
const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.use(cors())

app.get("/", (req,res)=> {
    res.json({message:"testing"})
    })
    
    //endpoints for movies 
    app.get('/movies',db.getMovies);
    app.get('/movies/:id',db.getMovieById);
    app.post('/movies/add',db.createMovie);
    app.delete('/movies/delete/:id',db.deleteMovie)
    app.put('/movies/:id', db.updateMovie)

app.listen(8000, ()=>{
    console.log("server running on localhost:8000")
})
