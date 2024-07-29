import React, { useState } from "react";
import "./signIn.css";
import FormInput from "../../components/formInput/FormInput";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";

const SignIn = () => {
  const initialValues = {
    username: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = useState(initialValues);

  const userInput = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
    },
    {
      id: 3,
      name: "country",
      type: "text",
      placeholder: "Country",
      label: "Country",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { confirmPassword, ...reqData } = values;
      const res = await axios.post(`/auth/register`, reqData);
      setValues(initialValues);
    } catch (error) {}
  };

  return (
    <>
      <Navbar />
      <div className="sign-in">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Register</h1>
          {userInput.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button className="submit" type="submit">
            Submit
          </button>
          <span className="text">
            Already a user?{" "}
            <a href="/login" className="login-link">
              Log In
            </a>
          </span>
        </form>
      </div>
    </>
  );
};

export default SignIn;
