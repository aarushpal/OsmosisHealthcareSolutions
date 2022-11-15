import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { showLoading, hideLoading } from "../redux/alertsSlice";

// This component is used to protect routes that require authentication
function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        { token: localStorage.getItem("token") },
        {
          // This is required to send the token in the request header
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        // If the user is authenticated, set the user in the redux store
        dispatch(setUser(response.data.data));
      } else {
        // If the user is not authenticated, redirect to the login page
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      // Clear the token in local storage and redirect to the login page
      localStorage.clear();
      navigate("/login");
    }
  };

  // This useEffect is used to check if the user is authenticated
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  // If the user is authenticated, render the component
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
