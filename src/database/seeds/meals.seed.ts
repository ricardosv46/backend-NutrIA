import { DataSource } from "typeorm";
import { Meal } from "../../meals/entities/meal.entity";
import { MealType } from "../../common/enums/meal-type.enum";

export const mealsSeed = [
  // BREAKFAST (15 comidas)
  {
    name: "Bowl de Avena con Frutas",
    calories: 450,
    protein: 15,
    carbs: 65,
    fats: 12,
    image:
      "https://plus.unsplash.com/premium_photo-1695411846373-029540fbdb86?q=80&w=884&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Avena integral con plátano, arándanos, almendras y miel",
    mealType: MealType.BREAKFAST,
    category: "balanced",
  },
  {
    name: "Tostadas de Aguacate con Huevo",
    calories: 480,
    protein: 18,
    carbs: 42,
    fats: 24,
    image:
      "https://images.unsplash.com/photo-1585819531730-06d1aba54ce1?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Pan integral con aguacate, huevos pochados y tomate",
    mealType: MealType.BREAKFAST,
    category: "high_fat",
  },
  {
    name: "Panqueques de Proteína",
    calories: 460,
    protein: 28,
    carbs: 52,
    fats: 14,
    image:
      "https://images.unsplash.com/photo-1617828532964-62013f08578c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Con plátano caramelizado y jarabe de arce",
    mealType: MealType.BREAKFAST,
    category: "high_protein",
  },
  {
    name: "Omelette de Claras con Vegetales",
    calories: 380,
    protein: 32,
    carbs: 28,
    fats: 16,
    image:
      "https://images.unsplash.com/photo-1692737580558-b9dfdac5599c?q=80&w=915&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Claras de huevo con espinaca, champiñones y tomate",
    mealType: MealType.BREAKFAST,
    category: "high_protein",
  },
  {
    name: "Bowl de Açaí",
    calories: 420,
    protein: 14,
    carbs: 68,
    fats: 12,
    image:
      "https://media.istockphoto.com/id/1490913322/photo/smoothie-bowl-with-fresh-berries-and-granola.jpg?s=2048x2048&w=is&k=20&c=pO_d1-ls8vdCcnhwcjwv7WlsqWK6zJpPJxrR76OiJCE=",
    description: "Açaí con granola, plátano, fresas y coco",
    mealType: MealType.BREAKFAST,
    category: "high_carb",
  },
  {
    name: "Waffles de Avena Proteicos",
    calories: 470,
    protein: 24,
    carbs: 58,
    fats: 16,
    image:
      "https://images.unsplash.com/photo-1600625649542-f668edc636dc?q=80&w=895&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Con frutos rojos frescos y yogurt griego",
    mealType: MealType.BREAKFAST,
    category: "high_protein",
  },
  {
    name: "Brunch Fitness",
    calories: 520,
    protein: 28,
    carbs: 48,
    fats: 22,
    image:
      "https://plus.unsplash.com/premium_photo-1723701870920-38e585b31bf1?q=80&w=838&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Huevos revueltos, salmón ahumado, aguacate y tostadas",
    mealType: MealType.BREAKFAST,
    category: "high_protein",
  },
  {
    name: "Smoothie Bowl Verde",
    calories: 350,
    protein: 20,
    carbs: 55,
    fats: 8,
    image:
      "https://images.unsplash.com/photo-1543363136-3fdb62e11be5?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Espinaca, plátano, mango y semillas de chía",
    mealType: MealType.BREAKFAST,
    category: "low_calorie",
  },
  {
    name: "Huevos Revueltos con Jamón",
    calories: 320,
    protein: 24,
    carbs: 8,
    fats: 20,
    image:
      "https://images.unsplash.com/photo-1708782342368-fd224d1c0262?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Huevos con jamón de pavo y queso bajo en grasa",
    mealType: MealType.BREAKFAST,
    category: "high_protein",
  },
  {
    name: "Yogurt Griego con Granola",
    calories: 380,
    protein: 22,
    carbs: 45,
    fats: 12,
    image:
      "https://plus.unsplash.com/premium_photo-1692287212314-d90a4a3ec7bf?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Yogurt natural con granola casera y frutos rojos",
    mealType: MealType.BREAKFAST,
    category: "balanced",
  },
  {
    name: "Tortilla de Avena",
    calories: 340,
    protein: 18,
    carbs: 48,
    fats: 10,
    image:
      "https://images.unsplash.com/photo-1708782340359-962d49c68383?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Tortilla de avena con plátano y miel",
    mealType: MealType.BREAKFAST,
    category: "high_carb",
  },
  {
    name: "Cereal Integral con Leche",
    calories: 300,
    protein: 12,
    carbs: 55,
    fats: 6,
    image:
      "https://images.unsplash.com/photo-1571860155542-28f639eeab61?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Cereal de grano entero con leche descremada",
    mealType: MealType.BREAKFAST,
    category: "low_calorie",
  },
  {
    name: "Tostadas con Mantequilla de Maní",
    calories: 420,
    protein: 16,
    carbs: 52,
    fats: 18,
    image:
      "https://plus.unsplash.com/premium_photo-1699519510416-43acb585058e?q=80&w=935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Pan integral con mantequilla de maní y plátano",
    mealType: MealType.BREAKFAST,
    category: "high_carb",
  },
  {
    name: "Huevos Benedictos Light",
    calories: 380,
    protein: 22,
    carbs: 32,
    fats: 18,
    image:
      "https://media.istockphoto.com/id/1207229748/photo/two-eggs-benedict-looking-appetizing.jpg?s=2048x2048&w=is&k=20&c=J_66buxffMduDJhGo_KCJ5Of3Lqexu9jG9GkmRpdVuY=",
    description: "Huevos pochados con aguacate y pan integral",
    mealType: MealType.BREAKFAST,
    category: "balanced",
  },
  {
    name: "Batido de Proteína",
    calories: 280,
    protein: 30,
    carbs: 25,
    fats: 6,
    image:
      "https://images.unsplash.com/photo-1622818425825-1dcdb3a39c30?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Proteína en polvo, plátano y leche de almendras",
    mealType: MealType.BREAKFAST,
    category: "high_protein",
  },

  // LUNCH (15 comidas)
  {
    name: "Salmón a la Plancha",
    calories: 650,
    protein: 45,
    carbs: 40,
    fats: 28,
    image:
      "https://plus.unsplash.com/premium_photo-1726877140485-70692aafe655?q=80&w=919&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Con arroz integral, espárragos y ensalada verde",
    mealType: MealType.LUNCH,
    category: "high_protein",
  },
  {
    name: "Bowl Mediterráneo",
    calories: 620,
    protein: 32,
    carbs: 58,
    fats: 26,
    image:
      "https://images.unsplash.com/photo-1606882800976-ec40cfbb114d?q=80&w=919&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Garbanzos, hummus, pepino, tomate y quinoa",
    mealType: MealType.LUNCH,
    category: "balanced",
  },
  {
    name: "Ensalada César con Pollo",
    calories: 580,
    protein: 46,
    carbs: 32,
    fats: 28,
    image:
      "https://images.unsplash.com/photo-1580013759032-c96505e24c1f?q=80&w=909&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Lechuga romana, pollo a la parrilla, parmesano y crutones",
    mealType: MealType.LUNCH,
    category: "high_protein",
  },
  {
    name: "Burrito Bowl Fitness",
    calories: 640,
    protein: 42,
    carbs: 62,
    fats: 22,
    image:
      "https://images.unsplash.com/photo-1730878423239-0fd430bbac37?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Arroz, frijoles negros, pollo, guacamole y pico de gallo",
    mealType: MealType.LUNCH,
    category: "high_carb",
  },
  {
    name: "Pasta Integral con Atún",
    calories: 600,
    protein: 38,
    carbs: 72,
    fats: 18,
    image:
      "https://images.unsplash.com/photo-1588173178849-bfe1722f52df?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Fusilli integral con atún, tomate cherry y aceitunas",
    mealType: MealType.LUNCH,
    category: "high_carb",
  },
  {
    name: "Pollo a la Plancha con Verduras",
    calories: 520,
    protein: 42,
    carbs: 35,
    fats: 18,
    image:
      "https://images.unsplash.com/photo-1582429058754-7af6ca025717?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Pollo con brócoli, zanahoria y quinoa",
    mealType: MealType.LUNCH,
    category: "high_protein",
  },
  {
    name: "Ensalada de Quinoa y Pollo",
    calories: 550,
    protein: 40,
    carbs: 48,
    fats: 20,
    image:
      "https://plus.unsplash.com/premium_photo-1698867576489-6cbcca23ea76?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Quinoa, pollo, aguacate, tomate y aderezo ligero",
    mealType: MealType.LUNCH,
    category: "balanced",
  },
  {
    name: "Filete de Res con Batata",
    calories: 640,
    protein: 48,
    carbs: 45,
    fats: 26,
    image:
      "https://plus.unsplash.com/premium_photo-1723377627996-1003fa5152cb?q=80&w=921&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Carne magra con batata asada y judías verdes",
    mealType: MealType.LUNCH,
    category: "high_protein",
  },
  {
    name: "Pizza de Pollo BBQ Saludable",
    calories: 660,
    protein: 48,
    carbs: 64,
    fats: 24,
    image:
      "https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Base integral con pollo, cebolla morada y cilantro",
    mealType: MealType.LUNCH,
    category: "high_carb",
  },
  {
    name: "Tacos de Pescado",
    calories: 540,
    protein: 38,
    carbs: 48,
    fats: 20,
    image:
      "https://plus.unsplash.com/premium_photo-1664476631037-87a2714dd04e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Tortillas de maíz con pescado blanco y ensalada de col",
    mealType: MealType.LUNCH,
    category: "balanced",
  },
  {
    name: "Salmón Teriyaki con Edamame",
    calories: 620,
    protein: 46,
    carbs: 42,
    fats: 26,
    image:
      "https://images.unsplash.com/photo-1718878622326-e6271633d139?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Con arroz de coliflor y edamame salteado",
    mealType: MealType.LUNCH,
    category: "high_protein",
  },
  {
    name: "Wrap de Pollo y Vegetales",
    calories: 480,
    protein: 35,
    carbs: 45,
    fats: 16,
    image:
      "https://images.unsplash.com/photo-1673238112965-f1e92cdbd8cb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Tortilla integral con pollo, lechuga, tomate y aguacate",
    mealType: MealType.LUNCH,
    category: "low_calorie",
  },
  {
    name: "Sopa de Lentejas con Pollo",
    calories: 420,
    protein: 32,
    carbs: 38,
    fats: 12,
    image:
      "https://images.unsplash.com/photo-1708782340359-962d49c68383?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Sopa de lentejas con pollo desmenuzado",
    mealType: MealType.LUNCH,
    category: "low_calorie",
  },
  {
    name: "Ensalada de Atún",
    calories: 380,
    protein: 30,
    carbs: 25,
    fats: 18,
    image:
      "https://images.unsplash.com/photo-1604909052743-94e838986d24?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Atún, lechuga, tomate, cebolla y aceite de oliva",
    mealType: MealType.LUNCH,
    category: "high_protein",
  },
  {
    name: "Arroz con Pollo y Verduras",
    calories: 580,
    protein: 36,
    carbs: 68,
    fats: 14,
    image:
      "https://images.unsplash.com/photo-1715854501867-5533189a5e71?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Arroz integral con pollo, brócoli y zanahoria",
    mealType: MealType.LUNCH,
    category: "high_carb",
  },

  // DINNER (15 comidas)
  {
    name: "Pechuga de Pollo con Verduras",
    calories: 520,
    protein: 42,
    carbs: 35,
    fats: 18,
    image:
      "https://media.istockphoto.com/id/619069288/photo/grilled-chicken-breast-and-vegetables-in-the-pan.jpg?s=2048x2048&w=is&k=20&c=B-ozco3ERPlT3154u1ldr_EuUoq8MIMloael2oo9zc8=",
    description: "Pollo a la plancha con brócoli, zanahoria y quinoa",
    mealType: MealType.DINNER,
    category: "high_protein",
  },
  {
    name: "Pavo al Horno con Verduras",
    calories: 510,
    protein: 44,
    carbs: 38,
    fats: 18,
    image:
      "https://images.unsplash.com/photo-1546250683-afa23f23dde1?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Pechuga de pavo con calabacín, pimientos y arroz basmati",
    mealType: MealType.DINNER,
    category: "high_protein",
  },
  {
    name: "Gambas al Ajillo con Verduras",
    calories: 480,
    protein: 36,
    carbs: 38,
    fats: 20,
    image:
      "https://images.unsplash.com/photo-1730312383109-944b9875f68e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Gambas salteadas con ajo, espinaca y arroz integral",
    mealType: MealType.DINNER,
    category: "balanced",
  },
  {
    name: "Poké Bowl de Atún",
    calories: 590,
    protein: 42,
    carbs: 58,
    fats: 18,
    image:
      "https://images.unsplash.com/photo-1763612812628-b94f75b76b69?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Atún fresco, arroz sushi, edamame, pepino y aguacate",
    mealType: MealType.DINNER,
    category: "high_protein",
  },
  {
    name: "Lasaña de Berenjenas",
    calories: 580,
    protein: 34,
    carbs: 52,
    fats: 24,
    image:
      "https://images.unsplash.com/photo-1625215740221-1800b95852f8?q=80&w=938&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Berenjenas, carne magra, queso ricotta y tomate",
    mealType: MealType.DINNER,
    category: "balanced",
  },
  {
    name: "Salmón al Horno con Espárragos",
    calories: 540,
    protein: 40,
    carbs: 32,
    fats: 26,
    image:
      "https://images.unsplash.com/photo-1614627293113-e7e68163d958?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Salmón con espárragos y arroz integral",
    mealType: MealType.DINNER,
    category: "high_protein",
  },
  {
    name: "Pollo al Curry con Arroz",
    calories: 560,
    protein: 38,
    carbs: 55,
    fats: 20,
    image:
      "https://images.unsplash.com/photo-1707448829764-9474458021ed?q=80&w=901&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Pollo con curry ligero y arroz basmati",
    mealType: MealType.DINNER,
    category: "balanced",
  },
  {
    name: "Filete de Pescado a la Plancha",
    calories: 450,
    protein: 35,
    carbs: 28,
    fats: 20,
    image:
      "https://images.unsplash.com/photo-1700760933440-5c6a4b4224a4?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Pescado blanco con verduras al vapor",
    mealType: MealType.DINNER,
    category: "low_calorie",
  },
  {
    name: "Ternera Estofada con Verduras",
    calories: 520,
    protein: 40,
    carbs: 35,
    fats: 22,
    image:
      "https://images.unsplash.com/photo-1692742245738-f42241e02108?q=80&w=883&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Ternera magra con zanahorias, apio y patatas",
    mealType: MealType.DINNER,
    category: "high_protein",
  },
  {
    name: "Ensalada de Pollo y Aguacate",
    calories: 480,
    protein: 36,
    carbs: 28,
    fats: 24,
    image:
      "https://images.unsplash.com/photo-1582034986517-30d163aa1da9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Pollo, aguacate, lechuga, tomate y aderezo ligero",
    mealType: MealType.DINNER,
    category: "balanced",
  },
  {
    name: "Pasta Integral con Pollo",
    calories: 600,
    protein: 42,
    carbs: 68,
    fats: 18,
    image:
      "https://images.unsplash.com/photo-1728169201300-51949c642220?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Pasta integral con pollo, tomate y albahaca",
    mealType: MealType.DINNER,
    category: "high_carb",
  },
  {
    name: "Salmón con Quinoa y Verduras",
    calories: 550,
    protein: 38,
    carbs: 48,
    fats: 22,
    image:
      "https://plus.unsplash.com/premium_photo-1714242631274-877e28e62bd0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Salmón, quinoa, brócoli y zanahorias",
    mealType: MealType.DINNER,
    category: "balanced",
  },
  {
    name: "Pollo al Limón con Arroz",
    calories: 500,
    protein: 40,
    carbs: 45,
    fats: 16,
    image:
      "https://images.unsplash.com/photo-1707339088654-117df66bd55c?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Pollo con salsa de limón y arroz integral",
    mealType: MealType.DINNER,
    category: "high_protein",
  },
  {
    name: "Ensalada de Salmón",
    calories: 460,
    protein: 32,
    carbs: 25,
    fats: 24,
    image:
      "https://plus.unsplash.com/premium_photo-1676106624139-34377777aecc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Salmón ahumado, lechuga, aguacate y aderezo",
    mealType: MealType.DINNER,
    category: "low_calorie",
  },
  {
    name: "Pollo a la Parrilla con Batata",
    calories: 540,
    protein: 44,
    carbs: 42,
    fats: 18,
    image:
      "https://plus.unsplash.com/premium_photo-1670191894591-bc501a33de0d?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Pollo con batata asada y ensalada",
    mealType: MealType.DINNER,
    category: "high_protein",
  },

  // SNACK (15 comidas)
  {
    name: "Smoothie Proteico",
    calories: 280,
    protein: 25,
    carbs: 30,
    fats: 8,
    image:
      "https://plus.unsplash.com/premium_photo-1663853294230-0e53cddd88c8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Proteína de suero, plátano, espinaca y leche de almendras",
    mealType: MealType.SNACK,
    category: "high_protein",
  },
  {
    name: "Yogurt Griego con Nueces",
    calories: 260,
    protein: 20,
    carbs: 22,
    fats: 10,
    image:
      "https://plus.unsplash.com/premium_photo-1668615553230-5685cad769c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Yogurt natural con nueces, semillas de chía y miel",
    mealType: MealType.SNACK,
    category: "high_protein",
  },
  {
    name: "Batido Verde Energético",
    calories: 220,
    protein: 12,
    carbs: 35,
    fats: 6,
    image:
      "https://plus.unsplash.com/premium_photo-1661347868028-55440b53c791?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Espinaca, manzana, jengibre y limón",
    mealType: MealType.SNACK,
    category: "low_calorie",
  },
  {
    name: "Barrita de Proteína Casera",
    calories: 250,
    protein: 18,
    carbs: 28,
    fats: 8,
    image:
      "https://images.unsplash.com/photo-1554886729-fe8d4499a108?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Avena, proteína, mantequilla de maní y dátiles",
    mealType: MealType.SNACK,
    category: "high_protein",
  },
  {
    name: "Manzana con Almendras",
    calories: 230,
    protein: 8,
    carbs: 32,
    fats: 10,
    image:
      "https://images.unsplash.com/photo-1611110089740-de7cb7b03f5b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Manzana verde con mantequilla de almendras",
    mealType: MealType.SNACK,
    category: "balanced",
  },
  {
    name: "Smoothie de Chocolate y Banana",
    calories: 310,
    protein: 22,
    carbs: 42,
    fats: 8,
    image:
      "https://images.unsplash.com/photo-1603053396612-de07d4a8ca17?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Proteína de chocolate, plátano y leche de avena",
    mealType: MealType.SNACK,
    category: "high_protein",
  },
  {
    name: "Energy Balls",
    calories: 240,
    protein: 14,
    carbs: 32,
    fats: 8,
    image:
      "https://plus.unsplash.com/premium_photo-1726217054409-bae9bdb35211?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Dátiles, nueces, cacao y coco rallado",
    mealType: MealType.SNACK,
    category: "high_carb",
  },
  {
    name: "Hummus con Vegetales",
    calories: 200,
    protein: 8,
    carbs: 25,
    fats: 8,
    image:
      "https://plus.unsplash.com/premium_photo-1700084621410-941e5aa5d1e4?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Hummus casero con zanahorias y apio",
    mealType: MealType.SNACK,
    category: "low_calorie",
  },
  {
    name: "Batido de Frutas",
    calories: 180,
    protein: 6,
    carbs: 38,
    fats: 2,
    image:
      "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Fresas, plátano y leche descremada",
    mealType: MealType.SNACK,
    category: "low_calorie",
  },
  {
    name: "Nueces y Dátiles",
    calories: 280,
    protein: 6,
    carbs: 35,
    fats: 14,
    image:
      "https://images.unsplash.com/photo-1757449723357-4fa03553b8a0?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Mezcla de nueces, almendras y dátiles",
    mealType: MealType.SNACK,
    category: "high_fat",
  },
  {
    name: "Yogurt con Frutas",
    calories: 200,
    protein: 12,
    carbs: 28,
    fats: 4,
    image:
      "https://plus.unsplash.com/premium_photo-1663924211639-ed3b554132e2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Yogurt griego con fresas y arándanos",
    mealType: MealType.SNACK,
    category: "low_calorie",
  },
  {
    name: "Batido de Proteína y Avena",
    calories: 320,
    protein: 28,
    carbs: 35,
    fats: 8,
    image:
      "https://images.unsplash.com/photo-1685967836529-b0e8d6938227?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Proteína, avena, plátano y leche",
    mealType: MealType.SNACK,
    category: "high_protein",
  },
  {
    name: "Palitos de Queso y Frutas",
    calories: 190,
    protein: 10,
    carbs: 22,
    fats: 7,
    image:
      "https://images.unsplash.com/photo-1549320719-b97a0b5b8294?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Queso bajo en grasa con manzana",
    mealType: MealType.SNACK,
    category: "balanced",
  },
  {
    name: "Smoothie de Proteína Verde",
    calories: 250,
    protein: 20,
    carbs: 30,
    fats: 6,
    image:
      "https://plus.unsplash.com/premium_photo-1663853293868-9729d25fdf86?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://plus.unsplash.com/premium_photo-1726880737218-d625f535302b?q=80&w=740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Proteína, espinaca, kiwi y piña",
    mealType: MealType.SNACK,
    category: "high_protein",
  },
  {
    name: "Mix de Frutos Secos",
    calories: 300,
    protein: 10,
    carbs: 20,
    fats: 22,
    image:
      "https://plus.unsplash.com/premium_photo-1668677227454-213252229b73?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Almendras, nueces, pasas y arándanos secos",
    mealType: MealType.SNACK,
    category: "high_fat",
  },
];

export async function seedMeals(dataSource: DataSource): Promise<void> {
  const mealRepository = dataSource.getRepository(Meal);

  // Verificar si ya existen comidas
  const existingMeals = await mealRepository.count();
  if (existingMeals > 0) {
    console.log("✅ Meals already seeded, skipping...");
    return;
  }

  // Crear todas las comidas
  const meals = mealRepository.create(mealsSeed);
  await mealRepository.save(meals);

  console.log(`✅ Seeded ${meals.length} meals successfully!`);
}
