import { IsNotEmpty, IsString, IsOptional, IsInt,  Min, Max  } from 'class-validator';
import { Type } from "class-transformer";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
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
export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content?: string;

  @IsOptional()
  imageUrl?: string | null;
}