import React from "react";
import { Navigate } from "react-router-dom";

function PublicRoute(props) {
  // If the user is authenticated, redirect to the home page
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    // If the user is not authenticated, render the component
    return props.children;
  }
}

export default PublicRoute;
