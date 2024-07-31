import { React, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function HomeExpress() {
    const [filtered, setFiltered] = useState();
    const [data, setData] = useState([]);
    const [inputText, setInputText] = useState("");
    const initLikes = new Array(20).fill(0);
    let [likes, setLikes] = useState(initLikes);
    let [unlikes, setUnLikes] = useState(initLikes);
 
  
    const navigate = useNavigate();
  
    useEffect(()=>{
        fetch("http://localhost:8000/movies/")
        .then((res) => res.json())
        .then((data) => {
            setData(data);
            setFiltered(data);
        }
        );
    },[])
    console.log("data", data)
    
    const getData = (inputText) => {
        const filteredItem = data.filter((item) =>
            item.title.toLowerCase().includes(inputText.toLowerCase())
          );
          setFiltered(filteredItem);
    };
  
    const add =()=> {
        navigate("/form")
    }
    const update =()=> {
        navigate("/update")
    }

    const handleLike=(index)=>{
        let tempLikes = likes.slice(0)
        tempLikes[index] = tempLikes[index] + 1
        setLikes(tempLikes)
      }

    const handleUnLike=(index)=>{
        let tempUnLikes = unlikes.slice(0)
        tempUnLikes[index] = tempUnLikes[index] + 1
        setUnLikes(tempUnLikes)
      }
      const handleDelete=(id)=>{
        console.log("id",id)
        axios
        .delete(`http://localhost:8000/movies/delete/${id}`) // <-- remove ;
        .then((res) => {
            console.log("thanks",res);
            alert('Movie deleted');
        })
        .catch(err => {
            console.error(err);
          });
        }

    return (
        <>
            <div className="search-container">
                <h1>Movies</h1>
                <input
                    name="movieName"
                    className="search"
                    type="text"
                    value={inputText}
                    placeholder="search movie title..."
                    onChange={(e) => setInputText(e.target.value)}
                />

                <button onClick={()=> getData(inputText)}>Search</button>
                <button className="add-btn" onClick={add}>Add Movie</button>
                <button className="add-btn" onClick={update}>Update Movie</button>
                </div>
        
                <div className="movie-container">
                    {filtered && 
                        filtered.map((item,index) => (
                            <div className="movie-data">
                                <h2>{item.title}</h2>
                                <h3>Year of Release: {item.year}</h3>
                                <p>Plot: {item.description}</p>
                                <h4>Duration: {item.duration}</h4>
                                <h4>Rating: {item.rating}</h4>
                                <button className="like-btn" onClick={() => handleDelete(item.title)}>Delete</button>
                                <Link to={`/movies/${item.id}`} >
                                    <button className="like-btn">Update</button>
                               </Link>
                                <div className="like-buttons">
                                    <button className="like-btn" onClick={() => handleLike(index)}>Likes:{likes[index]}</button>
                                    <button className="like-btn" onClick={() => handleUnLike(index)}>Dislikes:{unlikes[index]}</button>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                   
         </>
    );
}
