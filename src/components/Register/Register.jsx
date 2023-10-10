import "./Register.Styles.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";

const Register = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const register = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: true,
    },
    {
      id: 2,
      name: "email",
      // type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      required: true,
      // pattern: values.password,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });

      if (res.status === 201) {
        navigate("/login");
      } else if (res.status === 400) {
        setError("Please fill in all fields");
      } else if (res.status === 401) {
        setError("Email already exists.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <h2>{`Don't`} have an account?</h2>

      <form onSubmit={handleSubmit}>
        {register.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            // error={error}
          />
        ))}
        {error && <p className="error">{error}</p>}
        <div className="message">
          <p>
            Already have an accout?
            <Link className="link" to="/login">
              {" "}
              Login
            </Link>
          </p>
        </div>
        <CustomButton type="submit">REGISTER</CustomButton>
      </form>
    </div>
  );
};

export default Register;
