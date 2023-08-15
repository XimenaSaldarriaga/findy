import React, { createContext, useReducer, useContext, useEffect } from 'react';

const initialState = {
  userId: null,
  isAuthenticated: false,
};

const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userId: action.payload.userId,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        userId: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      dispatch({ type: SET_USER, payload: { userId: storedUserId } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
