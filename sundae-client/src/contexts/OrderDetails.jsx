import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { pricePerItem } from '../constants/index'

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount)
}

const OrderDetails = createContext();
//
export function useOrderDetails() {
  const context = useContext(OrderDetails);
  if (!context) {
    throw new Error(
      "useOrderDetails must be wrapped inside of an OrderDetailsProvider provider"
    )
  }
  return context
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  // loop through map
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
}

// provider component
export function OrderDetailsProvider(props) {
  //
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map()
  })
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency
  })

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts)
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts)
    const grandTotal = formatCurrency(scoopsSubtotal + toppingsSubtotal)

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal
    })
  }, [optionCounts])

  const value = useMemo(() => {
    // TODO UPDATE see comment @eof
    function updateItemCount(itemName, newItemCount, optionType) {
      // this codeblock is a little dodgy, mutable state as newOptionCounts points to same memory as optionsCount 
      const newOptionCounts = { ...optionCounts };
      // update option count for this item with the new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount))
      setOptionCounts(newOptionCounts);
    }
    //getter: object containing counts for scoops and toppings, totals, subtotals
    //setter: updateOptionCount
    return [{ ...optionCounts, totals }, updateItemCount]
  }, [optionCounts, totals])
  //
  return <OrderDetails.Provider value={value} {...props} />;
}



// immutable maps see earlier TODO comment

// function updateItemCount(itemName, newItemCount, optionType) {
//   setOptionCounts((prevState) => {
//     // get option Map and make a copy
//     const { [optionType]: optionMap } = prevState;
//     const newOptionMap = new Map(optionMap);

//     // update the copied Map
//     newOptionMap.set(itemName, parseInt(newItemCount));

//     // create new object with the old optionCounts plus new map
//     const newOptionCounts = { ...prevState };
//     newOptionCounts[optionType] = newOptionMap;

//     return newOptionCounts;
//   });
// }