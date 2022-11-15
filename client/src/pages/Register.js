import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      // Show the loading indicator
      dispatch(showLoading());
      // Send the register request to the server
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading());
      // If the request is successful then show a success message and redirect the user to the login page
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        // If the request is not successful then show the error message
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <h1 className="py-2 title">OSMOSIS Healthcare Solutions</h1>
      <div className="authentication-form card p-3">
        <h1 className="card-title">Join Osmosis</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
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
            REGISTER
          </Button>

          <Link to="/login" className="anchor mt-2">
            Already a member? Login
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
