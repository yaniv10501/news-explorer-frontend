import { useState, useCallback } from 'react';
import { testStrength, testValid } from './regex';

const useFormValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      const passwordInput = e.target;
      const passwordValue = passwordInput.value;
      if (passwordValue.length > 6) {
        if (testValid(passwordValue)) {
          if (!testStrength(passwordValue)) {
            passwordInput.customMessage =
              'Please include at least 1 uppercase character, 1 lowercase character, and 1 number.';
          }
        } else {
          passwordInput.customMessage = 'Password is invalid';
        }
      }
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.customMessage || e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
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
