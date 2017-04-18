export function isValidNumberInput(input) {
  const reg = /^$|\d+$/;
  return reg.test(input);
}
