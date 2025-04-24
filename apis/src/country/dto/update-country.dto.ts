import { IsOptional, IsString } from 'class-validator';

export class UpdateCountryDto {
  @IsOptional()
  @IsString({ message: 'Le nom du pays doit être une chaîne de caractères.' })
  name?: string;
}
