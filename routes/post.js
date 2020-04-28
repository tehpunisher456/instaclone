const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")


// route to get all posts
router.get('/allposts', requireLogin, (req,res)=>{
    Post.find()
    .populate("postedBy", "userName")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

// creating a post
router.post('/createpost', requireLogin, (req,res)=>{
    const {title, body, pic} = req.body
    if(!title || !body ||!pic){
      return res.status(422).json({error:"Please fill all the  fields for the post"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo: pic,
        postedBy: req.user
    })
    post.save().then(result =>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

// only get a signed in user's  posts 
router.get('/myposts', requireLogin, (req, res)=>{
    Post.find({postedBy: req.user._id})
    .populate("postedBy", "userName")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

// Like and Unlike Posts
router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

module.exports = router 