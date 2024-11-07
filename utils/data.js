const cropsInfo = [
  {
    cropName: "Rice",
    scientificName: "Oryza sativa",
    cultivationSeason: "May to September",
    imageUrl: "/images/rice.jpg",
    wateringSchedule: "Every 5 days",
    wateringInterval: 5, // in days
    diseases: [
      {
        diseaseName: "Bacterial Blight",
        season: "Rainy",
        symptoms: [
          "Water-soaked lesions on leaves",
          "Yellowing of leaf margins",
          "Plant stunting",
        ],
        prevention: [
          "Use resistant varieties",
          "Practice crop rotation",
          "Ensure proper drainage",
        ],
        fertilizers: {
          type: "Nitrogen, Phosphorus, and Potassium (NPK)",
          applicationTiming: "Apply before planting and at tillering stage",
        },
      },
      {
        diseaseName: "Rice Blast",
        season: "Warm and humid",
        symptoms: [
          "Dark, round lesions on leaves",
          "White or grayish centers in lesions",
          "Seedling death in severe cases",
        ],
        prevention: [
          "Use resistant varieties",
          "Apply fungicides at the right time",
          "Maintain good field sanitation",
        ],
        fertilizers: {
          type: "NPK, with emphasis on Nitrogen",
          applicationTiming: "Apply at planting and at early tillering",
        },
      },
    ],
  },
  {
    cropName: "Wheat",
    scientificName: "Triticum spp.",
    cultivationSeason: "October to April",
    imageUrl: "/images/wheat.jpg",
    wateringSchedule: "Every 5 days",
    wateringInterval: 5, // in days
    diseases: [
      {
        diseaseName: "Rust (Leaf and Stem)",
        season: "Warm and humid",
        symptoms: [
          "Red-orange pustules on leaves",
          "Yellowing of leaves",
          "Premature leaf drop",
        ],
        prevention: [
          "Use resistant varieties",
          "Apply fungicides",
          "Rotate crops",
        ],
        fertilizers: {
          type: "NPK with a focus on Phosphorus",
          applicationTiming: "Apply at planting and during tillering",
        },
      },
      {
        diseaseName: "Fusarium Head Blight",
        season: "Warm and humid",
        symptoms: [
          "Bleached heads",
          "Pink or white mold on grains",
          "Lower grain quality",
        ],
        prevention: [
          "Use resistant varieties",
          "Practice crop rotation",
          "Avoid excessive nitrogen fertilization",
        ],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply at planting and during flowering",
        },
      },
    ],
  },
  {
    cropName: "Maize",
    scientificName: "Zea mays",
    cultivationSeason: "April to July",
    imageUrl: "/images/maize.jpg",
    wateringSchedule: "Every 5 days",
    wateringInterval: 5, // in days
    diseases: [
      {
        diseaseName: "Gray Leaf Spot",
        season: "Warm and humid",
        symptoms: ["Gray lesions on leaves", "Leaf death", "Reduced yield"],
        prevention: [
          "Use resistant hybrids",
          "Apply fungicides if necessary",
          "Practice crop rotation",
        ],
        fertilizers: {
          type: "NPK with a focus on Nitrogen",
          applicationTiming:
            "Apply at planting and during the vegetative stage",
        },
      },
      {
        diseaseName: "Corn Smut",
        season: "Warm and humid",
        symptoms: [
          "Tumors on ears and kernels",
          "Galls can appear on other parts of the plant",
          "Reduced grain yield",
        ],
        prevention: [
          "Use resistant varieties",
          "Maintain good field hygiene",
          "Avoid planting in infected areas",
        ],
        fertilizers: {
          type: "NPK with adequate Zinc",
          applicationTiming: "Apply at planting and during flowering",
        },
      },
    ],
  },

  {
    cropName: "Tomato",
    scientificName: "Solanum lycopersicum",
    cultivationSeason: "March to June",
    imageUrl: "/images/tomato.jpg",
    diseases: [
      {
        diseaseName: "Late Blight",
        season: "Cool and moist",
        symptoms: [
          "Dark, water-soaked spots on leaves",
          "White mold on the undersides of leaves",
          "Rotting of fruits",
        ],
        prevention: [
          "Use resistant varieties",
          "Avoid overhead irrigation",
          "Apply fungicides during wet periods",
        ],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply at planting and during fruit set",
        },
      },
      {
        diseaseName: "Blossom End Rot",
        season: "Hot and dry",
        symptoms: [
          "Black sunken spots at the blossom end of fruits",
          "Reduced fruit quality",
        ],
        prevention: [
          "Maintain consistent soil moisture",
          "Use mulch to retain moisture",
          "Ensure adequate calcium levels in the soil",
        ],
        fertilizers: {
          type: "Calcium and NPK",
          applicationTiming: "Apply at planting and during fruit development",
        },
      },
    ],
  },
  {
    cropName: "Potato",
    scientificName: "Solanum tuberosum",
    cultivationSeason: "March to June",
    imageUrl: "/images/potato.jpg",
    diseases: [
      {
        diseaseName: "Potato Blight",
        season: "Cool and moist",
        symptoms: [
          "Dark brown spots on leaves",
          "White fungal growth on the undersides of leaves",
          "Blackened stems and tubers",
        ],
        prevention: [
          "Use resistant varieties",
          "Practice crop rotation",
          "Ensure good air circulation around plants",
        ],
        fertilizers: {
          type: "NPK with a focus on Phosphorus",
          applicationTiming: "Apply at planting and during tuber development",
        },
      },
      {
        diseaseName: "Black Leg",
        season: "Warm and moist",
        symptoms: [
          "Dark lesions at the base of the stem",
          "Soft, blackened tissue",
          "Plant wilting and death",
        ],
        prevention: [
          "Use certified disease-free seed",
          "Practice crop rotation",
          "Avoid planting in wet soils",
        ],
        fertilizers: {
          type: "NPK with Calcium",
          applicationTiming: "Apply at planting and during early growth",
        },
      },
    ],
  },
  {
    cropName: "Soybean",
    scientificName: "Glycine max",
    cultivationSeason: "May to September",
    imageUrl: "/images/soybean.jpg",
    diseases: [
      {
        diseaseName: "Soybean Cyst Nematode",
        season: "Warm and moist",
        symptoms: ["Stunted plants", "Yellowing of leaves", "Reduced yield"],
        prevention: ["Rotate with non-host crops", "Use resistant varieties"],
        fertilizers: {
          type: "NPK with a focus on Phosphorus",
          applicationTiming: "Apply at planting and during flowering",
        },
      },
      {
        diseaseName: "Frogeye Leaf Spot",
        season: "Warm and humid",
        symptoms: [
          "Circular, dark spots with a gray center on leaves",
          "Leaf drop and reduced yield",
        ],
        prevention: [
          "Use resistant varieties",
          "Practice crop rotation",
          "Apply fungicides if necessary",
        ],
        fertilizers: {
          type: "NPK",
          applicationTiming: "Apply at planting and during flowering",
        },
      },
    ],
  },
  {
    cropName: "Barley",
    scientificName: "Hordeum vulgare",
    cultivationSeason: "September to November",
    imageUrl: "/images/barley.jpg",
    diseases: [
      {
        diseaseName: "Barley Yellow Dwarf Virus",
        season: "Cool and moist",
        symptoms: ["Yellowing of leaves", "Stunted growth", "Reduced yield"],
        prevention: [
          "Rotate with non-host crops",
          "Use resistant varieties",
          "Control aphid populations",
        ],
        fertilizers: {
          type: "NPK with emphasis on Nitrogen",
          applicationTiming: "Apply at planting and during tillering",
        },
      },
      {
        diseaseName: "Net Blotch",
        season: "Warm and humid",
        symptoms: ["Dark lesions on leaves", "Leaf yellowing and death"],
        prevention: [
          "Use resistant varieties",
          "Apply fungicides if necessary",
        ],
        fertilizers: {
          type: "NPK",
          applicationTiming: "Apply at planting and during early growth",
        },
      },
    ],
  },
  {
    cropName: "Sugarcane",
    scientificName: "Saccharum officinarum",
    cultivationSeason: "March to June",
    imageUrl: "/images/sugarcane.jpg",
    diseases: [
      {
        diseaseName: "Sugarcane Mosaic Virus",
        season: "Warm",
        symptoms: [
          "Mosaic pattern on leaves",
          "Stunted growth",
          "Reduced sugar content",
        ],
        prevention: [
          "Use disease-free planting material",
          "Practice crop rotation",
        ],
        fertilizers: {
          type: "NPK with emphasis on Potassium",
          applicationTiming: "Apply before planting and during growth stages",
        },
      },
      {
        diseaseName: "Red Rot",
        season: "Warm and moist",
        symptoms: ["Red discoloration of stems", "Soft rot and reduced yield"],
        prevention: [
          "Use resistant varieties",
          "Maintain good field hygiene",
          "Avoid over-fertilization",
        ],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Chili",
    scientificName: "Capsicum annuum",
    cultivationSeason: "March to June",
    imageUrl: "/images/chili.jpg",
    diseases: [
      {
        diseaseName: "Bacterial Wilt",
        season: "Warm and moist",
        symptoms: [
          "Wilting of plants",
          "Discoloration of stems",
          "Reduced yield",
        ],
        prevention: [
          "Use resistant varieties",
          "Practice crop rotation",
          "Improve soil drainage",
        ],
        fertilizers: {
          type: "NPK with emphasis on Nitrogen",
          applicationTiming: "Apply at planting and during fruiting",
        },
      },
      {
        diseaseName: "Powdery Mildew",
        season: "Warm and humid",
        symptoms: [
          "White powdery growth on leaves",
          "Leaf curling and dropping",
        ],
        prevention: [
          "Use resistant varieties",
          "Apply fungicides if necessary",
          "Ensure good air circulation",
        ],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Onion",
    scientificName: "Allium cepa",
    cultivationSeason: "November to February",
    imageUrl: "/images/onion.jpg",
    diseases: [
      {
        diseaseName: "Downy Mildew",
        season: "Cool and moist",
        symptoms: [
          "Yellowing and wilting of leaves",
          "White, fuzzy growth on the underside of leaves",
        ],
        prevention: [
          "Use resistant varieties",
          "Apply fungicides during wet periods",
          "Ensure proper drainage",
        ],
        fertilizers: {
          type: "NPK with emphasis on Phosphorus",
          applicationTiming: "Apply at planting and during bulb development",
        },
      },
      {
        diseaseName: "Neck Rot",
        season: "Warm and moist",
        symptoms: [
          "Softening and rotting of neck",
          "Drying and yellowing of leaves",
        ],
        prevention: [
          "Use disease-free seeds",
          "Practice crop rotation",
          "Avoid over-watering",
        ],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply during bulb development",
        },
      },
    ],
  },

  {
    cropName: "Carrot",
    scientificName: "Daucus carota",
    cultivationSeason: "September to December",
    imageUrl: "/images/carrot.jpg",
    diseases: [
      {
        diseaseName: "Carrot Rust Fly",
        season: "Warm and moist",
        symptoms: [
          "Wilting and yellowing of leaves",
          "Larvae tunnels in roots",
        ],
        prevention: ["Use floating row covers", "Practice crop rotation"],
        fertilizers: {
          type: "NPK with emphasis on Potassium",
          applicationTiming: "Apply at planting and during root development",
        },
      },
    ],
  },
  {
    cropName: "Beetroot",
    scientificName: "Beta vulgaris",
    cultivationSeason: "April to July",
    imageUrl: "/images/beetroot.jpg",
    diseases: [
      {
        diseaseName: "Powdery Mildew",
        season: "Warm and humid",
        symptoms: [
          "White powdery spots on leaves",
          "Leaf curling and yellowing",
        ],
        prevention: ["Ensure good air circulation", "Use resistant varieties"],
        fertilizers: {
          type: "NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Cucumber",
    scientificName: "Cucumis sativus",
    cultivationSeason: "March to June",
    imageUrl: "/images/cucumber.jpg",
    diseases: [
      {
        diseaseName: "Cucumber Mosaic Virus",
        season: "Warm",
        symptoms: ["Mosaic pattern on leaves", "Stunted growth"],
        prevention: ["Use disease-free seeds", "Control aphid populations"],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Pumpkin",
    scientificName: "Cucurbita pepo",
    cultivationSeason: "April to July",
    imageUrl: "/images/pumpkin.jpg",
    diseases: [
      {
        diseaseName: "Powdery Mildew",
        season: "Warm and humid",
        symptoms: [
          "White powdery spots on leaves",
          "Leaf curling and yellowing",
        ],
        prevention: ["Ensure good air circulation", "Use resistant varieties"],
        fertilizers: {
          type: "NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Spinach",
    scientificName: "Spinacia oleracea",
    cultivationSeason: "October to February",
    imageUrl: "/images/spinach.jpg",
    diseases: [
      {
        diseaseName: "Downy Mildew",
        season: "Cool and moist",
        symptoms: ["Yellowing of leaves", "Fuzzy white growth on leaves"],
        prevention: [
          "Use resistant varieties",
          "Practice good air circulation",
        ],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Cauliflower",
    scientificName: "Brassica oleracea var. botrytis",
    cultivationSeason: "August to October",
    imageUrl: "/images/cauliflower.jpg",
    diseases: [
      {
        diseaseName: "Clubroot",
        season: "Cool and moist",
        symptoms: ["Wilting and stunted growth", "Swelling of roots"],
        prevention: ["Practice crop rotation", "Use resistant varieties"],
        fertilizers: {
          type: "NPK with emphasis on Phosphorus",
          applicationTiming: "Apply at planting and during growth",
        },
      },
    ],
  },
  {
    cropName: "Broccoli",
    scientificName: "Brassica oleracea var. italica",
    cultivationSeason: "August to October",
    imageUrl: "/images/broccoli.jpg",
    diseases: [
      {
        diseaseName: "Downy Mildew",
        season: "Cool and moist",
        symptoms: ["Yellowing of leaves", "Fuzzy white growth on leaves"],
        prevention: ["Ensure good air circulation", "Use resistant varieties"],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Bell Pepper",
    scientificName: "Capsicum annuum",
    cultivationSeason: "March to June",
    imageUrl: "/images/bellpepper.jpg",
    diseases: [
      {
        diseaseName: "Blossom End Rot",
        season: "Warm and dry",
        symptoms: [
          "Sunken dark spots at blossom end of fruits",
          "Reduced fruit quality",
        ],
        prevention: [
          "Maintain consistent soil moisture",
          "Use mulch to retain moisture",
        ],
        fertilizers: {
          type: "Calcium and NPK",
          applicationTiming: "Apply during fruit development",
        },
      },
    ],
  },
  {
    cropName: "Garlic",
    scientificName: "Allium sativum",
    cultivationSeason: "September to November",
    imageUrl: "/images/garlic.jpg",
    diseases: [
      {
        diseaseName: "White Rot",
        season: "Warm and moist",
        symptoms: ["White fluffy fungal growth on roots", "Stunted growth"],
        prevention: ["Practice crop rotation", "Use disease-free seeds"],
        fertilizers: {
          type: "NPK with emphasis on Nitrogen",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Lentils",
    scientificName: "Lens culinaris",
    cultivationSeason: "March to June",
    imageUrl: "/images/lentils.jpg",
    diseases: [
      {
        diseaseName: "Fusarium Wilt",
        season: "Warm and moist",
        symptoms: ["Yellowing of leaves", "Wilting and stunted growth"],
        prevention: ["Use resistant varieties", "Practice crop rotation"],
        fertilizers: {
          type: "NPK with emphasis on Phosphorus",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Peas",
    scientificName: "Pisum sativum",
    cultivationSeason: "November to February",
    imageUrl: "/images/peas.jpg",
    diseases: [
      {
        diseaseName: "Powdery Mildew",
        season: "Cool and moist",
        symptoms: [
          "White powdery spots on leaves",
          "Leaf curling and yellowing",
        ],
        prevention: ["Ensure good air circulation", "Use resistant varieties"],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Melon",
    scientificName: "Cucumis melo",
    cultivationSeason: "April to July",
    imageUrl: "/images/melon.jpg",
    diseases: [
      {
        diseaseName: "Fusarium Wilt",
        season: "Warm and dry",
        symptoms: ["Wilting and yellowing of leaves", "Stunted growth"],
        prevention: ["Use resistant varieties", "Practice crop rotation"],
        fertilizers: {
          type: "NPK with emphasis on Potassium",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Zucchini",
    scientificName: "Cucurbita pepo",
    cultivationSeason: "May to July",
    imageUrl: "/images/zucchini.jpg",
    diseases: [
      {
        diseaseName: "Powdery Mildew",
        season: "Warm and humid",
        symptoms: [
          "White powdery growth on leaves",
          "Leaf curling and dropping",
        ],
        prevention: [
          "Use resistant varieties",
          "Apply fungicides if necessary",
        ],
        fertilizers: {
          type: "NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Asparagus",
    scientificName: "Asparagus officinalis",
    cultivationSeason: "March to May",
    imageUrl: "/images/asparagus.jpg",
    diseases: [
      {
        diseaseName: "Fusarium Crown Rot",
        season: "Warm and moist",
        symptoms: ["Yellowing and wilting of shoots", "Rotting of crowns"],
        prevention: ["Use disease-free crowns", "Practice crop rotation"],
        fertilizers: {
          type: "NPK with emphasis on Potassium",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Artichoke",
    scientificName: "Cynara scolymus",
    cultivationSeason: "March to June",
    imageUrl: "/images/artichoke.jpg",
    diseases: [
      {
        diseaseName: "Rust",
        season: "Warm and humid",
        symptoms: [
          "Orange or yellow pustules on leaves",
          "Leaf curling and dropping",
        ],
        prevention: ["Ensure good air circulation", "Use resistant varieties"],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Cabbage",
    scientificName: "Brassica oleracea var. capitata",
    cultivationSeason: "August to November",
    imageUrl: "/images/cabbage.jpg",
    diseases: [
      {
        diseaseName: "Cabbage Root Maggot",
        season: "Cool and moist",
        symptoms: ["Wilting and stunted growth", "Larvae tunnels in roots"],
        prevention: ["Use floating row covers", "Practice crop rotation"],
        fertilizers: {
          type: "NPK with emphasis on Nitrogen",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Radish",
    scientificName: "Raphanus sativus",
    cultivationSeason: "March to May",
    imageUrl: "/images/radish.jpg",
    diseases: [
      {
        diseaseName: "Root Maggot",
        season: "Cool and moist",
        symptoms: ["Wilting and stunted growth", "Larvae tunnels in roots"],
        prevention: ["Use floating row covers", "Practice crop rotation"],
        fertilizers: {
          type: "NPK with emphasis on Potassium",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Sweet Corn",
    scientificName: "Zea mays saccharata",
    cultivationSeason: "May to August",
    imageUrl: "/images/sweetcorn.jpg",
    diseases: [
      {
        diseaseName: "Gray Leaf Spot",
        season: "Warm and humid",
        symptoms: ["Gray spots on leaves", "Leaf curling and yellowing"],
        prevention: ["Use resistant varieties", "Ensure good air circulation"],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Pomegranate",
    scientificName: "Punica granatum",
    cultivationSeason: "April to September",
    imageUrl: "/images/pomegranate.jpg",
    diseases: [
      {
        diseaseName: "Leaf Spot",
        season: "Warm and moist",
        symptoms: ["Dark spots on leaves", "Leaf curling and dropping"],
        prevention: [
          "Use resistant varieties",
          "Practice good air circulation",
        ],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Avocado",
    scientificName: "Persea americana",
    cultivationSeason: "April to September",
    imageUrl: "/images/avocado.jpg",
    diseases: [
      {
        diseaseName: "Root Rot",
        season: "Warm and moist",
        symptoms: ["Wilting and yellowing of leaves", "Soft, mushy roots"],
        prevention: ["Ensure good drainage", "Avoid over-watering"],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Blackberry",
    scientificName: "Rubus fruticosus",
    cultivationSeason: "May to September",
    imageUrl: "/images/blackberry.jpg",
    diseases: [
      {
        diseaseName: "Botrytis Blight",
        season: "Warm and humid",
        symptoms: ["Brown, fuzzy growth on fruit", "Wilting leaves"],
        prevention: ["Ensure good air circulation", "Practice crop rotation"],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Raspberry",
    scientificName: "Rubus idaeus",
    cultivationSeason: "May to September",
    imageUrl: "/images/raspberry.jpg",
    diseases: [
      {
        diseaseName: "Powdery Mildew",
        season: "Warm and humid",
        symptoms: [
          "White powdery growth on leaves",
          "Leaf curling and dropping",
        ],
        prevention: ["Use resistant varieties", "Ensure good air circulation"],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Lime",
    scientificName: "Citrus aurantiifolia",
    cultivationSeason: "April to September",
    imageUrl: "/images/lime.jpg",
    diseases: [
      {
        diseaseName: "Citrus Canker",
        season: "Warm and humid",
        symptoms: ["Yellow spots on leaves", "Lesions on fruits"],
        prevention: ["Use disease-free plants", "Practice good hygiene"],
        fertilizers: {
          type: "Citrus Fertilizer",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Papaya",
    scientificName: "Carica papaya",
    cultivationSeason: "April to September",
    imageUrl: "/images/papaya.jpg",
    diseases: [
      {
        diseaseName: "Papaya Ringspot Virus",
        season: "Warm",
        symptoms: ["Mosaic pattern on leaves", "Fruit deformation"],
        prevention: ["Use resistant varieties", "Control aphid populations"],
        fertilizers: {
          type: "Balanced NPK",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
  {
    cropName: "Ginger",
    scientificName: "Zingiber officinale",
    cultivationSeason: "March to June",
    imageUrl: "/images/ginger.jpg",
    diseases: [
      {
        diseaseName: "Soft Rot",
        season: "Warm and moist",
        symptoms: ["Rotting of rhizomes", "Wilting leaves"],
        prevention: ["Use disease-free seeds", "Ensure good drainage"],
        fertilizers: {
          type: "NPK with emphasis on Potassium",
          applicationTiming: "Apply during growth stages",
        },
      },
    ],
  },
];
const expertsInfo = [
  {
    id: 1,
    name: "Dr. Rajiv Sharma",
    expertise: "Crop Diseases and Pesticides",
    availability: "9 AM - 5 PM",
    rating: 4.5,
    imageUrl: "/images/experts/rajiv.jpg",
    price: 40,
  },
  {
    id: 2,
    name: "Ms. Neha Thakur",
    expertise: "Organic Farming Techniques",
    availability: "10 AM - 4 PM",
    price: 40,
    rating: 4.8,
    imageUrl: "/images/experts/neha.jpg",
  },
  {
    id: 3,
    name: "Dr. Suresh Pradhan",
    expertise: "Soil and Water Management",
    availability: "8 AM - 6 PM",
    rating: 4.6,
    price: 40,
    imageUrl: "/images/experts/suresh.jpg",
  },
  // Add more experts
];
const data = { cropsInfo, expertsInfo };
export default data;
