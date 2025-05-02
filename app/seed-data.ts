"use server"

// Cette fonction simule l'initialisation des données
// Dans un cas réel, elle pourrait vérifier si la base de données est vide
// et y insérer des données initiales si nécessaire
export async function seedInitialData() {
  // Simulation d'une vérification et initialisation
  console.log("Vérification des données initiales...")

  // Dans un cas réel, on pourrait avoir un code comme:
  // const categoriesCount = await prisma.category.count()
  // if (categoriesCount === 0) {
  //   await prisma.category.createMany({
  //     data: [
  //       { name: "Art et Culture" },
  //       { name: "Technologie et Innovation" },
  //       ...
  //     ]
  //   })
  // }

  return true
}
