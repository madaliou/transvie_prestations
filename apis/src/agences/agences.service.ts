// src/agences/agences.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AgencesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.AgenceCreateInput) {
    return this.prisma.agence.create({ data });
  }

  findAll() {
    return this.prisma.agence.findMany({
      include: { country: true }, // Si tu as lié aux pays
    });
  }

  findOne(id: number) {
    return this.prisma.agence.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.AgenceUpdateInput) {
    return this.prisma.agence.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.agence.delete({ where: { id } });
  }
}
