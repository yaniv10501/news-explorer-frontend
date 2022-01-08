export const testValid = (input) => {
  const pattern = /[<>]/;

  return !pattern.test(input);
};

export const testStrength = (string) => {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
  return pattern.test(string);
};
