/**
 * Generates src/data/uk/uk-cities.json with 150+ UK cities/towns.
 *
 * Usage:  node scripts/generate-uk-cities.mjs
 * Output: src/data/uk/uk-cities.json
 */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, "../src/data/uk/uk-cities.json");

/** [cityName, region] — region drives internal linking clusters */
const CITIES = [
  // Greater London
  ["London", "Greater London"],
  ["Croydon", "Greater London"],
  ["Bromley", "Greater London"],
  ["Sutton", "Greater London"],
  ["Kingston upon Thames", "Greater London"],
  ["Harrow", "Greater London"],
  ["Ealing", "Greater London"],
  ["Hounslow", "Greater London"],
  ["Enfield", "Greater London"],
  ["Barnet", "Greater London"],
  ["Ilford", "Greater London"],
  ["Romford", "Greater London"],
  ["Wembley", "Greater London"],
  ["Greenwich", "Greater London"],
  ["Woolwich", "Greater London"],

  // Greater Manchester
  ["Manchester", "Greater Manchester"],
  ["Salford", "Greater Manchester"],
  ["Bolton", "Greater Manchester"],
  ["Oldham", "Greater Manchester"],
  ["Stockport", "Greater Manchester"],
  ["Rochdale", "Greater Manchester"],
  ["Bury", "Greater Manchester"],
  ["Wigan", "Greater Manchester"],
  ["Tameside", "Greater Manchester"],
  ["Trafford", "Greater Manchester"],

  // Merseyside
  ["Liverpool", "Merseyside"],
  ["Birkenhead", "Merseyside"],
  ["St Helens", "Merseyside"],
  ["Bootle", "Merseyside"],
  ["Southport", "Merseyside"],
  ["Crosby", "Merseyside"],
  ["Wallasey", "Merseyside"],

  // Lancashire
  ["Preston", "Lancashire"],
  ["Blackpool", "Lancashire"],
  ["Blackburn", "Lancashire"],
  ["Burnley", "Lancashire"],
  ["Lancaster", "Lancashire"],
  ["Chorley", "Lancashire"],
  ["Accrington", "Lancashire"],
  ["Morecambe", "Lancashire"],

  // West Yorkshire
  ["Leeds", "West Yorkshire"],
  ["Bradford", "West Yorkshire"],
  ["Wakefield", "West Yorkshire"],
  ["Huddersfield", "West Yorkshire"],
  ["Halifax", "West Yorkshire"],
  ["Dewsbury", "West Yorkshire"],
  ["Keighley", "West Yorkshire"],
  ["Pontefract", "West Yorkshire"],

  // South Yorkshire
  ["Sheffield", "South Yorkshire"],
  ["Doncaster", "South Yorkshire"],
  ["Rotherham", "South Yorkshire"],
  ["Barnsley", "South Yorkshire"],

  // Tyne and Wear
  ["Newcastle upon Tyne", "Tyne and Wear"],
  ["Sunderland", "Tyne and Wear"],
  ["Gateshead", "Tyne and Wear"],
  ["South Shields", "Tyne and Wear"],
  ["Tynemouth", "Tyne and Wear"],
  ["Washington", "Tyne and Wear"],

  // North East England
  ["Middlesbrough", "North East England"],
  ["Hartlepool", "North East England"],
  ["Darlington", "North East England"],
  ["Stockton-on-Tees", "North East England"],
  ["Durham", "North East England"],
  ["Scarborough", "North East England"],

  // West Midlands
  ["Birmingham", "West Midlands"],
  ["Coventry", "West Midlands"],
  ["Wolverhampton", "West Midlands"],
  ["Solihull", "West Midlands"],
  ["Dudley", "West Midlands"],
  ["Walsall", "West Midlands"],
  ["West Bromwich", "West Midlands"],

  // Staffordshire
  ["Stoke-on-Trent", "Staffordshire"],
  ["Stafford", "Staffordshire"],
  ["Cannock", "Staffordshire"],
  ["Lichfield", "Staffordshire"],
  ["Burton upon Trent", "Staffordshire"],
  ["Tamworth", "Staffordshire"],

  // Shropshire
  ["Telford", "Shropshire"],
  ["Shrewsbury", "Shropshire"],

  // Nottinghamshire
  ["Nottingham", "Nottinghamshire"],
  ["Mansfield", "Nottinghamshire"],
  ["Worksop", "Nottinghamshire"],
  ["Newark", "Nottinghamshire"],

  // Derbyshire
  ["Derby", "Derbyshire"],
  ["Chesterfield", "Derbyshire"],
  ["Buxton", "Derbyshire"],
  ["Matlock", "Derbyshire"],

  // Leicestershire
  ["Leicester", "Leicestershire"],
  ["Loughborough", "Leicestershire"],
  ["Hinckley", "Leicestershire"],

  // Northamptonshire
  ["Northampton", "Northamptonshire"],
  ["Kettering", "Northamptonshire"],
  ["Corby", "Northamptonshire"],
  ["Wellingborough", "Northamptonshire"],

  // Lincolnshire
  ["Lincoln", "Lincolnshire"],
  ["Grimsby", "Lincolnshire"],
  ["Scunthorpe", "Lincolnshire"],
  ["Boston", "Lincolnshire"],
  ["Skegness", "Lincolnshire"],

  // Norfolk
  ["Norwich", "Norfolk"],
  ["Great Yarmouth", "Norfolk"],
  ["King's Lynn", "Norfolk"],

  // Suffolk
  ["Ipswich", "Suffolk"],
  ["Bury St Edmunds", "Suffolk"],
  ["Lowestoft", "Suffolk"],

  // Cambridgeshire
  ["Cambridge", "Cambridgeshire"],
  ["Peterborough", "Cambridgeshire"],
  ["Ely", "Cambridgeshire"],
  ["Huntingdon", "Cambridgeshire"],

  // Essex
  ["Chelmsford", "Essex"],
  ["Colchester", "Essex"],
  ["Basildon", "Essex"],
  ["Southend-on-Sea", "Essex"],
  ["Harlow", "Essex"],
  ["Braintree", "Essex"],
  ["Brentwood", "Essex"],

  // Hertfordshire
  ["Watford", "Hertfordshire"],
  ["St Albans", "Hertfordshire"],
  ["Hemel Hempstead", "Hertfordshire"],
  ["Stevenage", "Hertfordshire"],
  ["Welwyn Garden City", "Hertfordshire"],

  // Bedfordshire
  ["Luton", "Bedfordshire"],
  ["Bedford", "Bedfordshire"],
  ["Dunstable", "Bedfordshire"],

  // Buckinghamshire
  ["Milton Keynes", "Buckinghamshire"],
  ["High Wycombe", "Buckinghamshire"],
  ["Aylesbury", "Buckinghamshire"],
  ["Slough", "Berkshire"],

  // Berkshire
  ["Reading", "Berkshire"],
  ["Bracknell", "Berkshire"],
  ["Windsor", "Berkshire"],
  ["Newbury", "Berkshire"],

  // Oxfordshire
  ["Oxford", "Oxfordshire"],
  ["Banbury", "Oxfordshire"],
  ["Bicester", "Oxfordshire"],
  ["Abingdon", "Oxfordshire"],

  // Hampshire
  ["Southampton", "Hampshire"],
  ["Portsmouth", "Hampshire"],
  ["Basingstoke", "Hampshire"],
  ["Winchester", "Hampshire"],
  ["Aldershot", "Hampshire"],
  ["Farnborough", "Hampshire"],
  ["Eastleigh", "Hampshire"],

  // Surrey
  ["Guildford", "Surrey"],
  ["Woking", "Surrey"],
  ["Epsom", "Surrey"],
  ["Reigate", "Surrey"],
  ["Camberley", "Surrey"],

  // Kent
  ["Maidstone", "Kent"],
  ["Canterbury", "Kent"],
  ["Ashford", "Kent"],
  ["Dover", "Kent"],
  ["Margate", "Kent"],
  ["Ramsgate", "Kent"],
  ["Folkestone", "Kent"],
  ["Tonbridge", "Kent"],
  ["Tunbridge Wells", "Kent"],

  // East Sussex
  ["Brighton", "East Sussex"],
  ["Hastings", "East Sussex"],
  ["Eastbourne", "East Sussex"],
  ["Lewes", "East Sussex"],

  // West Sussex
  ["Worthing", "West Sussex"],
  ["Crawley", "West Sussex"],
  ["Chichester", "West Sussex"],
  ["Horsham", "West Sussex"],

  // Dorset
  ["Bournemouth", "Dorset"],
  ["Poole", "Dorset"],
  ["Weymouth", "Dorset"],
  ["Dorchester", "Dorset"],

  // Somerset
  ["Bath", "Somerset"],
  ["Taunton", "Somerset"],
  ["Yeovil", "Somerset"],
  ["Weston-super-Mare", "Somerset"],

  // Bristol
  ["Bristol", "Bristol"],

  // Gloucestershire
  ["Gloucester", "Gloucestershire"],
  ["Cheltenham", "Gloucestershire"],
  ["Stroud", "Gloucestershire"],

  // Wiltshire
  ["Swindon", "Wiltshire"],
  ["Salisbury", "Wiltshire"],

  // Devon
  ["Plymouth", "Devon"],
  ["Exeter", "Devon"],
  ["Torquay", "Devon"],
  ["Paignton", "Devon"],
  ["Barnstaple", "Devon"],

  // Cornwall
  ["Truro", "Cornwall"],
  ["Penzance", "Cornwall"],
  ["Falmouth", "Cornwall"],
  ["Newquay", "Cornwall"],

  // Warwickshire
  ["Nuneaton", "Warwickshire"],
  ["Rugby", "Warwickshire"],
  ["Leamington Spa", "Warwickshire"],
  ["Stratford-upon-Avon", "Warwickshire"],

  // Worcestershire
  ["Worcester", "Worcestershire"],
  ["Kidderminster", "Worcestershire"],
  ["Redditch", "Worcestershire"],

  // Herefordshire
  ["Hereford", "Herefordshire"],

  // Cheshire
  ["Chester", "Cheshire"],
  ["Warrington", "Cheshire"],
  ["Crewe", "Cheshire"],
  ["Macclesfield", "Cheshire"],
  ["Widnes", "Cheshire"],
  ["Runcorn", "Cheshire"],

  // North Yorkshire
  ["York", "North Yorkshire"],
  ["Harrogate", "North Yorkshire"],
  ["Scarborough", "North Yorkshire"],
  ["Middlesbrough", "North Yorkshire"],
  ["Redcar", "North Yorkshire"],

  // East Riding of Yorkshire
  ["Hull", "East Riding of Yorkshire"],
  ["Beverley", "East Riding of Yorkshire"],
  ["Bridlington", "East Riding of Yorkshire"],

  // Cumbria
  ["Carlisle", "Cumbria"],
  ["Barrow-in-Furness", "Cumbria"],
  ["Kendal", "Cumbria"],
  ["Whitehaven", "Cumbria"],

  // Scotland
  ["Glasgow", "Scotland"],
  ["Edinburgh", "Scotland"],
  ["Aberdeen", "Scotland"],
  ["Dundee", "Scotland"],
  ["Inverness", "Scotland"],
  ["Stirling", "Scotland"],
  ["Perth", "Scotland"],
  ["Falkirk", "Scotland"],
  ["Livingston", "Scotland"],
  ["East Kilbride", "Scotland"],
  ["Paisley", "Scotland"],
  ["Motherwell", "Scotland"],
  ["Hamilton", "Scotland"],
  ["Kirkcaldy", "Scotland"],
  ["Dunfermline", "Scotland"],
  ["Ayr", "Scotland"],
  ["Kilmarnock", "Scotland"],
  ["Greenock", "Scotland"],
  ["Dumfries", "Scotland"],

  // Wales
  ["Cardiff", "Wales"],
  ["Swansea", "Wales"],
  ["Newport", "Wales"],
  ["Wrexham", "Wales"],
  ["Barry", "Wales"],
  ["Neath", "Wales"],
  ["Bridgend", "Wales"],
  ["Merthyr Tydfil", "Wales"],
  ["Caerphilly", "Wales"],
  ["Llanelli", "Wales"],
  ["Carmarthen", "Wales"],
  ["Aberystwyth", "Wales"],
  ["Bangor", "Wales"],
  ["Rhyl", "Wales"],
  ["Colwyn Bay", "Wales"],

  // Northern Ireland
  ["Belfast", "Northern Ireland"],
  ["Derry", "Northern Ireland"],
  ["Lisburn", "Northern Ireland"],
  ["Newry", "Northern Ireland"],
  ["Armagh", "Northern Ireland"],
  ["Bangor", "Northern Ireland"],
  ["Craigavon", "Northern Ireland"],
  ["Ballymena", "Northern Ireland"],
  ["Newtownabbey", "Northern Ireland"],
];

