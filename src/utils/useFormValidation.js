import { useState, useCallback } from 'react';
import { testStrength, testValid } from './regex';

const useFormValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'password') {
      const passwordInput = event.target;
      const passwordValue = passwordInput.value;
      if (passwordValue.length >= 6) {
        if (testValid(passwordValue)) {
          if (!testStrength(passwordValue)) {
            passwordInput.customMessage =
              'Please include at least 1 uppercase character, 1 lowercase character, and 1 number.';
          } else {
            passwordInput.customMessage = '';
          }
        } else {
          passwordInput.customMessage = 'Password is invalid';
        }
      } else {
        passwordInput.customMessage = '';
      }
    }
    if (name === 'name') {
      const nameInput = event.target;
      const nameValue = nameInput.value;
      if (nameValue.length >= 2 && nameValue.length <= 30) {
        if (testValid(nameValue)) {
          nameInput.customMessage = '';
        } else {
          nameInput.customMessage = 'Name is invalid';
        }
      } else {
        nameInput.customMessage = '';
      }
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.customMessage || event.target.validationMessage });
    setIsValid(event.target.closest('form').checkValidity());
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
