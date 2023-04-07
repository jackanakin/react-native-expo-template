import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

import User, { UserBuilder } from "../../@common/Authentication/entity/User";
import IAsyncJob from "../../../@types/async-job/IAsyncJob";
import { ISignInRequestDTO } from "../../@common/Authentication/dto/ISignInRequestDTO";
import { ChildrenProp } from "../../../@types/react-native/ChildrenProps";
import {
  NewRunningAsyncJob,
  NewSuccessAsyncJob,
} from "../../../@types/async-job/AsyncJob";
import IContextData from "../../@common/Provider/model/IContextData";
import { STORAGE_ALIASES } from "./constants/StorageAliases";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../config/api/api";

interface SignInContextData extends IContextData {
  user: User | null;

  signIn(signInDto: ISignInRequestDTO): Promise<void>;
  signOut(): Promise<void>;
}

const AuthenticationContext = createContext<SignInContextData>(
  {} as SignInContextData
);

const AuthenticationProvider: React.FC<ChildrenProp> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<IAsyncJob>(NewRunningAsyncJob);

  const signIn = async (signInDto: ISignInRequestDTO) => {
    if (status.isRunning()) return;

    try {
      const { login, password } = signInDto;
      setStatus(NewRunningAsyncJob);

      //   await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
      const user = new UserBuilder(
        "Jardel Kuhn",
        "jardelkuhn@gmail.com"
      ).build();

      await SecureStore.setItemAsync(STORAGE_ALIASES.token, "token");
      api.defaults.headers.authorization = `Bearer ${"token"}`;
      await AsyncStorage.setItem(STORAGE_ALIASES.user, user.toJson());

      setUser(user);

      setStatus(NewSuccessAsyncJob);
    } catch (error) {
      setUser(User.toNull());
      setStatus(status.doFail(""));
    }
  };

  const signOut = async () => {
    try {
      setStatus(NewRunningAsyncJob);

      await SecureStore.deleteItemAsync(STORAGE_ALIASES.token);
      api.defaults.headers.authorization = null;
      setUser(null);

      setStatus(NewSuccessAsyncJob);
    } catch (error) {
      setStatus(status.doFail(""));
    }
  };

  async function load(): Promise<void> {
    try {
      const authenticationStorage = await AsyncStorage.multiGet([
        STORAGE_ALIASES.user,
      ]);

      const userJson = authenticationStorage[0][1];
      const user = new User().parseJson(userJson);
      const token = await SecureStore.getItemAsync(STORAGE_ALIASES.token);

      if (!token || !user) {
        setStatus(NewSuccessAsyncJob);
      }

      api.defaults.headers.authorization = `Bearer ${token}`;

      setUser(user);

      setStatus(NewSuccessAsyncJob);
    } catch (error) {
      setStatus(status.doFail(""));
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        status,
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
