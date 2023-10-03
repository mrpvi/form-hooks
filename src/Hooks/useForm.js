import { useState, useRef } from 'react';
import YupValidate from '../utils/YupValidate';

const useForm = (initialValues, validationSchema, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef('')

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    let currentValues;
    if (formRef.current && initialValues == null) {
      const formData = new FormData(formRef.current);
      currentValues = Object.fromEntries(formData)
    }else {
      currentValues = values
    }
    YupValidate(validationSchema, currentValues, setErrors)
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let currentValues;
    if (formRef.current && initialValues == null) {
      const formData = new FormData(formRef.current);
      currentValues = Object.fromEntries(formData)
    }else {
      currentValues = values
    }

    YupValidate(validationSchema, currentValues, setErrors)
    if (Object.keys(errors).length == 0) {
      onSubmit(currentValues)
      setIsSubmitting(true)
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit: handleFormSubmit,
    isSubmitting,
    formRef
  };
};

export default useForm;