import { Button, Form, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      // Send the login request to the server
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      // If the login is successful, save the token in the local storage
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        // Navigate to the home page
        navigate("/");
      } else {
        // If the login is not successful, show the error message
        toast.error(response.data.message);
      }
    } catch (error) {
      // If there is an error, show the error message
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <h1 className="py-2 title">OSMOSIS Healthcare Solutions</h1>
      <div className="authentication-form card p-3">
        <h1 className="card-title">Sign in to Osmosis</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            LOGIN
          </Button>

          <Link to="/register" className="anchor mt-2">
            New here? Create an account
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
