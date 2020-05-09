import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
const Home  = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
       fetch('/allpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.posts)
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

    const makeComment = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
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

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
   return (
       <div className="home row">
           {
               data.map(item=>{
                   return(
                    
                    <div className="col s12">
                       <div className="card home-card" key={item._id}>
                       <div className="product-userID-home  ">
                            <h5 className = "main-background-color card-title-color" style={{padding:"5px"}}><Link className = "navbar-link-color" to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.userName}</Link> {item.postedBy._id == state._id 
                            && <i className="material-icons" style={{
                                float:"right"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>

                            }</h5>
                            </div>
                            <div className="card-image">
                                <Link to="/checkout"> 
                                <img src={item.photo} alt="" className="product-image-home"/>
                                </Link>
                            </div>
                            <div className="card-content">

                            <div className="likes-box">
                            {item.likes.includes(state._id)
                            ? 
                             <i className="material-icons likes-icon"style={{ color: "red" }}
                                    onClick={()=>{unlikePost(item._id)}}
                              >favorite</i>
                            : 
                            <i className="material-icons likes-icon"style={{ color: "red" }}
                            onClick={()=>{likePost(item._id)}}
                            >favorite_border</i>
                            }
                           <h6 className="likes-numbers">{item.likes.length} likes</h6>
                           <h6 className="product-price-home">${item.price}</h6>
                           
                           </div>

                                <h6 className="product-name-home">{item.title}</h6>
                                
                                 <p>{item.body}</p>
                                {
                                    item.comments.map(record=>{
                                        return(
                                        <h6 className="commentname" key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.userName}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form> 
                                
                            </div>
                        </div> 
                        </div>
                        
                   )
               })
           }
          
          
       
       </div>
   )
}


export default Home