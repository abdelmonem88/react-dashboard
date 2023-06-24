import { createContext, useReducer } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { authReducer } from "../reducers";
import {
  AuthContextType,
  AuthStateType,
  AuthProviderPropsType,
} from "../types";

export const AuthContext = createContext<AuthContextType>({
  authState: { isAuthenticated: false, user: null },
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderPropsType) => {
  const initialState: AuthStateType = { isAuthenticated: false, user: null };

  const [authState, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    if (email === "admin@admin.com" && password === "123456") {
      dispatch({ type: "LOGIN", payload: { email, password } });
      localStorage.setItem(
        "authState",
        JSON.stringify({ isAuthenticated: true, user: { email } })
      );
      toast.success("Welcome back!");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("authState");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
