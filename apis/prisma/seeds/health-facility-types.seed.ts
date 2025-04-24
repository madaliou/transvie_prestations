import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const facilityTypes = [
    'Centres de santé',
    'Hôpitaux',
    'Cliniques',
    'Cabinets',
    'Pharmacies',
    'Imagerie médicale',
  ];

  for (const name of facilityTypes) {
    await prisma.healthFacilityType.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('✅ Types de structures sanitaires insérés');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
