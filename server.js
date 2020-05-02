const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = process.env.PORT || 5000;
const {MONGOURI} = require('./config/keys')

const cors = require("cors");
const stripe = require("stripe")("STRIPE_SECRET_KEY");
const uuid = require("uuid");

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
app.use(require('./routes/user'))


//stripe
app.use(cors());

app.get("/", (req, res) => {
  res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
});

app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

//stripe end





if(process.env.NODE_ENV=="production"){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}
// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});



