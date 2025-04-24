import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  async create(@Body() dto: CreateCountryDto) {
    try {
      return await this.countryService.create(dto);
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la création du pays',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const country = await this.countryService.findOne(+id);
    if (!country) {
      throw new NotFoundException('Pays introuvable');
    }
    return country;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCountryDto) {
    try {
      return await this.countryService.update(+id, dto);
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la mise à jour',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.countryService.remove(+id);
    } catch (error) {
      throw new NotFoundException('Impossible de supprimer : pays introuvable');
    }
  }
}
