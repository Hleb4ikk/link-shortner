import { ApiData } from '../../../types/ApiData';
import { CreateLinkResponse, GetLinksResponse } from './types/LinksResponse';

const createLink = async (
  url: string,
  title?: string,
): Promise<ApiData<CreateLinkResponse>> => {
  try {
    const response = await fetch('http://localhost:8080/links', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ url, title }),
      credentials: 'include',
    });
    const data: CreateLinkResponse = await response.json();

    return { successFetch: true, fetchData: data };
  } catch {
    return { successFetch: false, message: 'Failed to create user.' };
  }
};

const getUserLinks = async (): Promise<ApiData<GetLinksResponse>> => {
  try {
    const response = await fetch('http://localhost:8080/links', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      credentials: 'include',
    });

    const data: GetLinksResponse = await response.json();
    return { successFetch: true, fetchData: data };
  } catch {
    return { successFetch: false, message: 'Failed to create link.' };
  }
};

export { createLink, getUserLinks };
