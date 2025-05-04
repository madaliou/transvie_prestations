import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { UpdatePrestationDto } from './dto/update-prestation.dto';

@Injectable()
export class PrestationService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreatePrestationDto) {
    let agenceId = dto.agenceId;

  // Si l'agence n'est pas spécifiée dans le DTO, on la récupère via l'utilisateur
  if (!agenceId) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { agenceId: true },
    });

    if (!user || !user.agenceId) {
      throw new Error("Impossible de déterminer l'agence de l'utilisateur.");
    }
    agenceId = user.agenceId;
  }
  return this.prisma.prestation.create({
    data: {
      agence: {
        connect: { id: agenceId },
      },
      subcategory: {
        connect: { id: dto.actId },
      },
      date: new Date(dto.date),
      cout: dto.cout,
      otherAct: dto.otherAct,
      certificateNumber: dto.certificateNumber,
      user: {
        connect: { id: userId },
      },
      client: {
        connect: { id: dto.clientId },
      },
      healthFacilityType: {
        connect: { id: dto.healthFacilityTypeId },
      },
    },
  });
  
  }

    async findAllWithDetails(userAgenceId: number) {
      // Récupérer le countryId à partir de l'agence
      const agence = await this.prisma.agence.findFirst({
        where: { id: userAgenceId },
        select: { countryId: true },
      });
    
      if (!agence) {
        throw new Error(`Agence avec ID ${userAgenceId} introuvable.`);
      }
    
      // Récupérer toutes les prestations des agences du même pays
      const prestations = await this.prisma.prestation.findMany({
        where: {
          agence: {
            countryId: agence.countryId,
          },
        },
        include: {
          agence: {
            select: { id: true, name: true },
          },
          subcategory: {
            select: { id: true, name: true },
          },
          client: {
            select: { id: true, name: true },
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    
      // Reformater les dates
      return prestations.map((prestation) => ({
        ...prestation,
        date: prestation.date ? prestation.date.toISOString().split('T')[0] : null,
      }));
    }
    
  
  async findOne(id: number) {
    const prestation = await this.prisma.prestation.findUnique({
      where: { id },
      include: {
        agence: {
          select: { id: true, name: true },
        },
        subcategory: {
          select: { id: true, name: true },
        },
        client: {
          select: { id: true, name: true },
        },
      },
    });
  
    if (!prestation) return null;
  
    return {
      ...prestation,
      date: prestation.date ? prestation.date.toISOString().split('T')[0] : null,
    };
  }
  

  async update(id: number, userId: number, dto: UpdatePrestationDto) {
    let agenceId = dto.agenceId;
    console.log('agzencyid ', agenceId)
  // Si l'agence n'est pas spécifiée dans le DTO, on la récupère via l'utilisateur
  if (!agenceId) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { agenceId: true },
    });

    if (!user || !user.agenceId) {
      throw new Error("Impossible de déterminer l'agence de l'utilisateur.");
    }
    agenceId = user.agenceId;
  }
    return this.prisma.prestation.update({
      where: { id },
      data: {
        agenceId,
        actId: dto.actId,
        date: dto.date ? new Date(dto.date) : undefined,
        cout: dto.cout,
        otherAct: dto.otherAct,
        certificateNumber: dto.certificateNumber,
        clientId: dto.clientId,
        healthFacilityTypeId: dto.healthFacilityTypeId,
      },
    });
  }
  

  async delete(id: number) {
    return this.prisma.prestation.delete({
      where: { id },
    });
  }
}
