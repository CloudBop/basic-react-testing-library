import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import Options from '../Options';
test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider })

  // init total to 0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla'
  })
  // clear text
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate'
  })
  // clear text
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6.00');
})


test('update toppings subtotal when topping change', async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider })

  // init total to 0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  //update topping option
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries'
  })
  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge'
  })
  expect(cherriesCheckbox).not.toBeChecked()
  expect(hotFudgeCheckbox).not.toBeChecked()
  //+cherries
  userEvent.click(cherriesCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('1.50')
  //+ hotfudge
  userEvent.click(hotFudgeCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('3.00')


  //-hotfudge
  userEvent.click(cherriesCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('1.50')


  // // clear text
  // userEvent.clear(vanillaInput)
  // userEvent.type(vanillaInput, '1')
  // expect(toppingsSubtotal).toHaveTextContent('2.00');

  // // update chocolate scoops to 2
  // const chocolateInput = await screen.findByRole('checkbox', {
  //   name: 'Chocolate'
  // })
  // // clear text
  // userEvent.clear(chocolateInput)
  // userEvent.type(chocolateInput, '2')
  // expect(toppingsSubtotal).toHaveTextContent('6.00');
})