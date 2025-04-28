import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubcategoryService {
    constructor(private prisma: PrismaService){}
    async findAll() {
      return this.prisma.subcategory.findMany({
        select: {
          id: true,
          name: true,
          category:{
            select: {
              id: true,
            }
          }
        },
        orderBy: {
          name: 'asc',
        },
      });
    }
}
