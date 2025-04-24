import { IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreatePrestationDto {
  @IsNumber()
  agenceId: number;

  @IsNumber()
  @IsOptional()
  actId?: number;

  @IsDateString()
  date: string;

  @IsNumber()
  cout: number;

  @IsString()
  @IsOptional()
  otherAct?: string;

  @IsString()
  @IsOptional()
  certificateNumber?: string;

  @IsNumber()
  clientId?: number;

  @IsNumber()
  healthFacilityTypeId?: number;
}
