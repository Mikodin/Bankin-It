/* eslint jsx-a11y/img-has-alt: 0 */

export function isValidNumberInput(input) {
  const reg = /^$|\d+$/;
  return reg.test(input);
}
