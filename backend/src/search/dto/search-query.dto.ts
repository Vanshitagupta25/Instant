import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SearchQueryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  q: string;

  constructor(partial?: Partial<SearchQueryDto>) {
    this.q = partial?.q || '';
  }
}