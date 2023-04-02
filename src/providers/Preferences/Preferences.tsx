import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as i18n from "../../i18n/i18n";
import IAsyncJob from "../../../@types/async-job/IAsyncJob";
import { ChildrenProp } from "../../../@types/react-native/ChildrenProps";
import { NewRunningAsyncJob } from "../../../@types/async-job/AsyncJob";
import { STORAGE_ALIASES } from "./constants/StorageAliases";
import { BooleanConstant } from "../../../@types/data/primitive";
import IContextData from "../../@common/Provider/model/IContextData";
import { Languages } from "../../i18n/languages";

interface PreferencesContextData extends IContextData {
  language: Languages;
  setNewLanguage(language: Languages): Promise<void>;
  showLandingScreen: boolean;
  disableLandingScreen(): Promise<void>;
}

const PreferencesContext = createContext<PreferencesContextData>(
  {} as PreferencesContextData
);

const PreferencesProvider: React.FC<ChildrenProp> = ({ children }) => {
  const [status, setStatus] = useState<IAsyncJob>(NewRunningAsyncJob);

  const [language, setLanguage] = useState<Languages>(Languages.pt_br);
  const [showLandingScreen, setShowLandingScreen] = useState<boolean>(true);

  const disableLandingScreen = async () => {
    await AsyncStorage.setItem(
      `${STORAGE_ALIASES.showLandingScreen}`,
      BooleanConstant.FALSE
    );

    setShowLandingScreen(false);
  };

  async function loadAsyncStoragePreferences(): Promise<void> {
    setStatus(NewRunningAsyncJob);

    const preferences = await AsyncStorage.multiGet([
      `${STORAGE_ALIASES.language}`,
      `${STORAGE_ALIASES.showLandingScreen}`,
    ]);

    const localLanguage = preferences[0][1] as Languages | null;
    const showLandingScreen = preferences[1][1] as BooleanConstant | null;

    if (localLanguage) {
      setLanguage(localLanguage);
      await i18n.init(localLanguage);
    } else {
      await i18n.init(language);
    }

    if (showLandingScreen == BooleanConstant.FALSE) {
      setShowLandingScreen(false);
    }

    setStatus(status.doSucceed());
  }

  const setNewLanguage = async (language: Languages) => {
    await AsyncStorage.setItem(`${STORAGE_ALIASES.language}`, language);
    i18n.init(language);
    setLanguage(language);
  };

  useEffect(() => {
    loadAsyncStoragePreferences();
  }, []);

  return (
    <PreferencesContext.Provider
      value={{
        status,
        language,
        setNewLanguage,
        showLandingScreen,
        disableLandingScreen,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

function usePreferences(): PreferencesContextData {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used within an PreferencesContext");
  }

  return context;
}

export { PreferencesProvider, usePreferences };
