import "./CustomButton.Styles.css";

// eslint-disable-next-line react/prop-types
const CustomButton = ({ children }) => (
  <button className="custom-button" type="submit">
    {children}
  </button>
);

export default CustomButton;
