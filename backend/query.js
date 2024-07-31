
//setting connection to psql database
const Pool = require('pg').Pool
const pool = new Pool({
  // user: 'abc',
  host: 'localhost',
  database: 'api',
  // password: 'password',
  port: 5432,
})

//getting all movies
const getMovies = (req,res) => {
	pool.query('SELECT * FROM movies',(err,results)=>{
		if(err){
			throw error;
		}
		return res.json(results.rows);
	})
}

const getMovieById = (req,res) => {
	const id = req.params.id;
    console.log("get id", id);
	
	pool.query('SELECT * FROM movies where id= $1',[id],(err,results)=>{
		if(err){
			throw error;
		}
			return res.json(results.rows);
	})
}


const createMovie = (req,res)=> {
	const {title,desc, year, duration, rating} = req.body;
	
	pool.query('INSERT INTO movies(title, description, year, duration, rating) VALUES($1,$2, $3, $4, $5)',[title, desc,year, duration, rating],(err,results)=>{
		if(err){
			throw error;
		}
		res.send(`new movie added `)
		
	})
}


const deleteMovie = (req,res) => {
const title= req.params.id;
console.log("title del", title);
pool.query('DELETE FROM movies where title like $1',[title],(err,results)=>{
	if(err){
		throw error;
	}
	res.send(`movie deleted `)
	
})
}

const updateMovie = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, desc, year, duration, rating  } = request.body
    console.log("id, body", id, title)
  
    pool.query(
      'UPDATE movies SET title = $1, description = $2, year = $3, duration = $4, rating= $5 WHERE id = $6',
      [title, desc, year, duration, rating,id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

module.exports = {getMovies, getMovieById, createMovie, deleteMovie, updateMovie};