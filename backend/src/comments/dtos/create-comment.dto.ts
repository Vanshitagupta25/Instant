import { IsNotEmpty, IsString, IsMongoId, Length, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: 'Comment Id can not be empty!' })
  @Length(3, 500, { message: 'Comment should be 3 or greater than 3' })
  content!: string;

  @IsMongoId({ message: 'postId should be a valid MongoId!' })
  @IsNotEmpty()
  postId!: string;

  @IsString()
  @IsOptional()
  @IsMongoId({
  message: 'parentId should be a valid MongoId!' })
  parentId?: string;
}