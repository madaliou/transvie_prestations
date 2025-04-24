import { IsOptional, IsString } from 'class-validator';

export class UpdateAgenceDto {
  @IsOptional()
  @IsString({ message: 'Le nom du pays doit être une chaîne de caractères.' })
  name?: string;
}
