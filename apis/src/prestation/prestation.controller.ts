import { Controller, Post, Body, UseGuards, Req, Get, Delete, Param, ParseIntPipe, Put, BadRequestException } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Get('kpis')
  async getAllKpis(@Req() req) {
  const userAgenceId = req.user.agenceId;
  return this.prestationService.findAllWithDetails(userAgenceId);
}

@Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prestationService.findOne(id);
  }

@Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.prestationService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
    @Body() dto: UpdatePrestationDto
  ) {
    const userId = req.user.userId;
    return this.prestationService.update(id, userId, dto);
  }
}
