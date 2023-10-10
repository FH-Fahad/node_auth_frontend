import "./Login.Styles.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const login = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });

      if (res.status === 200) {
        const data = await res.json();
        //console.log(data);

        localStorage.setItem("token", data.token);

        const { username, email } = data.user;
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);

        window.location.href = "/";
      } else {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      if (err.res && err.res.status >= 400 && err.res.status < 500) {
        setError(err.message);
      } else {
        setError("Incorrect email or password.");
      }
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <h2>I already have an account?</h2>

      <form onSubmit={handleSubmit}>
        {login.map((input) => (
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
            {`Don't`} have an accout?
            <Link className="link" to="/register">
              Register
            </Link>
          </p>
        </div>
        <CustomButton type="submit">LOGIN</CustomButton>
      </form>
    </div>
  );
};

export default Login;
