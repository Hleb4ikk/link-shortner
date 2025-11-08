import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

class GetAudienceDto {
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
}

export { GetAudienceDto };