const REGION_BASELINE = {
  "Greater London": { salary: 42000, col: 100, pop: 500000 },
  "Greater Manchester": { salary: 31000, col: 72, pop: 200000 },
  Merseyside: { salary: 29500, col: 64, pop: 150000 },
  Lancashire: { salary: 28000, col: 60, pop: 120000 },
  "West Yorkshire": { salary: 30000, col: 66, pop: 180000 },
  "South Yorkshire": { salary: 28500, col: 62, pop: 150000 },
  "Tyne and Wear": { salary: 29000, col: 63, pop: 140000 },
  "North East England": { salary: 27500, col: 58, pop: 100000 },
  "West Midlands": { salary: 30000, col: 65, pop: 200000 },
  Staffordshire: { salary: 27000, col: 58, pop: 110000 },
  Shropshire: { salary: 27500, col: 59, pop: 90000 },
  Nottinghamshire: { salary: 28500, col: 61, pop: 120000 },
  Derbyshire: { salary: 28000, col: 60, pop: 100000 },
  Leicestershire: { salary: 28500, col: 61, pop: 130000 },
  Northamptonshire: { salary: 29000, col: 63, pop: 110000 },
  Lincolnshire: { salary: 26500, col: 56, pop: 80000 },
  Norfolk: { salary: 27500, col: 58, pop: 100000 },
  Suffolk: { salary: 28000, col: 59, pop: 90000 },
  Cambridgeshire: { salary: 34000, col: 75, pop: 130000 },
  Essex: { salary: 30000, col: 66, pop: 150000 },
  Hertfordshire: { salary: 35000, col: 78, pop: 120000 },
  Bedfordshire: { salary: 31000, col: 68, pop: 130000 },
  Buckinghamshire: { salary: 33000, col: 74, pop: 140000 },
  Berkshire: { salary: 35000, col: 78, pop: 130000 },
  Oxfordshire: { salary: 36000, col: 80, pop: 120000 },
  Hampshire: { salary: 31000, col: 68, pop: 140000 },
  Surrey: { salary: 37000, col: 82, pop: 110000 },
  Kent: { salary: 30000, col: 65, pop: 120000 },
  "East Sussex": { salary: 30000, col: 66, pop: 100000 },
  "West Sussex": { salary: 31000, col: 68, pop: 100000 },
  Dorset: { salary: 29000, col: 64, pop: 110000 },
  Somerset: { salary: 29000, col: 63, pop: 90000 },
  Bristol: { salary: 33000, col: 76, pop: 450000 },
  Gloucestershire: { salary: 30000, col: 66, pop: 100000 },
  Wiltshire: { salary: 31000, col: 67, pop: 110000 },
  Devon: { salary: 28000, col: 60, pop: 100000 },
  Cornwall: { salary: 27000, col: 58, pop: 70000 },
  Warwickshire: { salary: 30000, col: 65, pop: 100000 },
  Worcestershire: { salary: 28500, col: 61, pop: 90000 },
  Herefordshire: { salary: 27500, col: 59, pop: 60000 },
  Cheshire: { salary: 31000, col: 68, pop: 120000 },
  "North Yorkshire": { salary: 29500, col: 63, pop: 90000 },
  "East Riding of Yorkshire": { salary: 28000, col: 60, pop: 90000 },
  Cumbria: { salary: 27000, col: 57, pop: 70000 },
  Scotland: { salary: 30000, col: 65, pop: 120000 },
  Wales: { salary: 28500, col: 61, pop: 100000 },
  "Northern Ireland": { salary: 28000, col: 60, pop: 100000 },
};

