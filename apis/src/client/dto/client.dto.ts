import { IsString, IsEmail, IsOptional, IsPhoneNumber, IsInt } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsInt()
  countryId: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;
}

export class UpdateClientDto extends CreateClientDto {} 