import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AgencesModule } from './agences/agences.module';
import { CountryModule } from './country/country.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { PrestationModule } from './prestation/prestation.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { HealthFacilityTypeModule } from './health-facility-type/health-facility-type.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [UsersModule, PrismaModule, AgencesModule, CountryModule, CategoryModule, AuthModule, PrestationModule, SubcategoryModule, HealthFacilityTypeModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
