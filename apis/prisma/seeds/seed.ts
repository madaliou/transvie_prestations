import 'dotenv/config'; // Charge automatiquement ton .env au tout début
import { seedClients } from './clients.seed';
import { seedCountries } from './countries.seed';
import { seedAgences } from './agences.seed';
import { seedHealthFacilitiesTypes } from './health-facility-types.seed';
import { PrismaClient } from '@prisma/client';
import { seedCategories } from './categories.seed';

const prisma = new PrismaClient();

async function runSeeds() {
  try {
    await seedHealthFacilitiesTypes();

    await seedCategories();

    const countries = await seedCountries();

    await seedAgences(countries); 

    await seedClients(); 

    console.log('✅ Tous les seeds ont été exécutés avec succès');
  } catch (e) {
    console.error('❌ Erreur lors du seed :', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runSeeds();
