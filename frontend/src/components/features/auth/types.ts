export type AuthType = 'login' | 'register';

export type AuthApiResponseData = SuccessApiResponseData | ErrorApiResponseData;

type SuccessApiResponseData = {
  message?: string;
};

type ErrorApiResponseData = {
  statusCode: string;
  message: string;
  description?: string;
};

export type AuthApiData =
  | { successFetch: true; data: AuthApiResponseData }
  | { successFetch: false; message: string };
