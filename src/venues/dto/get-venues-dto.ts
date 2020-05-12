import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetVenuesDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  take: number;
  @IsOptional()
  skip: number;
}