import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubcategoryService {
    constructor(private prisma: PrismaService){}
    async findAll() {
        return this.prisma.subcategory.findMany({
          include: {
            category: true, // inclut les sous-catégories associées
          },
          orderBy: {
            id: 'asc',
          },
        });
      }
}
