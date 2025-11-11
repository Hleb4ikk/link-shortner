import { z } from 'zod';

export const createLinkSchema = z.object({
  title: z
    .string()
    .max(128, { message: 'Title must me less than 128 characters' })
    .optional(),

  originalLink: z
    .url()
    .max(2048, { message: 'Url must be less than 2048 characters' }),
});
