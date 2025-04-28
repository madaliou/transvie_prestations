import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

export async function seedClients() {
  // 🔎 Récupérer les agences "Cotonou" et "Glo Djigbé"
  const agences = await prisma.agence.findMany();
  const cotonou = agences.find(a => a.name.toLowerCase() === 'cotonou');
  if (!cotonou) {
    console.error('❌ Aucune agence "Cotonou" trouvée dans la base de données.');
    return; // Arrêt du script si l'agence Cotonou est introuvable
  }

  const glo = agences.find(a => a.name.toLowerCase() === 'glo djigbé');
  if (!glo) {
    console.error('❌ Aucune agence "Glo Djigbé" trouvée dans la base de données.');
    return; // Arrêt du script si l'agence Glo Djigbé est introuvable
  }

  // 1. Lire le fichier Excel
  const filePath = './prisma/seeds/CONTRATS_BENIN_25_AVRIL_2025.xlsx';
  let workbook;
  try {
    workbook = XLSX.readFile(filePath);
  } catch (error) {
    console.error('❌ Erreur lors de la lecture du fichier Excel :', error);
    return; // Arrêt du script si la lecture du fichier échoue
  }
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // 2. Extraire en tableau d'objets (plus précis)
  // Déduire les types de colonnes à partir des données réelles
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const headerRow = data[0] as string[]; // La première ligne est l'en-tête
    const nomEntreprisesColumn = headerRow.findIndex(col => col.toLowerCase().includes('nom des entreprises'));
    const agencesColumn = headerRow.findIndex(col => col.toLowerCase().includes('agences'));

  if (nomEntreprisesColumn === -1 || agencesColumn === -1) {
      console.error('❌ Colonnes "Nom des Entreprises" ou "Agences" introuvables dans le fichier Excel.');
      return;
  }

  // 3. Parcourir chaque ligne et insérer les clients avec l'agence correspondante
  for (let i = 1; i < data.length; i++) { // Commencer à partir de la deuxième ligne (après l'en-tête)
      const row = data[i] as any[]; // Utiliser 'any[]' car nous ne connaissons pas les types exacts
      const rawName = row[nomEntreprisesColumn];
      const rawAgence = row[agencesColumn];

    if (typeof rawName === 'string' && rawName.trim().length > 0) {
      const name = rawName.trim();
      const agenceName = rawAgence ? rawAgence.trim().toLowerCase() : ''; // Gérer les valeurs nulles/indéfinies
      let agenceId;
      if (agenceName === 'cotonou') {
        agenceId = cotonou.id;
      } else if (agenceName === 'glo') {
        agenceId = glo.id;
      } else {
        // Gérer le cas où l'agence n'est ni "Cotonou" ni "Glo Djigbé"
        console.warn(`⚠️  Agence non reconnue pour le client "${name}": "${rawAgence}".  Utilisation de l'agence Cotonou par défaut.`);
        agenceId = cotonou.id; // Vous pouvez choisir une autre logique ici (ex: ne pas importer, utiliser une agence par défaut, lever une erreur)
      }

      // 💾 Upsert avec agence dynamique
      try {
        await prisma.client.upsert({
          where: { name },
          update: {},
          create: {
            name,
            agenceId,
          },
        });
      } catch (error) {
        console.error(`❌ Erreur lors de l'insertion/mise à jour du client "${name}":`, error);
      }
    } else if (typeof rawName !== 'string') {
      console.warn(`⚠️  Le nom du client n'est pas une chaîne ou est absent. Ligne ignorée :`, row);
    }
  }
  console.log('✅ Entreprises créés avec succès');
}
