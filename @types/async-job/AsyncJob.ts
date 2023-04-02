import IAsyncJob, { AsyncJobStatus } from "./IAsyncJob";

export class AsyncJob implements IAsyncJob {
  status: AsyncJobStatus;
  message?: string;

  constructor(status: AsyncJobStatus, message?: string) {
    this.status = status;
    this.message = message;
  }

  doFail(message: string): IAsyncJob {
    return new AsyncJob(AsyncJobStatus.FAILED, message);
  }

  doSucceed(): IAsyncJob {
    return new AsyncJob(AsyncJobStatus.SUCCESS);
  }

  isRunning(): boolean {
    return this.status === AsyncJobStatus.RUNNING;
  }

  isFailed(): boolean {
    return this.status === AsyncJobStatus.FAILED;
  }

  isIdle(): boolean {
    return this.status === AsyncJobStatus.IDLE;
  }

  getMessage(): string {
    if (!this.message || typeof this.message != "string") {
      return "TextPick.Common.CommonStates.unknownEror";
    }

    return this.message;
  }
}

export const NewIdleAsyncJob = new AsyncJob(AsyncJobStatus.IDLE);
export const NewRunningAsyncJob = new AsyncJob(AsyncJobStatus.RUNNING);
export const NewSuccessAsyncJob = new AsyncJob(AsyncJobStatus.SUCCESS);
export const NewEmptyAsyncJob = new AsyncJob(AsyncJobStatus.EMPTY);
