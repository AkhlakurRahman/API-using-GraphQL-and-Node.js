import React from 'react';

import './FormInput.css';

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="group">
      <label className="form-input-label">{label}</label>
      <input className="form-input" onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default FormInput;
