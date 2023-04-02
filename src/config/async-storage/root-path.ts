const ASYNC_STORAGE_ROOT = "br.dev.kuhn.rn-template"; //TODO: get application package+appname with expo

function getAsyncStorageAliasPath(subpath: string): string {
    return `${ASYNC_STORAGE_ROOT}.${subpath}.`;
}

export default getAsyncStorageAliasPath;
