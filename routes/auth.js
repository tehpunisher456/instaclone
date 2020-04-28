const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')

// Verify User Token Middleware
router.get('/protected',requireLogin, (req, res)=>{
    res.send("hello user")
})

// User Signup Route

router.post("/signup", (req, res) => {
  const { name, email, password, userName } = req.body;
  if (!email || !password || !name || !userName) {
    res.status(422).json({ error: "please fill out all the fields" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "An account with that email already exists" });
    }
    bcrypt.hash(password, 12)
      .then((hashedpassword) => {
        const user = new User({
          email,
          password:hashedpassword,
          name,
          userName,
        });
        user.save().then((user) => {
          res.json({ message: "User saved successfully" });
        });
      })
      .catch((err) => {
        consolelog(err);
      });
  }).catch(err=>{
      console.log(err)
  });
});

// User Signin Route

router.post('/signin', (req,res)=>{
    const{userName, password}= req.body
    if(!userName || !password){
        res.status(422).json({error: "Invalid username or password."})
    }
    User.findOne({userName: userName})
    .then(savedUser=>{
        if(!savedUser){
            res.status(422).json({error: "User does not exist."})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message: "Sign in successful"})
                const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                res.json({token: token})
            }
            else{
                return res.status(422).json({error: "Invalid username or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router;
