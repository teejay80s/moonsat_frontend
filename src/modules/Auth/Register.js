import React, { useState } from "react";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import moonsatLogo from "../../assets/moonsat-no-bg.png";
import { useIsMutating } from "@tanstack/react-query";
import { useRegister } from "./hooks";
import { errorAlert } from "../../utils";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    name: "",
  });
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState("");
  const [passwordLengthMsg, setPasswordLengthMsg] = useState("");
  const { mutate, isSuccess, isError, reset, error } = useRegister();
  const isLoading = useIsMutating();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordMsg("Passwords do not match. Please check.");
    } else {
      setConfirmPasswordMsg("");
    }

    if (formData.password.length < 6) {
      setPasswordLengthMsg("Password should be at least 6 characters.");
    } else {
      setPasswordLengthMsg("");
    }
    if (
      formData.password === formData.confirmPassword &&
      formData.password.length >= 6
    ) {
      mutate(formData);
    }
  };

  if (isSuccess) {
    reset();
    navigate("/app/dashboard");
  }
  if (isError) {
    errorAlert(error);
    reset();
  }

  return (
    <div className={styles.App}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={moonsatLogo} alt="moonsat-logo" />
        </Link>
      </div>
      <div className={styles.header}>Hi There!</div>
      <p className={styles.description}>This won’t be long</p>
      <form className={styles["form-container"]} onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <div className={styles["input-container"]}>
            <input
              className={styles["name-input"]}
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className={styles["form-group"]}>
          <div className={styles["input-container"]}>
            <input
              className={styles["email-input"]}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        {passwordLengthMsg && (
          <p style={{ color: "red" }}>
            Password should be at least 6 characters
          </p>
        )}
        <div className={styles["form-group"]}>
          <div className={styles["input-container"]}>
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        {confirmPasswordMsg && (
          <p style={{ color: "red" }}>
            {" "}
            Confirm Password does not match with password please check
          </p>
        )}
        <div className={styles["form-group"]}>
          <div className={styles["input-container"]}>
            <input
              className={styles.input}
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <button
          className={styles["submit-button"]}
          disabled={isLoading ? true : false}
          type="submit"
        >
          {isLoading ? "loading" : "Sign up"}
        </button>
      </form>
    </div>
  );
}

export default Register;
