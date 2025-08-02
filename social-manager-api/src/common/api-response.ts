export class ApiResponse<T> {
  readonly status: number;
  readonly message: string;
  readonly data?: T;

  constructor(status: number, message: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static success<T>(
    data: T,
    message = 'Success',
    status = 200,
  ): ApiResponse<T> {
    return new ApiResponse(status, message, data);
  }

  static error<T>(message: string, status = 500, data?: T): ApiResponse<T> {
    return new ApiResponse(status, message, data);
  }
}
