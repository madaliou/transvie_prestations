import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly prisma: PrismaService, // ✅ Injecte Prisma pour retrouver l'agence
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req) {
    const agenceId = req.user.agenceId;

    // 🔎 Trouver l'agence et son pays
    const agence = await this.prisma.agence.findUnique({
      where: { id: agenceId },
      include: { country: true }, // optionnel, si tu veux le pays complet
    });

    if (!agence || !agence.countryId) {
      throw new Error('Agence invalide ou countryId manquant');
    }

    const countryId = agence.countryId;
    return this.clientService.findAll(countryId);
  }

  @Post()
  async createClient(@Body() body: { name: string; countryId: number }) {
    const { name, countryId } = body;
    return this.clientService.createClient({ name, countryId });
  }
}
