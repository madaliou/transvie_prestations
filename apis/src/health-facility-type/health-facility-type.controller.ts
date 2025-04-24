import { Controller, Get } from '@nestjs/common';
import { HealthFacilityTypeService } from './health-facility-type.service';

@Controller('health-facility-types')
export class HealthFacilityTypeController {
    constructor (private readonly healthFacilityTypeService: HealthFacilityTypeService) {}
        @Get()
        async findAll() {
          return this.healthFacilityTypeService.findAll();
        }
}
