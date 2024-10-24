/* Validate email address and password */
export const validateEmailAndPassword = (
  email,
  password,
  setInputFieldError
) => {
  let invalid = false;

  if (email === "") {
    setInputFieldError("username", "This field is required");
    invalid = true;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    setInputFieldError("username", "Invalid email address");
    invalid = true;
  }

  if (password === "") {
    setInputFieldError("password", "This field is required");
    invalid = true;
  }

  return invalid;
};
