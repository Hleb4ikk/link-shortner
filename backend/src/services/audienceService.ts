import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { db } from 'database/db';
import { audienceTable } from 'database/schemas/audienceTable';
import { linksTable } from 'database/schemas/linksTable';
import { count, eq } from 'drizzle-orm';
import { logError } from 'logger';
import { AudienceDto } from 'types/AudienceDto';
import {
  BadRequestException,
  InternalServerErrorException,
} from 'types/exceptions/HttpExceptions';
import { GetAudienceDto } from 'types/GetAudienceDto';
import { UAParser } from 'ua-parser-js';
import { fetchRegionByIp } from 'utils/api/fetch-region-by-ip';

const getAudienceByLinkId = async (shortLinkId: string, data: unknown) => {
  const getAudienceDto = plainToInstance(GetAudienceDto, data);
  const errors = await validate(getAudienceDto);

  if (errors.length > 0) {
    throw new BadRequestException('Invalid data');
  }

  const { page, limit = 15 } = getAudienceDto;

  let audience;
  let total;
  let link;
  try {
    total = (
      await db
        .select({ total: count(audienceTable.shortLinkId) })
        .from(audienceTable)
        .where(eq(audienceTable.shortLinkId, shortLinkId))
    )[0].total;

    audience = await db
      .select({
        ip: audienceTable.ip,
        region: audienceTable.region,
        browser: audienceTable.browser,
        os: audienceTable.os,
        followedAt: audienceTable.followedAt,
      })
      .from(audienceTable)
      .where(eq(audienceTable.shortLinkId, shortLinkId))
      .offset((page - 1) * limit);

    link = (
      await db
        .select({
          title: linksTable.title,
          shortLinkId: linksTable.shortLinkId,
          url: linksTable.url,
          createdAt: linksTable.createdAt,
        })
        .from(linksTable)
        .where(eq(linksTable.shortLinkId, shortLinkId))
    )[0];
  } catch {
    throw new InternalServerErrorException('Failed to load link audience.');
  }
  return { totalPages: Math.ceil(total / limit), audience, link };
};

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
      shortLinkId: audienceDto.shortLinkId,
      browser: `${uaResult.browser.name} ${uaResult.browser.version}`,
      os: `${uaResult.os.name} ${uaResult.os.version}`,
    });
  } catch (e) {
    console.log(e);
    logError(createAudience.name, 'Failed to insert Audience to db.');
  }
};

export { createAudience, getAudienceByLinkId };
