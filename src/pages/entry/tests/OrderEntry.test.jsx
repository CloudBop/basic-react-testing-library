import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server.js'

test('handles errors for scoops and topping routes', async () => {
  //reset handlers from default setup
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => res(ctx.status(500))),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => res(ctx.status(500)))
  )


  render(<OrderEntry />)

  const alerts = await screen.findAllByRole('alert', { name: "An unexpected error ocurred. Please try again later." })

  expect(alerts).toHaveLength(2);
})