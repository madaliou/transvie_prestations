import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
    constructor(private prisma: PrismaService){}
    async findAll(userAgencyId: number ) {
      return this.prisma.client.findMany({
        where: {
          agenceId: userAgencyId,
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
    
      
}
