import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event'

test("init conditions", () => {
  // https://www.w3.org/TR/wai-aria/#role_definitions
  // https://github.com/testing-library/jest-dom
  render(<SummaryForm />);
  // find an element with a role of button and text of 'Change to Midnight'
  const cb = screen.getByRole('checkbox', { name: /terms and conditions/i });
  expect(cb).not.toBeChecked();

  const confirmBtn = screen.getByRole('button', { name: /confirm order/i });
  expect(confirmBtn).toBeDisabled();
})

test("checking checkbox enables button, clicking again disables the button", () => {
  // https://www.w3.org/TR/wai-aria/#role_definitions
  // https://github.com/testing-library/jest-dom
  render(<SummaryForm />);
  // find an element with a role of button and text of 'Change to Midnight'
  const cb = screen.getByRole('checkbox', { name: /terms and conditions/i });
  expect(cb).not.toBeChecked();

  userEvent.click(cb)
  expect(cb).toBeChecked();

  const confirmBtn = screen.getByRole('button', { name: /confirm order/i });
  expect(confirmBtn).toBeEnabled();

  userEvent.click(cb)
  expect(cb).not.toBeChecked();
  expect(confirmBtn).toBeDisabled();
})

test("popover responds to hover evt", async () => {
  render(<SummaryForm />);

  //popover starts hidden
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
  expect(nullPopover).not.toBeInTheDocument();

  //popover appears on hover
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  userEvent.hover(termsAndConditions)
  const popover = screen.getByText(/no ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument()

  //popover disappears on mouse out - WILL FAIL SYNC/ASYNC ERROR
  // userEvent.unhover(termsAndConditions)
  // const nullPopoverAgain = screen.queryByText(/no ice cream will actually be delivered/i)
  // expect(nullPopoverAgain).not.toBeInTheDocument();
  userEvent.unhover(termsAndConditions)
  // includes assertion
  // const nullPopoverAgain = screen.queryByText(/no ice cream will actually be delivered/i)
  await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i))
})

// test("button+checkbox is default initialised", () => {
//   render(<App />);
//   const colorButton = screen.getByRole('button', { name: "Change to Midnight Blue" });
//   expect(colorButton).toBeEnabled();
//   const enableCheckbox = screen.getByRole('checkbox');
//   expect(enableCheckbox).not.toBeChecked();
// })