import { render, screen } from '../../../testing-utilities/testing-library-utils';
import { rest } from 'msw';
import { server } from '../../../mocks/server.js'
import OrderConfirmation from '../OrderConfirmation'
// import userEvent from '@testing-library/user-event';
test('handles server error on confirmation', async () => {
  //reset handlers from default setup
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (req, res, ctx) => res(ctx.status(500))),

  )
  render(<OrderConfirmation setOrderPhase={jest.fn()} />)

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent(
    'An unexpected error occured. Please try again later.'
  )
})