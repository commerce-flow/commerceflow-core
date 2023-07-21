export default class BaseError extends Error {
  protected code: string | undefined;
  protected severity: 'critical' | 'warning' | 'error' = 'error';

  constructor(message: string) {
    super(message);
  }
}
