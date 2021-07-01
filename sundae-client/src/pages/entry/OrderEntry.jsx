import React from 'react'
import Button from 'react-bootstrap/Button'
import { useOrderDetails } from '../../contexts/OrderDetails'
import Options from './Options'
function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const orderDisabled = false;
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button disabled={orderDisabled} onClick={() => setOrderPhase('review')}>
        Order Sundae!
      </Button>
    </div>
  )
}

export default OrderEntry