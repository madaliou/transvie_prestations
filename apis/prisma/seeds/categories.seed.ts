// prisma/seeds/categories.seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedCategories() {
  const categories = [
    {
      name: 'Consultation de médecine générale et préventive',
      subcategories: [
        'Consultations curatives générales',
        'Actes d’infirmerie( incision, suture, injection, transfusion, circoncision, pansement,….)',
        'Soins maternels et infantiles et vaccinations liés aux CPN, et PN',
        'Autres actes préventifs',
      ],
    },
    {
      name: 'Consultation de médecine spécialisée',
      subcategories: [
        'Soins dentaires',
        'Consultations en dermatologie',
        'Consultations gynécologie (y compris non obstétrique)',
        'Consultations ophtalmologie',
        'Consultations pédiatriques',
        'Consultations psychiatriques',
        'Consultations cardiologiques',
        'Consultations neurologiques',
        'Consultations ORL',
        'Consultations en urologie',
        'Autres spécialités',
      ],
    },
    {
      name: 'Actes diagnostics',
      subcategories: [
        'Laboratoire',
        'Radiologie',
        'Echographie',
        'Mammographie',
        'Scanner',
        'Autres actes de diagnostic',
      ],
    },
    {
      name: 'Maternités',
      subcategories: [
        'Accouchements simples',
        'Accouchements compliqués',
        'Césariennes',
        'Autres actes de maternité',
      ],
    },
    {
      name: 'Hospitalisation',
      subcategories: [
        'Frais de lit (en séjour ou en observation)',
        'Hospitalisation de jour',
        'Actes de chirurgie',
        'Autres actes internes',
      ],
    },
    {
      name: 'Médicaments',
      subcategories: ['Médicaments dispensés par la formation sanitaire'],
    },
    {
      name: 'Transports',
      subcategories: ['Evacuation ambulance et autres moyens de transports'],
    },
  ];

  for (const category of categories) {
    const createdCategory = await prisma.category.create({
      data: {
        name: category.name,
        subcategories: {
          create: category.subcategories.map((sub) => ({ name: sub })),
        },
      },
    });
  }
  console.log(`✅ Catégories et actes créés avec succès`);
}