import React from 'react';

import './FormInput.css';

const FormInput = ({
  handleChange,
  htmlFor,
  label,
  textarea,
  ...otherProps
}) => {
  return (
    <div className="group">
      <label htmlFor={htmlFor} className="form-input-label">
        {label}
      </label>
      {!textarea && (
        <input className="form-input" onChange={handleChange} {...otherProps} />
      )}
      {textarea && (
        <textarea onChange={handleChange} {...otherProps} rows="4" />
      )}
    </div>
  );
};

export default FormInput;
