type AuthContextType = {
  authState: AuthStateType;
  login: (email: string, password: string) => void;
  logout: () => void;
};

type AuthStateType = {
  isAuthenticated: boolean;
  user: {
    email: string;
    password: string;
  } | null;
};

type AuthProviderPropsType = {
  children: React.ReactNode;
};

export type { AuthContextType, AuthStateType, AuthProviderPropsType };
