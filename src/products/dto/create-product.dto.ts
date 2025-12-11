import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Notebook Gamer' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Potente PC para juegos' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1500.5 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  stock: number;
}
