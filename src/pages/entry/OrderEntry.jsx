import React from 'react'
import Options from './Options'
function OrderEntry() {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: $0.00</h2>
    </div>
  )
}

export default OrderEntry