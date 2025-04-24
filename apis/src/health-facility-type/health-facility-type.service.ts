import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HealthFacilityTypeService {
    constructor(private prisma: PrismaService){}
    async findAll() {
        return this.prisma.healthFacilityType.findMany({
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            id: 'asc',
          },
        });
      }
      
}
