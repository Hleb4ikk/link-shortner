import { IsUrl } from 'class-validator';

class LinkDto {
  @IsUrl()
  url: string;
}

export { LinkDto };
