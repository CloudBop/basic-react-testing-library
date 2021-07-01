import { findByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// screen.debug prints DOM at that moment in time

test("order phases for happy path (golden path/way)", async () => {
  //rnder app
  render(<App />);

  const scoopOption = await screen.findByRole("spinbutton", { name: /Vanilla/i });
  // notice -> the above await will stop execution, guaranteeing this UI will be in DOM
  const extraScoopOption = screen.getByRole("spinbutton", { name: /Chocolate/i });
  userEvent.type(extraScoopOption, '2')
  userEvent.type(scoopOption, '1')

  // 
  const toppingOption = await screen.findByRole("checkbox", { name: /Cherries/i });
  //add toppings
  userEvent.click(toppingOption)
  expect(toppingOption).toBeChecked();

  //find and click order button
  const orderSummaryBtnSubmit = screen.getByRole('button', {
    name: /order sundae/i,
  })
  userEvent.click(orderSummaryBtnSubmit);

  //check summary information based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  // 3 scoops 
  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();
  // 1 topping
  const toppingsHeading = screen.getByRole("heading", { name: "Toppings: $1.50" });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();
  // // alternatively...
  // // const optionItems = screen.getAllByRole('listitem');
  // // const optionItemsText = optionItems.map((item) => item.textContent);
  // // expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries']);

  //accept terms and conditions and click btn to confirm order 
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i
  })
  userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm/i
  })
  userEvent.click(confirmOrderButton);

  //confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i
  })
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText({
    name: /thank you/i
  })
  expect(orderNumber).toBeInTheDocument();


  // re-initialise state

  // new order button
  const makeNewOrderButton = screen.getByRole('button', { name: /new order/i })
  userEvent.click(makeNewOrderButton)

  //check scoops + toppins subtotals have been reset
  const scoopsTotal = screen.getByText('Scoops total: $0.00')
  const toppingsTotal = screen.getByText('Toppings total: $0.00')
  expect(scoopsTotal).toBeInTheDocument();
  expect(toppingsTotal).toBeInTheDocument();

  //wait for items to reappear so that testing lib doesn't get angry about trying to re-hydrate (rendering updates) when tests are complete.
  await screen.findByRole('spinbutton', { name: /Vanilla/i })
  await screen.findByRole('checkbox', { name: /Cherries/i })
})