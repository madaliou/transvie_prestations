import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom du pays est requis.' })
  name: string;
}
