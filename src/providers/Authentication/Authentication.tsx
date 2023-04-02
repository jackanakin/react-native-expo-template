import React, { createContext, useState, useContext, useEffect } from "react";

import { IUser } from "../../@common/Authentication/entity/IUser";
import IAsyncJob from "../../../@types/async-job/IAsyncJob";
import { ISignInRequestDTO } from "../../@common/Authentication/dto/ISignInRequestDTO";
import { ChildrenProp } from "../../../@types/react-native/ChildrenProps";
import {
  NewIdleAsyncJob,
  NewRunningAsyncJob,
  NewSuccessAsyncJob,
} from "../../../@types/async-job/AsyncJob";
import IContextData from "../../@common/Provider/model/IContextData";

interface SignInContextData extends IContextData {
  user: IUser | null;

  signIn(signInDto: ISignInRequestDTO): Promise<void>;
  signOut(): Promise<void>;
}

const AuthenticationContext = createContext<SignInContextData>(
  {} as SignInContextData
);

const AuthenticationProvider: React.FC<ChildrenProp> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [status, setStatus] = useState<IAsyncJob>(NewIdleAsyncJob);

  const signIn = async (signInDto: ISignInRequestDTO) => {
    if (status.isRunning()) return;

    let user: IUser | null = null;

    try {
      const { login, password } = signInDto;

      setStatus(NewRunningAsyncJob);

      //   await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
      user = { email: "jardelkuhn@gmail.com", name: "Jardel Kuhn" };

      setStatus(NewSuccessAsyncJob);
    } catch (error) {
      setStatus(status.doFail(""));
    }

    setUser(user);
  };

  const signOut = async () => {
    try {
      setUser(null);
      //   signOutWithFirebase();
    } catch (error) {
      setStatus(status.doFail(""));
    }
  };

  const resetStatus = () => {
    setStatus(NewIdleAsyncJob);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        status,
        resetStatus,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

function useAuthentication(): SignInContextData {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider"
    );
  }

  return context;
}

export { AuthenticationProvider, useAuthentication };
