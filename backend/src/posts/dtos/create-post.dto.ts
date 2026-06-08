import { IsNotEmpty, IsString, IsOptional, IsUrl, Length } from 'class-validator';

export class CreatePostDto {

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}