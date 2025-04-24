import { Controller, Post, Body, UseGuards, Req, Get, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { PrestationService } from './prestation.service';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdatePrestationDto } from './dto/update-prestation.dto';

@Controller('prestations')
export class PrestationController {
  constructor(private readonly prestationService: PrestationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() dto: CreatePrestationDto) {
    const userId = req.user.userId;
    return this.prestationService.create(userId, dto);
  }

  @Get('kpis')
  async getAllKpis() {
  return this.prestationService.findAllWithDetails();
}

@Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prestationService.findOne(id);
  }

@Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.prestationService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePrestationDto
  ) {
    return this.prestationService.update(id, dto);
  }
}
