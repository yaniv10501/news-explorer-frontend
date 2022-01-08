import { useState, useCallback } from 'react';
import { testEmail, testStrength, testValid } from './regex';

const useFormValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    let costumIsValid;
    const { name, value } = event.target;
    if (name === 'password') {
      const passwordInput = event.target;
      const passwordValue = passwordInput.value;
      if (passwordValue.length >= 6) {
        const isInputValid = testValid(passwordValue);
        if (isInputValid) {
          const isInputStrong = testStrength(passwordValue);
          if (!isInputStrong) {
            passwordInput.customMessage =
              'Please include at least 1 uppercase character, 1 lowercase character, and 1 number.';
            costumIsValid = false;
          } else {
            passwordInput.customMessage = '';
            costumIsValid = true;
          }
        } else {
          passwordInput.customMessage = 'Password is invalid';
          costumIsValid = false;
        }
      } else {
        passwordInput.customMessage = '';
      }
    }
    if (name === 'name') {
      const nameInput = event.target;
      const nameValue = nameInput.value;
      if (nameValue.length >= 2 && nameValue.length <= 30) {
        const isInputValid = testValid(nameValue);
        if (isInputValid) {
          nameInput.customMessage = '';
          costumIsValid = true;
        } else {
          nameInput.customMessage = 'Name is invalid';
          costumIsValid = false;
        }
      } else {
        nameInput.customMessage = '';
        costumIsValid = true;
      }
    }
    if (name === 'email') {
      const emailInput = event.target;
      const emailValue = emailInput.value;
      const isInputValid = testEmail(emailValue);
      if (isInputValid) {
        emailInput.customMessage = '';
        costumIsValid = true;
      } else {
        emailInput.customMessage = 'Enter an email address';
        costumIsValid = false;
      }
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.customMessage || event.target.validationMessage });
    setIsValid(costumIsValid ? event.target.closest('form').checkValidity() : false);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
};

export default useFormValidation;
