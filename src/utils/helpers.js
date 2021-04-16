const myCharset =
  'Lk3Kqzm7Arc4RHt0Ci89P5QwGvju6FMhJnOWNlBD1EdTaoxpXZgeI2sVfybUSY';

export const randomString = (length = 3, charset = myCharset) => {
  let res = '';
  while (length--) res += charset[(Math.random() * charset.length) | 0];
  return res;
};

export const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
