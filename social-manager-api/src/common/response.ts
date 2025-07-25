export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
}

export function success<T>(
  message = 'Success',
  data?: T,
  statusCode = 200,
): ApiResponse<T> {
  return {
    statusCode,
    message,
    data,
  };
}

export function error<T = any>(
  message = 'Error',
  statusCode = 400,
  data?: T,
): ApiResponse<T> {
  return {
    statusCode,
    message,
    data,
  };
}
