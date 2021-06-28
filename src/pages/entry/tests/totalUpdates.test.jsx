import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
test('update sccop subtotal when scoops change', async () => {
  // render(<Options optionType="scoops" />)

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