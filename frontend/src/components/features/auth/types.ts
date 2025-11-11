import { ErrorApiResponseData } from '../../../types/ErrorApiResponseData';

export type AuthType = 'login' | 'register';

export type AuthApiResponseData = SuccessApiResponseData | ErrorApiResponseData;

type SuccessApiResponseData = {
  message?: string;
};
