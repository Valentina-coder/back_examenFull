import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ example: 'usuario123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  password: string;

  @ApiProperty({ example: 'USER', default: 'USER' })
  @IsString()
  role?: string;
}
