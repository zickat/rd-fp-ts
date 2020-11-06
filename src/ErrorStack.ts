export class ErrorStack extends Error {
  trace: string[] = [];
  originalError: Error;

  private constructor(e: Error, message: string) {
    super(message);
    this.originalError = e;

    // if(Error.captureStackTrace) {
    //   console.log(message);
    //   Error.captureStackTrace(e, ErrorStack);
    // }
  }

  static fromErrorAndMessage(e: ErrorStack | Error, errorMessage: string) {
    const message = `${e.message} - ${errorMessage}`;

    const rawError = e instanceof ErrorStack ? e.originalError : e;

    const error = new ErrorStack(rawError, message);

    if (e instanceof ErrorStack) {
      error.trace = [...e.trace, errorMessage];
    } else {
      error.trace = [errorMessage];
    }

    return error;
  }
}
