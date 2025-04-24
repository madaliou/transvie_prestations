import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCountryDto) {
    const existing = await this.prisma.country.findUnique({
      where: { name: dto.name },
    });

    if (existing) {
      throw new BadRequestException('Un pays avec ce nom existe déjà.');
    }

    return this.prisma.country.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.country.findMany();
  }

  findOne(id: number) {
    return this.prisma.country.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.CountryUpdateInput) {
    return this.prisma.country.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.country.delete({ where: { id } });
  }
}
