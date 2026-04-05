import { createContext, useContext, useEffect, useReducer } from "react";
import type ProfileType from "../types/profile";

interface AuthState {
  isAuthenticated: boolean;
  user: ProfileType | null;
  jwtToken: string | null;
}

interface AuthContextType extends AuthState {
  logInSuccess: (jwtToken: string, user: ProfileType) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Action types
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const authReducer = (
  prevState: AuthState,
  action: { type: string; payload?: any },
) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        isAuthenticated: true,
        jwtToken: action.payload.jwtToken,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...prevState,
        isAuthenticated: false,
        jwtToken: null,
        user: null,
      };
    default:
      return prevState;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initialAuthState: AuthState = (() => {
    try {
      const storedToken = localStorage.getItem("jwtToken");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        return {
          isAuthenticated: true,
          jwtToken: storedToken,
          user: JSON.parse(storedUser),
        };
      }
    } catch (error) {
      console.log("Failed to load data from localstorage");
    }

    return {
      isAuthenticated: false,
      jwtToken: null,
      user: null,
    };
  })();

  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      if (authState.isAuthenticated) {
        localStorage.setItem("jwtToken", authState.jwtToken);
        localStorage.setItem("user", JSON.stringify(authState.user));
      } else {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [authState]);

  const logInSuccess = (jwtToken: string, user: ProfileType) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { jwtToken, user },
    });
  };

  const logOut = () => {
    dispatch({ type: LOGOUT });
  };

  const contextValue: AuthContextType = {
    ...authState,
    logInSuccess,
    logOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
