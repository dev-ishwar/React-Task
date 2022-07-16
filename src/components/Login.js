import React, { useState } from "react";
import classes from "./Login.module.css";

//Logic to check if sum of password digits is 10
function checkIf10(num) {
  let temp = 0;
  while (num !== 0) {
    temp = temp + (num % 10);
    num = parseInt(num / 10);
  }
  return temp;
}

//Login component
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const emailIsValid = email.trim() !== "" && email.trim().includes("@");
    const passwordIsValid =
      password.length !== 0 && checkIf10(password) === 10 ? true : false;
    const formIsValid = emailIsValid && passwordIsValid;
    props.setFormValidity(formIsValid);

    setEmail("");
    setPassword("");
  };

  return (
    <div className={classes.login}>
      <div className={classes.header}>Login Page</div>

      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.formControls}>
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={emailChangeHandler}
          />
        </div>

        <div className={classes.formControls}>
          <div className={classes.password}>
            <label htmlFor="password">Password</label>
            <span
              className={classes.tooltip}
              data-tooltip="4 digits long and sum of digits must be
            10."
            >
              ?
            </span>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            title={`Password should be number only. 4 digits long and sum of digits should be 10`}
            pattern="[0-9]*"
            maxLength="4"
            required
            onChange={(e) =>
              setPassword((v) => (e.target.validity.valid ? e.target.value : v))
            }
            className={classes["password-input"]}
            value={password}
          />
        </div>
        <button type="submit" className={classes.submitBtn}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Login;
