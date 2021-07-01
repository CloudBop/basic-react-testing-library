import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

test.only('indicate if scoop count is !int or oob', async () => {
  // mock updateItemCount || tests will break
  render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()} />)

  const vanillaInput = screen.getByRole('spinbutton');

  // !negative
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '-1')
  expect(vanillaInput).toHaveClass('is-invalid')

  //!int
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1.5')
  expect(vanillaInput).toHaveClass('is-invalid')

  //toobig
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '11')
  expect(vanillaInput).toHaveClass('is-invalid')

  //ok
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '4')
  expect(vanillaInput).not.toHaveClass('is-invalid')
})