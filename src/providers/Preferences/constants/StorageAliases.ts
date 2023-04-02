import getAsyncStorageAliasPath from "../../../config/async-storage/root-path";

const ROOT_ALIAS = getAsyncStorageAliasPath("PreferencesProvider");

function getStorageAlias(alias: string): string {
  return `${ROOT_ALIAS}${alias}`;
}

export const STORAGE_ALIASES = {
  language: getStorageAlias("language"),
  showLandingScreen: getStorageAlias("showLandingScreen"),
};
