import { logError } from 'logger';
import { IpResponseData } from 'types/IpResponseData';

export const fetchRegionByIp = async (ip: string) => {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_QwmH4cu3weEpShGPvleM35I3Y3nxD&ipAddress=${ip}`,
  );

  if (!response.ok) {
    logError(fetchRegionByIp.name, 'Failed to fetch region by ip.');
    return null;
  }
  const responseData: IpResponseData = await response.json();

  return `${responseData.location.country}, ${responseData.location.region}`;
};
