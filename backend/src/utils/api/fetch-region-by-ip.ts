import { appConfig } from 'configuration/appConfig';
import { geoApiHost } from 'constants/geo-api';
import { logError } from 'logger';
import { IpResponseData } from 'types/IpResponseData';

export const fetchRegionByIp = async (ip: string) => {
  const response = await fetch(
    `${geoApiHost}/api/v2/country?apiKey=${appConfig.apiGeolocationKey}&ipAddress=${ip}`,
  );

  if (!response.ok) {
    logError(fetchRegionByIp.name, 'Failed to fetch region by ip.');
    return null;
  }
  const responseData: IpResponseData = await response.json();

  return `${responseData.location.country}, ${responseData.location.region}`;
};
