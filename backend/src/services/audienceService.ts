import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { db } from 'database/db';
import { audienceTable } from 'database/schemas/audienceTable';
import { logError } from 'logger';
import { AudienceDto } from 'types/AudienceDto';
import { UAParser } from 'ua-parser-js';
import { fetchRegionByIp } from 'utils/api/fetch-region-by-ip';

// const getAudienceByLinkId = async (linkId: string) => {};

const createAudience = async (data: unknown) => {
  const audienceDto = plainToInstance(AudienceDto, data);
  const errors = await validate(audienceDto);

  const parser = new UAParser();
  parser.setUA(audienceDto.userAgent);
  const uaResult = parser.getResult();

  if (errors.length > 0) {
    logError(createAudience.name, 'Failed to create Audience.');
  }

  let region;
  if (audienceDto.ip) {
    region = await fetchRegionByIp(audienceDto.ip);
  } else {
    region = 'unknown';
  }

  try {
    await db.insert(audienceTable).values({
      region: region ?? 'error',
      ip: audienceDto.ip ?? 'unknown',
      linkId: audienceDto.linkId,
      browser: `${uaResult.browser.name} ${uaResult.browser.version}`,
      os: `${uaResult.os.name} ${uaResult.os.version}`,
    });
  } catch (e) {
    console.log(e);
    logError(createAudience.name, 'Failed to insert Audience to db.');
  }
};

export { createAudience };
