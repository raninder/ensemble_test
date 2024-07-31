import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const UpdateMovie = () => {
  const params = useParams();
  console.log("params", params.id)
  const [data, setData] = useState(null);
  const [title,setTitle] = useState('');
  const [year,setYear] = useState('');
  const [duration,setDuration] = useState('');
  const [description,setDescription] = useState('');
  const [rating,setRating] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/movies/${params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [params]);
// console.log("title111", data[0].title)
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const desc = form.desc.value;
    const year = form.year.value;
    const rating = form.rating.value;
    const duration = form.duration.value;

    const movieItem = {title, desc, year, duration, rating}

    axios.put(`http://localhost:8000/movies/${params.id}`, movieItem)
    .then(response => {
        alert('Movie updated');
      })
      .catch(err => {
        console.error(err);
      });
    }
  return (
     <div className='container'>
       <h1>Update Movie </h1>
       <div className='form'></div>
      { data &&
      <form onSubmit={(e)=>handleSubmit(e)}>
        <label id='title'>Title:</label>
        <input type="text" className='input' name="title" defaulValue={data[0].title} value={data[0].title} onChange={(e) => setTitle(e.target.value)}/>
        <label id='desc'>Description:</label>
        <textarea className='input1' name="desc" rows="5" cols="40" defaultValue={data[0].description} onChange={(e) => setDescription(e.target.value)} />
        <label id='year'>Year:</label>
        <input type="text" className='input' name="year" defaultValue={data[0].year} onChange={(e) => setYear(e.target.value)}/>
        <label id='duration'>Duration:</label>
        <input type="text" className='input' name="duration" defaultValue={data[0].duration} onChange={(e) => setDuration(e.target.value)}/>
        <label id='rating'>Rating:</label>
        <input type="text" className='input' name="rating" defaultValue={data[0].rating} onChange={(e) => setRating(e.target.value)} />
        <button type='submit'>Update</button>
      </form>
      }     
    </div>
  );
};

export default UpdateMovie;