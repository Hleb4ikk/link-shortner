import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { attempts } from 'constants/base-58-generator-settings';
import { db } from 'database/db';
import { audienceTable } from 'database/schemas/audienceTable';
import { linksTable } from 'database/schemas/linksTable';
import { count, eq } from 'drizzle-orm';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from 'types/exceptions/HttpExceptions';
import { LinkDto } from 'types/LinkDto';
import { generateShortId } from 'utils/generate-shortId';

const getAllUserLinks = async (userId: string) => {
  let links;
  try {
    links = await db
      .select({
        id: linksTable.id,
        shortLinkId: linksTable.shortLinkId,
        url: linksTable.url,
        createdAt: linksTable.createdAt,
        audienceCount: count(audienceTable.id),
      })
      .from(linksTable)
      .leftJoin(
        audienceTable,
        eq(audienceTable.shortLinkId, linksTable.shortLinkId),
      )
      .where(eq(linksTable.ownerId, userId))
      .groupBy(linksTable.shortLinkId);
  } catch {
    throw new InternalServerErrorException('Failed to fetch links');
  }
  return links;
};

const getLinkByShortId = async (shortId: string) => {
  let link;

  try {
    link = (
      await db
        .select()
        .from(linksTable)
        .where(eq(linksTable.shortLinkId, shortId))
    )[0];
  } catch {
    throw new InternalServerErrorException('Failed to fetch link');
  }
  if (!link) {
    throw new NotFoundException('Link is not found');
  }
  return link;
};

const createLink = async (link: unknown, userId: string) => {
  const linkDto = plainToInstance(LinkDto, link);
  const errors = await validate(linkDto);

  if (errors.length > 0) {
    throw new BadRequestException('Invalid data');
  }

  let shortId;
  let counter = attempts;

  while (counter > 0) {
    const id = generateShortId();
    try {
      const link = (
        await db.select().from(linksTable).where(eq(linksTable.shortLinkId, id))
      )[0];

      if (!link) {
        shortId = id;
        break;
      }
    } catch {
      throw new InternalServerErrorException(
        'Failed to check shortId on existing',
      );
    }

    counter--;
  }

  if (!shortId) {
    throw new InternalServerErrorException('Failed to generate shortId.');
  }

  try {
    await db.insert(linksTable).values({
      ownerId: userId,
      title: linkDto.title,
      shortLinkId: shortId,
      url: linkDto.url,
    });
    return shortId;
  } catch {
    throw new InternalServerErrorException('Failed to create short link');
  }
};

export { getLinkByShortId, createLink, getAllUserLinks };
