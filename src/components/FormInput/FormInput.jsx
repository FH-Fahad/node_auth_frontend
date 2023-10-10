import "./FormInput.Styles.css";

import { useState } from "react";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  // eslint-disable-next-line react/prop-types, no-unused-vars
  const { lable, error, onChange, id, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label>{lable}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        // eslint-disable-next-line react/no-unknown-property
        focused={focused.toString()}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default FormInput;
