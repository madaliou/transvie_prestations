import { Module } from '@nestjs/common';
import { HealthFacilityTypeController } from './health-facility-type.controller';
import { HealthFacilityTypeService } from './health-facility-type.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [HealthFacilityTypeController],
  providers: [HealthFacilityTypeService, PrismaService]
})
export class HealthFacilityTypeModule {}
