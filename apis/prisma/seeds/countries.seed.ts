import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedCountries() {
  const countries = ['Bénin', 'Sénégal', 'Côte d\'Ivoire', 'Togo', 'Gambie'];

  const result = [];
  for (const name of countries) {
    const country = await prisma.country.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    result.push(country);
  }
  console.log(`✅ Pays créés avec succès`);

  return result; // 🔁 pour les agences ensuite
}
