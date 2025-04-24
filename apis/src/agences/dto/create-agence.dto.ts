import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAgenceDto {
  @IsString()
  @IsNotEmpty({ message: "Le nom de l'agence est requis." })
  name: string;

  @IsInt({ message: 'Le countryId doit être un entier.' })
  @IsNotEmpty({ message: 'Le countryId est requis.' })
  countryId: number;
}
