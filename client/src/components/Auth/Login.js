import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthForm from "./AuthForm";
import { useDispatch } from "react-redux";
import { loginUser } from "../../modules/auth";
import {
  loginData,
  loginDataSuccess,
  loginDataFailure
} from "../../redux/authSlice";

const Login = ({ history }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const { email, password } = form;
  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.id]: e.target.value
    };
    setForm(nextForm);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    let data = {
      email,
      password
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        data
      );
      console.log(res.data);
      if (res.data.loginSuccess) {
        console.log("success", res.data.userId, typeof res.data.userId);
        dispatch(loginDataSuccess(res.data.userId));
        const a = await axios.get("/api/users/auth");
        console.log("a", a.data, a);
      } else {
        dispatch(loginDataFailure(res.data.message));
      }
    } catch (error) {
      dispatch(loginDataFailure(error));
      alert(error);
    }
  };
  useEffect(() => {
    dispatch(loginData());
  }, [dispatch]);

  return <AuthForm type="login" onChange={onChange} onSubmit={onSubmit} />;
};

export default Login;
