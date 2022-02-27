import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { UserOutlined, LoadingOutlined, LockFilled } from "@ant-design/icons";
import { signup } from "store/slices/authSlice";

export default function SignUp() {
  //redux state Management
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authApi.currentUser?.userId);

  //states
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //routing
  const history = useHistory();

  //formik
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: Yup.object().shape({
        name: Yup.string()
          .required("Email is required")
          .min(5, "set a name between 5 to 20 chars")
          .max(20, "set a name between 5 to 20 chars"),
        email: Yup.string().required("Email is required"),
        password: Yup.string()
          .min(5, "set a password between 5 to 16 chars")
          .max(16, "set a password between 5 to 16 chars")
          .required("Password is a required"),
        confirmPassword: Yup.string()
          .min(5, "set a password between 5 to 16 chars")
          .max(16, "set a password between 5 to 16 chars")
          .required("Password confirmation is a required"),
      }),
      onSubmit: async ({ email, password, name, confirmPassword }, fn) => {
        setLoading(true);
        setError(null);
        if (password !== confirmPassword) {
          setError("Password confirmation doesn't match password!");
          setLoading(false);
          return;
        }
        try {
          await dispatch(
            signup({ email, password, displayName: name })
          ).unwrap();
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
        <h3 className="form__title">SIGN UP</h3>
        <div className="form__input__group">
          {error && <b className="form__alert__danger">{error}</b>}
        </div>
        <div className="form__input__group">
          <label className="form__input__label">Name</label>
          <div className="form__input__wrapper">
            <UserOutlined className="form__input__icon" />
            <input
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form__input"
              placeholder="Enter your Name"
            />
          </div>
          {touched.name && errors.name ? (
            <p className="form__alert__danger">{errors.name}</p>
          ) : null}
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
        <div className="form__input__group">
          <label className="form__input__label">Confirm Password</label>
          <div className="form__input__wrapper">
            <LockFilled className="form__input__icon" />
            <input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form__input"
              placeholder="Confirm your password"
            />
          </div>
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="form__alert__danger">{errors.confirmPassword}</p>
          )}
        </div>
        {loading ? (
          <LoadingOutlined className="form__spinner" />
        ) : (
          <button type="submit" className="form__btn">
            LET'S GO
          </button>
        )}
      </form>
    </section>
  );
}
