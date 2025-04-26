import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedAgences(countries: any[]) {
  const benin = countries.find(c => c.name === 'Bénin');
  const senegal = countries.find(c => c.name === 'Sénégal');

  const cotonou = await prisma.agence.upsert({
    where: { name: 'Cotonou' },
    update: {},
    create: {
      name: 'Cotonou',
      countryId: benin.id,
      isMain: true,
    },
  });

  const glo = await prisma.agence.upsert({
    where: { name: 'Glo Djigbé' },
    update: {},
    create: {
      name: 'Glo Djigbé',
      countryId: benin.id,
      isMain: false,
    },
  });

  const dakar = await prisma.agence.upsert({
    where: { name: 'Dakar Siège' },
    update: {},
    create: {
      name: 'Dakar Siège',
      countryId: senegal.id,
      isMain: true,
    },
  });
  console.log(`✅ Agences créés avec succès`);

  return [cotonou, glo, dakar];
}
