import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../testing-utilities/testing-library-utils';
import Options from '../Options';

test('displays image for each scoop option from the server', async () => {
  render(<Options optionType="scoops" />);

  //find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop/i })
  expect(scoopImages).toHaveLength(2);

  //confirm alt images
  //@ts-ignore
  const altText = scoopImages.map(element => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping option from the server', async () => {
  render(<Options optionType="toppings" />);

  //find images
  const toppingImages = await screen.findAllByRole('img', { name: /topping/i })
  expect(toppingImages).toHaveLength(3);

  //confirm alt images
  //@ts-ignore
  const altText = toppingImages.map(element => element.alt);
  expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
});
test('don\'t update total if scoops input is invalid', async () => {
  render(<Options optionType="scoops" />);
  //find images
  const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i });

  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, "-1")

  const scoopsSubtotal = screen.getByText('Scoops total: $0.00')
  expect(scoopsSubtotal).toBeInTheDocument();
});