import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  sku: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock_quantity: number;
}
