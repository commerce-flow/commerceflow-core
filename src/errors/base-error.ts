export default class BaseError extends Error {
  protected code: string | undefined;
  constructor(message: string) {
    super(message);
  }
}
