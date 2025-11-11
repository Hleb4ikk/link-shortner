import { IsIP, IsOptional, IsString } from 'class-validator';

export class AudienceDto {
  @IsString()
  shortLinkId: string;

  @IsIP()
  @IsOptional()
  ip: string;

  @IsString()
  userAgent: string;
}
