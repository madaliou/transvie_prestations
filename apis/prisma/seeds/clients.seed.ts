import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

async function seedClients() {
  // 1. Lire le fichier Excel (chemin relatif au point de lancement)
  const filePath = './prisma/seeds/CLIENTS BENIN.xlsx';
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // 2. Extraire en tableau de tableaux
  const data = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });

  // 3. Parcourir chaque ligne
  for (const row of data) {
    const [maybeId, rawName] = row;
    // On ne garde que les lignes où rawName est un string non vide
    // et on ignore l'en-tête "clients BENIN"
    if (
      typeof rawName === 'string' &&
      rawName.trim().length > 0 &&
      rawName.trim().toLowerCase() !== 'clients benin'
    ) {
      const name = rawName.trim();
      // Upsert pour éviter les doublons
      await prisma.client.upsert({
        where: { name },
        update: {},
        create: { name },
      });
    }
  }

  console.log('✅ Seed clients terminé');
}

seedClients()
  .catch((e) => {
    console.error('❌ Erreur lors du seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
