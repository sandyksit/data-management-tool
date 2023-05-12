import React, { createContext, useContext, useState , useEffect} from "react";
import Login from "components/login";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login, register } from "services/user";
import { actions } from "redux/reducers/alert";
import { actions as userActions } from "redux/reducers/user";

export const AuthContext = createContext({
  isAuthenticated: false,
  authenticationError: false,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = (props) => {
  const { user } = useSelector(state => state.user)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    useState();

  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('Authorization')) {
      setIsAuthenticated(true);
      getProfile()
    }
  }, []);

  const getProfile = async() => {
    const response = await getUser()
    if(response?.error) {
      dispatch(actions.set({message:response?.error?.message}))
    }else {
      dispatch(userActions.set(response?.data))
    }
  }

  const signOut = () => {
    //clearing all the sessions
    dispatch({ type: "SIGN_OUT" });
    setIsAuthenticated(false);
    localStorage.removeItem('Authorization')
  };

  const loginHandler = async (payload) => {
    setIsLoading(false)
   const response = await login(payload)
   if(response?.error) {
      dispatch(actions.set({message:response?.error?.message}))
      setIsLoading(false)
   }else {
    setIsLoading(false)
    authenticationHandler(response)
   }
  };

  const signUpHandler = async (payload) => {
    setIsLoading(false)
   const response = await register(payload)
   if(response?.error) {
      dispatch(actions.set({message:response?.error?.message}))
      setIsLoading(false)
   }else {
    setIsLoading(false)
    authenticationHandler(response)
   }
  };

  const authenticationHandler = async (params) => {
    const accessToken = params.token;
    localStorage.setItem("Authorization", accessToken);
    setIsAuthenticated(true);
  };

  const onLoginClick = (params) => {
    const payload = {
      email: params.email,
      password: params.password,
    };

    setIsLoading(true);
    loginHandler(payload);
  };

  const handleOnRegister = (param)=> {
    setIsRegister(param)
  }

  if (!isAuthenticated)
    return <Login loginHandler={onLoginClick} isRegister={isRegister} signUpHandler={signUpHandler} handleOnRegister={handleOnRegister} isLoading={isLoading} />;

  if (isAuthenticated && isLoading)
    return (
      <div style={{ margin: "50px 0", textAlign: "center" }}>
        <Spin />
      </div>
    );

    return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        userFullName: user?.name,
        signOut: signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
