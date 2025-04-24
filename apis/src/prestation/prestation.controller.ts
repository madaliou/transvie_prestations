import { Controller, Post, Body, UseGuards, Req, Get, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { PrestationService } from './prestation.service';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

@Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.prestationService.delete(id);
  }
}
