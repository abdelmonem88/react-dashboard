import { Navigate } from "react-router-dom";

const AuthGuard = (props: any) => {
  const authState = JSON.parse(localStorage.getItem("authState") || "{}");

  if (authState.isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  return props.children;
};

export default AuthGuard;
