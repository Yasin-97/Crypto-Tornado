import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UserOutlined, LoadingOutlined, LockFilled } from "@ant-design/icons";
import { signin } from "store/slices/authSlice";

export default function AuthForm() {
  //state Management
  const dispatch = useDispatch();

  //states
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //routing
  const history = useHistory();

  //formik functions
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string()
          .min(5, "set a password between 5 to 16 chars")
          .max(16, "set a password between 5 to 16 chars")
          .required("Password is a required"),
      }),
      onSubmit: async ({ email, password }, fn) => {
        setLoading(true);
        setError(null);
        try {
          await dispatch(signin({ email, password })).unwrap();
          fn.resetForm();
          history.push("/");
        } catch (err) {
          setError(err.message || "Opps..! Failed to authenticate you.");
        }
        setLoading(false);
      },
    });

  return (
    <section className="form__wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="form__title">SIGN IN</h3>
        <div className="form__input__group">
          {error && <b className="form__alert__danger">{error}</b>}
        </div>
        <div className="form__input__group">
          <label className="form__input__label">Email</label>
          <div className="form__input__wrapper">
            <UserOutlined className="form__input__icon" />
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form__input"
              placeholder="Enter your email"
            />
          </div>
          {touched.email && errors.email ? (
            <p className="form__alert__danger">{errors.email}</p>
          ) : null}
        </div>
        <div className="form__input__group">
          <label className="form__input__label">Password</label>
          <div className="form__input__wrapper">
            <LockFilled className="form__input__icon" />
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form__input"
              placeholder="Enter your password"
            />
          </div>
          {touched.password && errors.password && (
            <p className="form__alert__danger">{errors.password}</p>
          )}
        </div>
        {loading ? (
          <LoadingOutlined className="form__spinner" />
        ) : (
          <button type="submit" className="form__btn">
            LET'S GO
          </button>
        )}
        <div className="form__login__signup__reference">
          <span>Don't have an account?</span>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </section>
  );
}
