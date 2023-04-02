export default interface IAsyncJob {
  status: AsyncJobStatus;
  message?: string;

  doSucceed(): IAsyncJob;
  doFail(message: string): IAsyncJob;

  isRunning(): boolean;
  isFailed(): boolean;
  isIdle(): boolean;

  getMessage(): string;
}

export enum AsyncJobStatus {
  IDLE = 0,
  RUNNING = 1,
  SUCCESS = 2,
  FAILED = 3,
  EMPTY = 4,
}
