import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedHealthFacilitiesTypes() {
  const facilityTypes = [
    'Centres de santé',
    'Hôpitaux',
    'Cliniques',
    'Cabinets',
    'Pharmacies',
    'Imagerie médicale'
  ];

  const result = [];
  for (const name of facilityTypes) {
    const facility = await prisma.healthFacilityType.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log(`✅ Types de structures sanitaires créés avec succès`);

}