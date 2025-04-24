import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
    constructor(private prisma: PrismaService){}
    async findAll() {
        return this.prisma.client.findMany({
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
