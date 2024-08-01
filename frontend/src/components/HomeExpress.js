import { React, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegThumbsUp } from "react-icons/fa";
import { MdOutlineThumbDown } from "react-icons/md";


export default function HomeExpress() {
    const [filtered, setFiltered] = useState();
    const [data, setData] = useState([]);
    const [inputText, setInputText] = useState("");
    const initLikes = new Array(20).fill(0);
    let [likes, setLikes] = useState(initLikes);
    let [Dislikes, setDislikes] = useState(initLikes);
    let [active,setActive] = useState('')
 
  
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
        //if active is empty or like or dislike
        let tempLikes = likes.slice(0);
        tempLikes[index] = tempLikes[index] + 1;
        setLikes(tempLikes);
        setActive('like')
        if(active==='dislike'){
            let tempDislikes = Dislikes.slice(0)
            tempDislikes[index] = tempDislikes[index] - 1
            setDislikes(tempDislikes)
        }
    }

    const handleDislike=(index)=>{
            let tempDislikes = Dislikes.slice(0)
            tempDislikes[index] = tempDislikes[index] + 1
            setDislikes(tempDislikes)
            setActive('dislike')
            if(active=='like'){
                let tempLikes = likes.slice(0)
                tempLikes[index] = tempLikes[index] - 1
                setLikes(tempLikes)
            }
      }
      const handleDelete=(id)=>{
        console.log("id",id)
        axios
        .delete(`http://localhost:8000/movies/delete/${id}`) 
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
                                <div className="group-buttons">
                                    <button className="del-btn" onClick={() => handleDelete(item.title)}>Delete</button>
                                    <Link to={`/movies/${item.id}`} >
                                        <button className="del-btn">Update</button>
                                </Link>
                               </div>
                                <div className="group-buttons">
                                    <button className="like-btn" onClick={() => handleLike(index)}><FaRegThumbsUp size='18'/>{likes[index]}</button>
                                    <button className="like-btn" onClick={() => handleDislike(index)}><MdOutlineThumbDown size='20'/>{Dislikes[index]}</button>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                   
         </>
    );
}
