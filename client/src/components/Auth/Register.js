import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthForm from "./AuthForm";
import axios from "axios";
import {
  postData,
  postDataFailure,
  postDataSuccess
} from "../../redux/authSlice";
import { registerUser } from "../../modules/auth";
const Register = ({ history }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });
  const { name, email, password, passwordConfirm } = form;

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
      name,
      email,
      password,
      passwordConfirm
    };
    console.log("data", data);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        data
      );
      if (res.data.success === true) {
        dispatch(postDataSuccess());
      } else {
        dispatch(postDataFailure(res.data.err));
        alert("Mongo error");
      }
    } catch (error) {
      dispatch(postDataFailure(error));
      alert(error);
    }
  };
  //const user = useSelector((state) => state.users);
  //console.log(form);
  //console.log('user', user);
  useEffect(() => {
    dispatch(postData());
  }, [dispatch]);
  return (
    <div>
      <div>
        <AuthForm type="register" onChange={onChange} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Register;
