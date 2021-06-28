import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

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

  fireEvent.click(cb)
  expect(cb).toBeChecked();

  const confirmBtn = screen.getByRole('button', { name: /confirm order/i });
  expect(confirmBtn).toBeEnabled();

  fireEvent.click(cb)
  expect(cb).not.toBeChecked();
  expect(confirmBtn).toBeDisabled();
})

// test("button+checkbox is default initialised", () => {
//   render(<App />);
//   const colorButton = screen.getByRole('button', { name: "Change to Midnight Blue" });
//   expect(colorButton).toBeEnabled();
//   const enableCheckbox = screen.getByRole('checkbox');
//   expect(enableCheckbox).not.toBeChecked();
// })