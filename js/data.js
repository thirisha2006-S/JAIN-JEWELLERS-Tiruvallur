// Jain Jewellers - Data Management & Local Storage Store
const DATA_KEYS = {
  PRODUCTS: 'jain_jewellers_products',
  RATES: 'jain_jewellers_rates',
  ENQUIRIES: 'jain_jewellers_enquiries',
  STORE_CONFIG: 'jain_jewellers_config'
};

const DEFAULT_STORE_CONFIG = {
  name: "JAIN JEWELLERS",
  tagline: "Elegant jewellery • Traditional designs • Special occasions",
  subtagline: "Elegance in Every Element — Tiruvallur's Trusted Jewellery Destination",
  address: "49, Bazaar Street, Tiruvallur, Tamil Nadu 602001",
  phone: "+91 88255 59001",
  rawPhone: "+918825559001",
  whatsappNumber: "918825559001",
  rating: 4.8,
  reviewCount: 9,
  mapsUrl: "https://maps.app.goo.gl/XpYz5cSGum5c9qGAA?g_st=awb&utm_source=chatgpt.com",
  mapsEmbedUrl: "https://maps.google.com/maps?q=49%2C+Bazaar+Street%2C+Tiruvallur%2C+Tamil+Nadu+602001&t=&z=16&ie=UTF8&iwloc=&output=embed",
  timings: "Monday – Sunday: 9:30 AM to 9:00 PM",
  makingChargeNote: "Lowest Wastage (V.A.) & Making Charges in Tiruvallur",
  hallmarkNote: "100% BIS 916 Hallmarked Gold & Certified Diamonds",
  disclaimerDismissed: false
};

const DEFAULT_RATES = {
  gold22k: 6750,
  gold24k: 7365,
  silver: 98.50,
  lastUpdated: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + " (10:00 AM IST)",
  trend: "up"
};

const DEFAULT_PRODUCTS = [
  {
    id: "jj-101",
    name: "Royal Lakshmi Antique Temple Haaram",
    category: "Chains and necklaces",
    purity: "22K BIS 916",
    weight: "48.500",
    price: 345000,
    makingCharge: "7% V.A.",
    image: "assets/images/temple-necklace.jpg",
    description: "Exquisite South Indian handcrafted antique temple haaram featuring central Goddess Lakshmi seated with gaja (elephants), adorned with fine cabochon rubies and emeralds. BIS 916 Hallmarked.",
    inStock: true,
    featured: true,
    tags: ["Temple", "Antique", "Bridal", "Lakshmi", "Necklace"]
  },
  {
    id: "jj-102",
    name: "Handcrafted Peacock Nakshi Kada Bangles",
    category: "Earrings and bangles",
    purity: "22K BIS 916",
    weight: "36.200",
    price: 258000,
    makingCharge: "6% V.A.",
    image: "assets/images/gold-bangles.jpg",
    description: "Pair of regal heirloom Kada bangles sculpted with embossed royal peacocks, intricate filigree creepers, and authentic BIS 916 hallmark engraving. Screw openable lock.",
    inStock: true,
    featured: true,
    tags: ["Bangles", "Kada", "Peacock", "Nakshi", "Handcrafted"]
  },
  {
    id: "jj-103",
    name: "South Indian Antique Temple Jhumkas",
    category: "Earrings and bangles",
    purity: "22K BIS 916",
    weight: "22.800",
    price: 162500,
    makingCharge: "8% V.A.",
    image: "assets/images/jhumka-earrings.jpg",
    description: "Grand multi-tier antique gold jhumkas adorned with emerald stones, ruby accents, and cascading clusters of natural seed pearls. Perfect for wedding celebrations.",
    inStock: true,
    featured: true,
    tags: ["Earrings", "Jhumkas", "Temple", "Pearls", "Traditional"]
  },
  {
    id: "jj-104",
    name: "Imperial South Indian Bridal Jewellery Set",
    category: "Bridal jewellery and rings",
    purity: "22K BIS 916",
    weight: "92.000",
    price: 655000,
    makingCharge: "8% V.A.",
    image: "assets/images/hero-bridal.jpg",
    description: "Complete royal bridal collection including master choker necklace, long mango haaram, matching temple jhumkas, and waist vaddanam motif. Hand-set with heirloom gemstones.",
    inStock: true,
    featured: true,
    tags: ["Bridal", "Wedding", "Haaram", "Choker", "Royal"]
  },
  {
    id: "jj-105",
    name: "Certified Solitaire Diamond Engagement Ring",
    category: "Bridal jewellery and rings",
    purity: "18K Gold + Diamond",
    weight: "5.400",
    price: 185000,
    makingCharge: "10% V.A.",
    image: "assets/images/diamond-ring.jpg",
    description: "IGI / SGL Certified 1.25 ct brilliant round cut natural diamond with pavé set diamond band in 18K white-yellow gold. Comes with authentic gemmological certificate.",
    inStock: true,
    featured: true,
    tags: ["Diamond", "Ring", "Solitaire", "Engagement", "Certified"]
  },
  {
    id: "jj-106",
    name: "Classic 22K Gold Rope Chain with Kasu Pendant",
    category: "Chains and necklaces",
    purity: "22K BIS 916",
    weight: "16.500",
    price: 118000,
    makingCharge: "5% V.A.",
    image: "assets/images/temple-necklace.jpg",
    description: "Durable multi-strand machine polished 22K gold rope chain with a traditional stamped Lakshmi Kasu coin pendant. Ideal for daily sacred wear.",
    inStock: true,
    featured: false,
    tags: ["Gold jewellery", "Chains", "Kasu", "Daily Wear"]
  },
  {
    id: "jj-107",
    name: "Traditional Floral Daily Wear Valayal Bangles",
    category: "Earrings and bangles",
    purity: "22K BIS 916",
    weight: "24.000",
    price: 171000,
    makingCharge: "5.5% V.A.",
    image: "assets/images/gold-bangles.jpg",
    description: "Set of 4 lightweight precision laser-cut floral bangles in 22K 916 hallmarked yellow gold with lustrous diamond-cut facets that catch the light elegantly.",
    inStock: true,
    featured: false,
    tags: ["Bangles", "Valayal", "Daily Wear", "Gold"]
  },
  {
    id: "jj-108",
    name: "Antique Temple Mango Mala Choker",
    category: "Gold jewellery",
    purity: "22K BIS 916",
    weight: "32.000",
    price: 228000,
    makingCharge: "6.5% V.A.",
    image: "assets/images/temple-necklace.jpg",
    description: "Timeless South Indian Manga Malai choker studded with Burmese red rubies and cabochon emeralds. Lalithaa-style transparent value addition with zero wastage gimmicks.",
    inStock: true,
    featured: false,
    tags: ["Gold jewellery", "Manga Malai", "Choker", "Traditional"]
  }
];

