import { IsOptional, MaxLength } from 'class-validator';

class UpdateLinkDto {
  @IsOptional()
  @MaxLength(128)
  title: string;
}

export { UpdateLinkDto };
