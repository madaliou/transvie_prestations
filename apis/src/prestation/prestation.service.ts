import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { UpdatePrestationDto } from './dto/update-prestation.dto';

@Injectable()
export class PrestationService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreatePrestationDto) {
    return this.prisma.prestation.create({
      data: {
        agenceId: dto.agenceId,
        actId: dto.actId,
        date: new Date(dto.date),
        cout: dto.cout,
        otherAct: dto.otherAct,
        certificateNumber: dto.certificateNumber,
        userId,
        clientId: dto.clientId,
        healthFacilityTypeId: dto.healthFacilityTypeId
      },
    });
  }

  async findAllWithDetails() {
    return this.prisma.prestation.findMany({
      include: {
        agence: {
          select: { id:true, name: true },
        },
        subcategory: {
          select: { id: true, name: true },
        },
        client: {
          select: { id: true, name: true}
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.prestation.findUnique({
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
  }

  async update(id: number, dto: UpdatePrestationDto) {
    return this.prisma.prestation.update({
      where: { id },
      data: {
        agenceId: dto.agenceId,
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
