export const testEmail = (email) => {
  const pattern =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[x01-x08x0bx0cx0e-x1fx21x23-x5bx5d-x7f]|\\[x01-x09x0bx0cx0e-x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[x01-x08x0bx0cx0e-x1fx21-x5ax53-x7f]|\\[x01-x09x0bx0cx0e-x7f])+)\])/;

  return {
    valid: pattern.test(email),
    match: email.match(pattern),
  };
};

export const testValid = (input) => {
  const pattern = /[<>]/;

  return !pattern.test(input);
};

export const testUrl = (url) => {
  const pattern =
    /https?:\/\/(www\.)?[\w._-~:/?%#[\]@!$&'()*+,;=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([\w._-~:/?%#[\]@\-!$&'()*+,;=]*)/;

  return {
    valid: pattern.test(url),
    match: url.match(pattern),
  };
};
export const testStrength = (string) => {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
  return pattern.test(string);
};
