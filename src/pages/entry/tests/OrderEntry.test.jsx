import { render, screen, waitFor } from '@testing-library/react';
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

  // // will resolve on first response, but we're expecting from two async reqs
  // const alerts = await screen.findAllByRole('alert',
  //   // doesn't work... { name: "An unexpected error ocurred. Please try again later." }
  // )
  // expect(alerts).toHaveLength(2);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert',
      // doesn't work... { name: "An unexpected error ocurred. Please try again later." }
    )
    expect(alerts).toHaveLength(2);
  })

})