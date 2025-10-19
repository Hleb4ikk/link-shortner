import { IsIP, IsOptional, IsString } from 'class-validator';

export class AudienceDto {
  @IsString()
  linkId: string;

  @IsIP()
  @IsOptional()
  ip: string;

  @IsString()
  userAgent: string;
}
