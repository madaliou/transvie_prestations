import { Module } from '@nestjs/common';
import { AgencesService } from './agences.service';
import { AgencesController } from './agences.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AgencesController],
  providers: [AgencesService, PrismaService],
})
export class AgencesModule {}
