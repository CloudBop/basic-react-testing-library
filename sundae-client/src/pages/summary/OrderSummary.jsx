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
  const toppingArray = Array.from(orderDetails.toppings.entries())
  const toppingListItems = toppingArray.map(([key, value]) => (
    <li key={key}> {key} </li>
  ))
  //
  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopListItems}</ul>
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      <ul>{toppingListItems}</ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  )
}

export default OrderSummary
