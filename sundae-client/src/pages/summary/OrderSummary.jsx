import React from 'react'
import { useOrderDetails } from '../../contexts/OrderDetails'
import SummaryForm from './SummaryForm';
function OrderSummary({ setOrderPhase }) {

  const [orderDetails] = useOrderDetails()
  const scoopArray = Array.from(orderDetails.scoops.entries())
  const scoopListItems = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ))

  let toppingsDisplay = null;
  const hasToppings = orderDetails.toppings.size > 0;
  if (hasToppings) {
    const toppingArray = Array.from(orderDetails.toppings.entries())
    const toppingListItems = toppingArray.map(([key, value]) => (
      <li key={key}> {key} </li>
    ))

    toppingsDisplay = (
      <>
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
        <ul>{toppingListItems}</ul>
      </>
    )

  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopListItems}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  )
}

export default OrderSummary
