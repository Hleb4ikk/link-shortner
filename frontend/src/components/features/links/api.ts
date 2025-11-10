import { appConfig } from '../../../configuration/appConfig';
import {
  CreateLinkResponse,
  DeleteLinkResponse,
  GetLinksResponse,
} from './types/LinksResponse';

const createUserLink = async (
  url: string,
  title?: string,
): Promise<CreateLinkResponse> => {
  const response = await fetch(`${appConfig.serverUrl}/links`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ url, title }),
    credentials: 'include',
  });
  const data: CreateLinkResponse = await response.json();
  return data;
};

const getLinksPage = async (
  page: number,
  limit?: number,
  searchQuery?: string,
): Promise<GetLinksResponse> => {
  const searchParams = new URLSearchParams();

  searchParams.set('page', page.toString());

  if (limit) {
    searchParams.set('limit', page.toString());
  }
  if (searchQuery) {
    searchParams.set('search', searchQuery);
  }

  const response = await fetch(
    `${appConfig.serverUrl}/links?${searchParams.toString()}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },

      method: 'GET',
      credentials: 'include',
    },
  );

  const data: GetLinksResponse = await response.json();
  console.log(data);

  return data;
};

const deleteUserLink = async (id: string): Promise<DeleteLinkResponse> => {
  const response = await fetch(`${appConfig.serverUrl}/links/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    credentials: 'include',
  });
  const data: DeleteLinkResponse = await response.json();
  return data;
};

export { createUserLink, getLinksPage, deleteUserLink };
