import React from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import moment from "moment";

// moment is a library used to work with dates and times

// This component is used to apply for a doctor account
function ApplyDoctor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      // Apply for a doctor account
      const response = await axios.post(
        "/api/user/apply-doctor-account",
        {
          // This is the data that is sent to the server
          ...values,
          userId: user._id,
          // Convert the time to a string
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      // If the doctor account is applied successfully, display a success message
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      }
      // If there is an error, display an error message
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />

      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
}

export default ApplyDoctor;
