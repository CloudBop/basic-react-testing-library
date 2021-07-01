import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Button from "react-bootstrap/Button"
import { useOrderDetails } from '../../contexts/OrderDetails';
function OrderConfirmation({ setOrderPhase }) {

  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      // in real world would get order from ctx and sned with post
      .post('http://localhost:3030/order')
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch(error => {
        //todo
      })

  }, [])

  function handleClick() {
    // the below doesn't seem to reset in tests...
    resetOrder();
    // 
    setOrderPhase('inProgress');
    // setTimeout(() => {
    // }, 0)
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "0.25rem" }}>
          as per our terms and conditions, nothing will happen now.
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    )
  } else {
    return (
      <div>
        Loading...
      </div>
    )
  }
}

export default OrderConfirmation
