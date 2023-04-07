import getAsyncStorageAliasPath from "../../../config/async-storage/root-path";

const ROOT_ALIAS = getAsyncStorageAliasPath("AuthenticationProvider");

function getStorageAlias(alias: string): string {
  return `${ROOT_ALIAS}${alias}`;
}

export const STORAGE_ALIASES = {
  user: getStorageAlias("user"),
  token: getStorageAlias("token"),
};
