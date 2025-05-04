import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
    constructor(private prisma: PrismaService){}
    async findAll(userCountryId: number ) {
      return this.prisma.client.findMany({
        where: {
          countryId: userCountryId,
        },
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
    }

    async createClient(data: { name: string; countryId: number }) {
      return this.prisma.client.create({
        data: {
          name: data.name,
          countryId: data.countryId,
        },
      });
    }
    
      
}
