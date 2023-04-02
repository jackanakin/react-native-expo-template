import IAsyncJob from "../../../../@types/async-job/IAsyncJob";

export default interface IContextData {
  status: IAsyncJob;
  resetStatus?(): void;
}
