import { Navigate } from "react-router-dom";

const AuthGuard = (props: any) => {
  const authState = JSON.parse(localStorage.getItem("authState") || "{}");

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return props.children;
};

export default AuthGuard;
