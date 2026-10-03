/* ==========================================================================
   DATA STORE - MILON MACHINARIES
   Production-Ready Industrial Machinery Catalog (Pure Minimalist Typography)
   ========================================================================== */

const COMPANY_INFO = {
  name: "Milon Machinaries",
  legalName: "Milon Machinaries Ltd.",
  tagline: "Premier Industrial Machinery Supplier & Precision Engineering Solutions",
  email: "me.hasaniqbalme@gmail.com",
  phone: "+880 1711-892341",
  landline: "+880 2-9554102",
  address: "10/2 Modon Pal Lane, Dhaka, 1100, Bangladesh",
  tradeLicense: "TRAD/DSCC/019284/2021",
  tinNumber: "389102478192",
  established: 1998,
  hours: "Saturday – Thursday: 9:00 AM – 7:00 PM (Friday Closed)",
  workshopArea: "12,500 sq. ft. Central Workshop & Showroom in Dhaka",
  certifications: ["ISO 9001:2015 Certified", "BUET Quality Inspected", "BSTI Compliant Import License"]
};

const MACHINERY_CATALOG = [
  {
    id: "mm-l6240",
    model: "MM-L6240",
    name: "Heavy Duty Precision Engine Lathe",
    category: "Lathes & Turning",
    condition: "Brand New",
    inStock: true,
    priceUSD: 8450,
    priceBDT: 985000,
    rating: 4.9,
    shortDesc: "High rigid bed, hardened induction guide ways, ideal for precision turning, facing, threading, and boring in Dhaka engineering workshops.",
    specs: {
      "Max Swing Over Bed": "400 mm (16\")",
      "Distance Between Centers": "1000 mm (40\")",
      "Spindle Bore Diameter": "52 mm (2.05\")",
      "Spindle Motor Power": "5.5 kW / 7.5 HP (3-Phase 380V)",
      "Spindle Speed Range": "45 - 1800 RPM (12 steps)",
      "Tailstock Taper": "MT4",
      "Net Weight": "1,550 kg",
      "Warranty": "2 Years Full Parts & On-Site Service"
    },
    tags: ["lathe", "turning", "engine lathe", "machining", "metalwork", "heavy duty"]
  },
  {
    id: "mm-cnc500",
    model: "MM-CNC500",
    name: "Slant Bed CNC Turning Center",
    category: "CNC & Milling",
    condition: "Brand New",
    inStock: true,
    priceUSD: 24500,
    priceBDT: 2850000,
    rating: 5.0,
    shortDesc: "High performance slant-bed CNC lathe equipped with Siemens 808D Advanced controller and 8-station hydraulic turret for batch manufacturing.",
    specs: {
      "Control System": "Siemens 808D Advanced CNC / Fanuc 0i-TF optional",
      "Max Turning Diameter": "360 mm",
      "Max Turning Length": "500 mm",
      "Spindle Speed": "4500 RPM High Speed Spindle",
      "Turret Capacity": "8-Station Hydraulic Turret",
      "Positioning Accuracy": "±0.005 mm",
      "Machine Weight": "3,400 kg",
      "Warranty": "3 Years Controller & Spindle Guarantee"
    },
    tags: ["cnc", "turning center", "siemens", "automation", "precision", "slant bed"]
  },
  {
    id: "mm-vmc850",
    model: "MM-VMC850",
    name: "High-Speed Vertical Machining Center",
    category: "CNC & Milling",
    condition: "Brand New",
    inStock: true,
    priceUSD: 38900,
    priceBDT: 4520000,
    rating: 4.95,
    shortDesc: "3-Axis VMC with linear roller guideways, 10,000 RPM BT40 spindle, and 24-tool ARM type automatic tool changer for die & mold making.",
    specs: {
      "Table Size": "1000 x 500 mm",
      "X/Y/Z Axis Travel": "850 / 500 / 550 mm",
      "Spindle Taper": "BT40 / 10,000 RPM",
      "Tool Magazine": "24 Tool Arm Type ATC",
      "Rapid Traverse (X/Y/Z)": "36 / 36 / 30 m/min",
      "Max Table Load": "600 kg",
      "Machine Weight": "5,200 kg",
      "Warranty": "2 Years On-Site Support & Training"
    },
    tags: ["vmc", "milling", "cnc", "3 axis", "mold making", "high speed"]
  },
  {
    id: "mm-hp100t",
    model: "MM-HP100T",
    name: "100-Ton Motorized Hydraulic Workshop Press",
    category: "Hydraulic & Metalwork",
    condition: "In Stock - Fast Delivery",
    inStock: true,
    priceUSD: 4200,
    priceBDT: 490000,
    rating: 4.8,
    shortDesc: "Heavy duty double-acting hydraulic cylinder press for pressing bearings, bending, straightening, and deep drawing applications.",
    specs: {
      "Nominal Force": "1000 kN (100 Metric Tons)",
      "Piston Stroke": "300 mm",
      "Max Working Pressure": "25 MPa (250 Bar)",
      "Table Dimensions": "800 x 400 mm",
      "Motor Power": "4.0 kW Dual Speed Pump",
      "Overall Dimensions": "1350 x 750 x 2100 mm",
      "Net Weight": "1,100 kg",
      "Warranty": "2 Years Seal & Cylinder Warranty"
    },
    tags: ["hydraulic", "press", "100 ton", "bearing press", "metal forming"]
  },
  {
    id: "mm-dg150kva",
    model: "MM-DG150KVA",
    name: "150 kVA Soundproof Industrial Diesel Generator",
    category: "Power & Air",
    condition: "Brand New",
    inStock: true,
    priceUSD: 14800,
    priceBDT: 1725000,
    rating: 4.9,
    shortDesc: "Heavy duty industrial power generator powered by Cummins 6BTA 5.9-G2 engine with Stamford alternator and DeepSea ATS automatic switch.",
    specs: {
      "Prime Power Rating": "150 kVA / 120 kW (3-Phase 400V 50Hz)",
      "Engine Brand": "Cummins 6BTA 5.9-G2 Turbocharged",
      "Alternator": "Stamford Brushless 100% Copper Winding",
      "Controller Panel": "Deepsea DSE7320 Auto Start Module",
      "Canopy Type": "70 dBA @ 7m Ultra-Silent Weatherproof",
      "Fuel Tank Capacity": "350 Liters (12 Hours Continuous)",
      "Weight": "2,150 kg",
      "Warranty": "2 Years or 2000 Running Hours"
    },
    tags: ["generator", "diesel", "cummins", "power", "150 kva", "soundproof"]
  },
  {
    id: "mm-scr30",
    model: "MM-SCR30",
    name: "30 HP Rotary Screw Air Compressor Package",
    category: "Power & Air",
    condition: "Brand New",
    inStock: true,
    priceUSD: 6100,
    priceBDT: 710000,
    rating: 4.85,
    shortDesc: "Energy efficient rotary screw compressor complete with integrated refrigerated air dryer, precision oil separator filters, and 500L receiver tank.",
    specs: {
      "Motor Power": "22 kW / 30 HP",
      "Air Delivery (FAD)": "3.6 m³/min (127 CFM)",
      "Working Pressure": "8.0 Bar (116 PSI)",
      "Cooling Method": "Air Cooled Heavy Duty Radiator",
      "Noise Level": "65 ± 2 dBA",
      "Air Tank Capacity": "500 Liters Vertical Receiver",
      "Weight": "780 kg",
      "Warranty": "3 Years Air-End Assembly Warranty"
    },
    tags: ["compressor", "rotary screw", "air compressor", "pneumatic", "dryer"]
  },
  {
    id: "mm-shear-3200",
    model: "MM-SHEAR-3200",
    name: "Hydraulic Guillotine Plate Shearing Machine",
    category: "Hydraulic & Metalwork",
    condition: "In Stock - Fast Delivery",
    inStock: true,
    priceUSD: 16500,
    priceBDT: 1920000,
    rating: 4.88,
    shortDesc: "High accuracy hydraulic plate shear with ESTUN E21S NC backgauge positioning controller for sheet metal fabrication works.",
    specs: {
      "Max Cutting Thickness": "6.0 mm (Mild Steel) / 3.0 mm (Stainless)",
      "Max Cutting Length": "3200 mm (10 Feet)",
      "Shearing Angle": "1.5° Adjustable",
      "Backgauge Stroke": "20 - 750 mm (NC Motorized)",
      "Main Motor Power": "7.5 kW",
      "Overall Weight": "5,800 kg",
      "Warranty": "2 Years Hydraulic & Blade Guarantee"
    },
    tags: ["shearing", "guillotine", "sheet metal", "hydraulic shear", "fabrication"]
  },
  {
    id: "mm-chk4-250",
    model: "MM-CHK4-250",
    name: "250mm 4-Jaw Independent Lathe Chuck",
    category: "Spare Parts & Accessories",
    condition: "In Stock - Fast Delivery",
    inStock: true,
    priceUSD: 240,
    priceBDT: 28000,
    rating: 4.9,
    shortDesc: "Premium forged steel body 4-jaw independent lathe chuck with reversible hardened jaws and back mounting plate suitable for D1-6 spindles.",
    specs: {
      "Chuck Diameter": "250 mm (10\")",
      "Mounting Type": "Short Cylindrical / Adaptor Plate",
      "Max RPM": "2200 RPM",
      "Body Material": "Forged High Tensile Ductile Iron",
      "Included Accessories": "Reversible Jaws, T-Wrench, Mounting Bolts",
      "Warranty": "1 Year Factory Warranty"
    },
    tags: ["lathe chuck", "4 jaw", "chucks", "tooling", "lathe spare part"]
  }
];

