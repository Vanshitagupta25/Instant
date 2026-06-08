import { IsInt, IsOptional, IsString, Min, Max } from "class-validator";
import { Type } from "class-transformer";

export class GetPostsQueryDto {
  @IsOptional()
  @IsString()
  nextCursor?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 10;
}