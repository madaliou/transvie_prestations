import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

export async function seedClients() {
  // 🔎 Récupérer le pays "Bénin"
  const countries = await prisma.country.findMany();
  const benin = countries.find(c => c.name.toLowerCase() === 'bénin');

  if (!benin) {
    console.error('❌ Aucun pays "Bénin" trouvé dans la base de données.');
    return;
  }

  // 1. Lire le fichier Excel
  const filePath = './prisma/seeds/CONTRATS_BENIN_25_AVRIL_2025.xlsx';
  let workbook;
  try {
    workbook = XLSX.readFile(filePath);
  } catch (error) {
    console.error('❌ Erreur lors de la lecture du fichier Excel :', error);
    return;
  }

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  const headerRow = data[0] as string[];
  const nomEntreprisesColumn = headerRow.findIndex(col =>
    col.toLowerCase().includes('nom des entreprises')
  );

  if (nomEntreprisesColumn === -1) {
    console.error('❌ Colonne "Nom des Entreprises" introuvable.');
    return;
  }

  // 3. Parcourir chaque ligne
  for (let i = 1; i < data.length; i++) {
    const row = data[i] as any[];
    const rawName = row[nomEntreprisesColumn];

    if (typeof rawName === 'string' && rawName.trim().length > 0) {
      const name = rawName.trim();

      try {
        await prisma.client.upsert({
          where: { name },
          update: {},
          create: {
            name,
            countryId: benin.id, // 👈 On utilise countryId ici
          },
        });
      } catch (error) {
        console.error(`❌ Erreur pour le client "${name}":`, error);
      }
    } else {
      console.warn(`⚠️ Nom de client invalide à la ligne ${i + 1}:`, row);
    }
  }

  console.log('✅ Entreprises créées avec succès.');
}
