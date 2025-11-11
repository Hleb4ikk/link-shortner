import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

class GetLinkDto {
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    const parsedValue = parseInt(value);
    if (parsedValue) {
      return parsedValue;
    }
  })
  page: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => {
    const parsedValue = parseInt(value);
    if (parsedValue) {
      return parsedValue;
    }
  })
  limit?: number;

  @IsString()
  @IsOptional()
  searchQuery?: string;
}

export { GetLinkDto };
