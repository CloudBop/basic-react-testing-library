import { render, screen, waitFor } from '../../../testing-utilities/testing-library-utils';
import { rest } from 'msw';
import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server.js'
import userEvent from '@testing-library/user-event';
test('handles errors for scoops and topping routes', async () => {
  //reset handlers from default setup
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => res(ctx.status(500))),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => res(ctx.status(500)))
  )
  render(<OrderEntry setOrderPhase={jest.fn()} />)
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

test("disable order btn if there are no scoops ordered", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  let orderButton = screen.getByRole('button', { name: /order sundae/i })
  expect(orderButton).toBeDisabled();

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: "Vanilla"
  })
  //
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, "1")
  expect(orderButton).toBeEnabled()

  //
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, "0")
  expect(orderButton).not.toBeEnabled()
})