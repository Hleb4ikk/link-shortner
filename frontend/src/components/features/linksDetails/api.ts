import { appConfig } from '../../../configuration/appConfig';
import { LinkDetailsResponse } from './types/LinkDetailsResponse';

async function fetchLinksDetails(linkId: string, page: number, limit?: number) {
  const searchParams = new URLSearchParams();

  searchParams.set('page', page.toString());

  if (limit) {
    searchParams.set('limit', page.toString());
  }

  const response = await fetch(
    `${appConfig.serverUrl}/links/${linkId}/audience?${searchParams.toString()}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      credentials: 'include',
    },
  );
  const data: LinkDetailsResponse = await response.json();
  return data;
}

export { fetchLinksDetails };
