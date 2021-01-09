import { IsOptional, IsNotEmpty } from 'class-validator';
export enum sqlOp {
  eq = '=',
  like = 'like',
  iLike = 'ILIKE'
}
export class GetDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  take: number;
  @IsOptional()
  skip: number;
}