import { Controller, Get } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';

@Controller('subcategories')
export class SubcategoryController {
    constructor (private readonly subCategoryService: SubcategoryService) {}
    @Get()
    async findAll() {
      return this.subCategoryService.findAll();
    }
}
