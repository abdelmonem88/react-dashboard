import { createContext, useReducer } from "react";
import { toast } from "react-toastify";

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
  const initialState: AuthStateType = { isAuthenticated: true, user: null };

  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = (email: string, password: string) => {
    if (email === "admin@admin.com" && password === "123456") {
      dispatch({ type: "LOGIN", payload: { email, password } });
      toast.success("Welcome back!");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
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
