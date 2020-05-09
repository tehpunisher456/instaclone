import React,{useState,useEffect,useContext} from 'react'
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import {UserContext} from '../../App'
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// import "./styles.css";

toast.configure();

function Checkout() {
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
 
   const [product] = React.useState({
     name: "Otter-shaped Tape Dispenser",
     price: 12.00,
     description: "Cool car",
     image: "https://images-na.ssl-images-amazon.com/images/I/71kieVNLOWL._AC_SL1001_.jpg",
     description: "The dummy product is Otter tape dispenser"
   });

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "/checkout",
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div>

    <div className="row card home-card">

      {/* <h5 style={{ padding: "5px" }}>
      <Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile"}>{item.postedBy.userName}</Link> {item.postedBy._id == state._id
        && <i className="material-icons" style={{
          float: "right"
        }}
          onClick={() => deletePost(item._id)}
        >delete</i>

      }</h5> */}

      <div className="col s12">
      <h5 className="product-name">Randomusername</h5>
        <div className="card-image product-image">
          <img src="https://images-na.ssl-images-amazon.com/images/I/71kieVNLOWL._AC_SL1001_.jpg" />
        </div>
      </div>

      <div className="col s12 card-content">
        <div className="product">
         
          <h3 className="product-price">$12.00</h3>
          <p>An Otter tape dispenser</p>
        </div>
        <StripeCheckout
          stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
          token={handleToken}
          amount={product.price * 100}
          name={product.name}
          billingAddress
          shippingAddress
          label="Pay with Stripe"
        />
      </div>
    </div>


  </div>
  );
}

export default Checkout;

