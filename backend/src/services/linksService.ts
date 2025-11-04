import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { attempts } from 'constants/base-58-generator-settings';
import { db } from 'database/db';
import { audienceTable } from 'database/schemas/audienceTable';
import { linksTable } from 'database/schemas/linksTable';
import { and, count, eq, ilike } from 'drizzle-orm';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from 'types/exceptions/HttpExceptions';
import { GetLinkDto } from 'types/GetLinkDto';
import { LinkDto } from 'types/LinkDto';
import { UpdateLinkDto } from 'types/UpdateLinkDto';
import { generateShortId } from 'utils/generate-shortId';

const getLinksPage = async (userId: string, data: unknown) => {
  const getLinkDto = plainToInstance(GetLinkDto, data);
  const errors = await validate(getLinkDto);
  if (errors.length > 0) {
    throw new BadRequestException('Invalid data');
  }

  const { page, limit = 5, searchQuery } = getLinkDto;

  let total;
  let links;

  try {
    total = (
      await db
        .select({ total: count(linksTable.id) })
        .from(linksTable)
        .where(
          and(
            eq(linksTable.ownerId, userId),
            searchQuery
              ? ilike(linksTable.title, `%${searchQuery}%`)
              : undefined,
          ),
        )
    )[0].total;

    links = await db
      .select({
        id: linksTable.id,
        title: linksTable.title,
        shortLinkId: linksTable.shortLinkId,
        url: linksTable.url,
        createdAt: linksTable.createdAt,
        audienceCount: count(audienceTable.id),
      })
      .from(linksTable)
      .offset((page - 1) * limit)
      .limit(limit)
      .leftJoin(
        audienceTable,
        eq(audienceTable.shortLinkId, linksTable.shortLinkId),
      )
      .where(
        and(
          eq(linksTable.ownerId, userId),
          searchQuery ? ilike(linksTable.title, `%${searchQuery}%`) : undefined,
        ),
      )
      .groupBy(linksTable.id);
  } catch {
    throw new InternalServerErrorException('Failed to fetch links');
  }
  return { totalPages: Math.ceil(total / limit), links };
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

const deleteLink = async (shortLinkId: string) => {
  let deletedLink;
  try {
    deletedLink = (
      await db
        .delete(linksTable)
        .where(eq(linksTable.shortLinkId, shortLinkId))
        .returning({ id: linksTable.id })
    )[0];
  } catch {
    throw new InternalServerErrorException('Error deleting link.');
  }

  return deletedLink;
};

const updateLink = async (shortLinkId: string, updatedLink: unknown) => {
  const updateLinkDto = plainToInstance(UpdateLinkDto, updatedLink);
  const errors = await validate(updateLinkDto);

  if (errors.length > 0) {
    throw new BadRequestException('Invalid data');
  }

  let link;

  try {
    link = (
      await db
        .update(linksTable)
        .set({ title: updateLinkDto.title })
        .where(eq(linksTable.shortLinkId, shortLinkId))
        .returning({ title: linksTable.title })
    )[0];
  } catch {
    throw new InternalServerErrorException('Failed to update link.');
  }
  if (!link) {
    throw new NotFoundException('Link is not found');
  }
  return link;
};
export { getLinkByShortId, createLink, getLinksPage, deleteLink, updateLink };