const DEFAULT_REVIEWS = [
  {
    id: 1,
    name: "Karthik Subramanian",
    rating: 5,
    date: "2 weeks ago",
    comment: "Best jewellery shop in Tiruvallur Bazaar Street. Lowest making charges compared to big showrooms. The owner explained weight and 916 hallmark very clearly. 100% recommended!",
    verified: true
  },
  {
    id: 2,
    name: "Meenakshi Sundaram",
    rating: 5,
    date: "1 month ago",
    comment: "Bought antique bridal haaram and bangles for my daughter's wedding. Designs are comparable to Lalithaa and GRT, but price and wastage percentage are much more honest.",
    verified: true
  },
  {
    id: 3,
    name: "Vignesh Kumar",
    rating: 5,
    date: "2 months ago",
    comment: "Very polite behavior from the staff. They gave proper computer bill with breakdown of gold rate, gross weight, net weight and making charges. Prime location in Bazaar Street.",
    verified: true
  },
  {
    id: 4,
    name: "Radha Jayaraman",
    rating: 4.8,
    date: "3 months ago",
    comment: "Extremely reliable family jewellers in Tiruvallur. The gold scheme calculation is very beneficial. Custom temple design was delivered right on time.",
    verified: true
  }
];

const DEFAULT_ENQUIRIES = [
  {
    id: "enq-101",
    name: "Praveen Kumar",
    phone: "+91 94441 23456",
    product: "Royal Lakshmi Antique Temple Haaram",
    category: "Bridal jewellery",
    message: "Would like to know today's exact booking price and making charge discount.",
    date: "Today, 11:45 AM",
    status: "New"
  },
  {
    id: "enq-102",
    name: "Divya Lakshmi",
    phone: "+91 98402 78901",
    product: "Handcrafted Peacock Nakshi Kada Bangles",
    category: "Bangles",
    message: "Can we customize size to 2.6? Please reply on WhatsApp.",
    date: "Yesterday, 4:20 PM",
    status: "Contacted"
  }
];

// Helper Functions for Data Persistence
function getStoredData(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error('Error reading localStorage for', key, e);
    return fallback;
  }
}

function setStoredData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error writing to localStorage for', key, e);
  }
}

// Initializer
function initStoreData() {
  if (!localStorage.getItem(DATA_KEYS.PRODUCTS)) {
    setStoredData(DATA_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
  }
  if (!localStorage.getItem(DATA_KEYS.RATES)) {
    setStoredData(DATA_KEYS.RATES, DEFAULT_RATES);
  }
  if (!localStorage.getItem(DATA_KEYS.ENQUIRIES)) {
    setStoredData(DATA_KEYS.ENQUIRIES, DEFAULT_ENQUIRIES);
  }
  if (!localStorage.getItem(DATA_KEYS.STORE_CONFIG)) {
    setStoredData(DATA_KEYS.STORE_CONFIG, DEFAULT_STORE_CONFIG);
  }
}

// Export to window
window.JainData = {
  KEYS: DATA_KEYS,
  getStoredData,
  setStoredData,
  initStoreData,
  DEFAULT_PRODUCTS,
  DEFAULT_RATES,
  DEFAULT_STORE_CONFIG,
  DEFAULT_REVIEWS
};