const COMPANY_SERVICES = [
  {
    id: "srv-custom-machining",
    title: "Precision Lathe & Gear Machining",
    icon: "⚙️",
    desc: "Custom shaft turning, heavy thread cutting, spur & helical gear cutting, spline milling up to 3 meters length at our Dhaka workshop."
  },
  {
    id: "srv-hydraulic-rebuild",
    title: "Hydraulic Cylinder & Pump Overhaul",
    icon: "🛠️",
    desc: "Complete re-chroming, honing, seal replacement, and pressure testing up to 350 Bar for industrial hydraulic rams and pumps."
  },
  {
    id: "srv-generator-service",
    title: "Industrial Generator Maintenance & ATS Setup",
    icon: "⚡",
    desc: "Onsite 24/7 emergency generator repair, motor rewinding, load testing, and Automatic Transfer Switch (ATS) commissioning."
  },
  {
    id: "srv-installation",
    title: "Turnkey Machine Installation & Foundation Work",
    icon: "🏗️",
    desc: "Precision leveling, vibration isolation dampening pad alignment, 3-phase wiring setup, and commissioning across Bangladesh factories."
  }
];

const FAQS = [
  {
    question: "Where is Milon Machinaries located in Dhaka?",
    answer: "Our showroom, spare parts depot, and central engineering workshop are located at 10/2 Modon Pal Lane, Dhaka, 1100, Bangladesh. You are welcome to visit Saturday to Thursday between 9:00 AM and 7:00 PM to inspect working machinery demonstrations."
  },
  {
    question: "How can I request a formal procurement quotation?",
    answer: "You can submit an inquiry directly through our website RFQ Builder, email us at me.hasaniqbalme@gmail.com, or call our hotline +880 1711-892341. Formal quotations with VAT/Tax breakdown and delivery timelines are issued within 2 hours."
  },
  {
    question: "Do you provide installation and warranty support outside Dhaka?",
    answer: "Yes! Milon Machinaries provides full turnkey installation, technical training, and warranty support nationwide including Chittagong, Gazipur, Narayanganj, Khulna, Bogra, and Rajshahi industrial zones."
  },
  {
    question: "Are spare parts and cutting tools readily available in stock?",
    answer: "Absolutely. We maintain a 50,000+ item inventory of lathe chucks, DRO systems, hydraulic seals, carbide inserts, belts, and motors at our Dhaka depot to ensure zero downtime for your factory."
  }
];
