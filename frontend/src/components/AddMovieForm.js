import { useState } from 'react';
import axios from 'axios';

export default function AddMovieForm() {
  const [title, setTitle]  = useState('')
  const [desc, setDesc] = useState('')
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [duration, setDuration] = useState(null);


    const handleSubmit = (e) =>{
      e.preventDefault();
      const url ="http://localhost:8000/movies/add";
      console.log("title", title)
      const movieItem = {title, desc, year, duration, rating}
      console.log("movieItem", movieItem)
      axios.post(url, movieItem)
      .then(res => {
        console.log("resonse",res);
        alert('Movie added');

      });
    }
   
  

  return(
   
    <div className='container'>
       
       <div className='form'>
          
           <h1> Let's add Movie</h1>
           <form onSubmit={handleSubmit}>
              <label id='title'>Title:</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Movie Title'
                type='text'
                className='input'
              />
              <label id='desc'>Description:</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder='Plot'
                type='text'
                className='input1'
                rows="5"
                cols="30"
              />
             
              <label id='year'>Year:</label>
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder='Year of Release'
                type='text'
                className='input'
              />

              
              <label id='duration'>Duration:</label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder='Duration'
                type='text'
                className='input'
              />

              <label id='rating'>Rating:</label>
              <input
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder='Rating'
                type='text'
                className='input'
              />
              <button type='submit'>Add</button>
            </form>
         </div>   
    </div>
    )

}

