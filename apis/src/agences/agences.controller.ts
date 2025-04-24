// src/agences/agences.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AgencesService } from './agences.service';
import { Prisma } from '@prisma/client';

@Controller('agences')
export class AgencesController {
  constructor(private readonly agencesService: AgencesService) {}

  @Post()
  create(@Body() data: Prisma.AgenceCreateInput) {
    return this.agencesService.create(data);
  }

  @Get()
  findAll() {
    return this.agencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agencesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.AgenceUpdateInput) {
    return this.agencesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agencesService.remove(+id);
  }
}