function toSlug(cityName) {
  return (
    "salary-calculator-" +
    cityName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/['']/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

function jitter(base, spread, min = 1000) {
  const delta = Math.floor((Math.random() - 0.5) * spread);
  return Math.max(min, base + delta);
}

// Deduplicate by slug (handles duplicate Scarborough/Middlesbrough entries)
const seen = new Set();
const cities = [];

for (const [cityName, region] of CITIES) {
  const slug = toSlug(cityName);
  if (seen.has(slug)) continue;
  seen.add(slug);

  const baseline = REGION_BASELINE[region] ?? { salary: 28000, col: 60, pop: 80000 };

  cities.push({
    cityName,
    slug,
    region,
    country: "UK",
    metadata: {
      averageSalary: jitter(baseline.salary, 4000, 24000),
      costOfLivingIndex: Math.max(50, Math.min(100, baseline.col + Math.floor((Math.random() - 0.5) * 8))),
      population: jitter(baseline.pop, baseline.pop * 0.4, 30000),
    },
  });
}

const dataset = {
  country: "UK",
  taxYear: "2024/25",
  cities: cities.sort((a, b) => a.cityName.localeCompare(b.cityName)),
};

writeFileSync(OUTPUT, JSON.stringify(dataset, null, 2) + "\n", "utf8");
console.log(`Generated ${cities.length} cities → ${OUTPUT}`);
