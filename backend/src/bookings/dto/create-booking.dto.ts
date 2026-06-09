import { IsString, IsOptional, IsNumber, Min, IsBoolean, IsEmail, MinLength } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsString()
  @MinLength(1)
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  service: string;

  @IsString()
  @MinLength(1)
  pickup: string;

  @IsString()
  @MinLength(1)
  destination: string;

  @IsString()
  @MinLength(1)
  date: string;

  @IsString()
  @MinLength(1)
  time: string;

  @IsNumber()
  @Min(1)
  passengers: number;

  @IsOptional()
  @IsString()
  meetAndGreet?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
