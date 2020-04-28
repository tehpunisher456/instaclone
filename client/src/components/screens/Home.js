import React, { useState, useEffect, useContext } from "react";
import {UserContext} from '../../App'
import{Link} from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState([]);
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    fetch("/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      })
  },[])

  const likePost = (id)=>{
    fetch('/like',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id
        })
    }).then(res=>res.json())
    .then(result=>{
             //   console.log(result)
      const newData = data.map(item=>{
          if(item._id==result._id){
              return result
          }else{
              return item
          }
      })
      setData(newData)
    }).catch(err=>{
        console.log(err)
    })
}
const unlikePost = (id)=>{
    fetch('/unlike',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id
        })
    }).then(res=>res.json())
    .then(result=>{
      //   console.log(result)
      const newData = data.map(item=>{
          if(item._id==result._id){
              return result
          }else{
              return item
          }
      })
      setData(newData)
    }).catch(err=>{
      console.log(err)
  })
}

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>{item.postedBy.userName}</h5>
            <div className="card-image">
              <img src={item.photo} alt="" />
            </div>
            <div className="card-content">

              {item.likes.includes(state._id)
              ? <i className="material-icons" style={{color:"red"}} onClick={()=>{unlikePost(item._id)}}> favorite </i>
              :
              <i className="material-icons" style={{color:"red"}} onClick={()=>{likePost(item._id)}}> favorite_border </i>
              }
     
          
              <h6>{item.likes.length} likes </h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="add a comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
