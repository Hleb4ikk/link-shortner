import { IsOptional, IsUrl, MaxLength } from 'class-validator';

class LinkDto {
  @IsOptional()
  @MaxLength(128)
  title: string;

  @IsUrl()
  url: string;
}

export { LinkDto };
