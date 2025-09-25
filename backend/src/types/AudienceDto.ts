import { IsIP, IsString } from 'class-validator';

export class AudienceDto {
  @IsString()
  linkId: string;

  @IsIP()
  ip: string;

  @IsString()
  userAgent: string;
}
