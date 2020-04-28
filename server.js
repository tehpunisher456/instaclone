const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const app = express();
const PORT = process.env.PORT || 3000;
const {MONGOURI} = require('./config/keys')




// // Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }


// Connect to the Mongo DB
mongoose.connect(MONGOURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=>{
  console.log("connected to mongo")
})
mongoose.connection.on('error', ()=>{
  console.log("could not connect to mongo", err)
})

// Models
require('./models/user')
require('./models/post')


// Routes

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))




// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

