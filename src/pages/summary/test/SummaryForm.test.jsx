import { render, screen } from '@testing-library/react';
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

test("popover responds to hover evt", () => {
  //popover starts hidden

  //popover appears on hover

  //popover disappears on mouse out
})

// test("button+checkbox is default initialised", () => {
//   render(<App />);
//   const colorButton = screen.getByRole('button', { name: "Change to Midnight Blue" });
//   expect(colorButton).toBeEnabled();
//   const enableCheckbox = screen.getByRole('checkbox');
//   expect(enableCheckbox).not.toBeChecked();
// })