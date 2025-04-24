import { Module } from '@nestjs/common';
import { PrestationService } from './prestation.service';
import { PrestationController } from './prestation.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PrestationService, PrismaService],
  controllers: [PrestationController],
})
export class PrestationModule {}
