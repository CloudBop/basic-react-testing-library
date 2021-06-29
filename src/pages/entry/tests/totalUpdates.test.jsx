import { render, screen } from '../../../testing-utilities/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';
test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />)

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
  render(<Options optionType="toppings" />)

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
})

describe('grand total', () => {
  test('grand total starts @ $0.00', () => {
    render(<OrderEntry />)
    // 
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i
    })
    expect(grandTotal).toHaveTextContent('0.00');
  })
  test('grand total updates if scoop is added first', () => { })
  test('grand total updates if topping is added first', () => { })
  test('grand total updates if item is removed', () => { })
})