import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAllWithSubcategories() {
    return this.prisma.category.findMany({
      include: {
        subcategories: true, // inclut les sous-catégories associées
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}
