import { PrismaClient, RiasecType } from '@prisma/client';

const prisma = new PrismaClient();

type Destination = { name: string; reason: string; url?: string };

const travelerTypes: Array<{
  riasecType: RiasecType;
  title: string;
  description: string;
  imageUrl: string;
  shareImageUrl: string;
  destinations: Destination[];
  tips: string[];
  trivia: string[];
}> = [
  {
    riasecType: 'REALISTIC',
    title: 'The Adventure Seeker',
    description:
      'You thrive in the outdoors and seek hands-on experiences that challenge and energize you.',
    imageUrl: '/images/types/REALISTIC.png',
    shareImageUrl: '/images/share/adventure-seeker.png',
    destinations: [
      {
        name: "Old Melbourne Ghost Tour",
        reason: "A spooky night walk through Melbourne’s haunted history and hidden laneways",
        url: "https://www.kkday.com/en-au/product/170344",
      },
      {
        name: "Great Ocean Road Skydiving Experience",
        reason: "Tandem skydive with insane coastal views over one of Australia’s most iconic roads",
        url: "https://www.kkday.com/en-au/product/136533",
      },
      {
        name: "Bondi Beach Surf Lesson | Sydney",
        reason: "Learn to surf at Australia’s most famous beach with beginner-friendly coaching",
        url: "https://www.kkday.com/en-au/product/124344-bondi-beach-surf-lesson-sydney",
      },
      {
        name: "Guided Kayak Tour of Manly Cove Beaches | Sydney",
        reason: "Paddle around Manly’s calm coves and beaches for a scenic, active day on the water",
        url: "https://www.kkday.com/en-au/product/146496",
      },
      {
        name: "Melbourne Tandem Skydiving Experience | Victoria",
        reason: "Hit 15,000 ft for a proper adrenaline rush close to Melbourne",
        url: "https://www.kkday.com/en-au/product/121444-skydive-melbourne-15000-ft-tandem-skydive-australia",
      },
      {
        name: "Melbourne City Moonlight Kayak Tour",
        reason: "Night kayaking with city lights — super unique way to see Melbourne after dark",
        url: "https://www.kkday.com/en-au/product/164426",
      },
      {
        name: "Fishing & Beer Tasting Day Tour | Bellarine Peninsula",
        reason: "A fun outdoors day combining fishing vibes with local beer tastings",
        url: "https://www.kkday.com/en-au/product/132700",
      },
      {
        name: "Ocean Adventures Thundercat Boat Tour at Phillip Island | Melbourne",
        reason: "Fast boat thrills + wild ocean scenery around Phillip Island",
        url: "https://www.kkday.com/en-au/product/155229-thundercat-the-ride-melbourne-australia",
      },
      {
        name: "Hunter Valley Hot Air Balloon Experience | Australia",
        reason: "Sunrise balloon flight over vineyards — dreamy views and great for photos",
        url: "https://www.kkday.com/en-au/product/24838-hunter-valley-hot-air-balloon-experience-australia",
      },
      {
        name: "Skydiving Wollongong (With Transfer) from Sydney | NSW",
        reason: "Skydive near Wollongong for epic coastline + easy transfer from Sydney",
        url: "https://www.kkday.com/en-au/product/151061-skydiving-experience-wollongong-sydney-new-south-wales",
      },
    ],
    tips: [
      'Slip, slop, slap — sunscreen, hat, and long sleeves are non‑negotiable in the Aussie sun.',
      'Book skydives, surf lessons, and kayak tours in advance; popular spots fill up in peak season.',
      'Check surf and weather conditions (BOM and local surf cams) before heading to beaches or trails.',
    ],
    trivia: [
      "The Great Ocean Road is one of the world's most scenic coastal drives, stretching 243 km along Victoria.",
      "Australia has over 10,000 beaches — you could visit a new one every day for 27 years.",
      "Uluru is taller than the Eiffel Tower and sacred to the Anangu people.",
    ],
  },
  {
    riasecType: 'INVESTIGATIVE',
    title: 'The Cultural Explorer',
    description:
      'Curious and analytical, you love destinations rich with history, science, and discovery.',
    imageUrl: '/images/types/INVESTIGATIVE.png',
    shareImageUrl: '/images/share/cultural-explorer.png',
    destinations: [
      {
        name: "Tram Museum | Melbourne",
        reason: "A chill, local Melbourne experience to explore vintage trams and transport history",
      },
      {
        name: "Sovereign Hill Entry Ticket + Optional Mine Tour | Melbourne",
        reason: "Step into Australia’s gold-rush era with immersive streets, shops, and an optional mine tour",
        url: "https://www.kkday.com/en-au/product/24068-sovereign-hill-ticket-melbourne",
      },
      {
        name: "90-Minute Dawn Discovery Tour at Wildlife Wonders | Victoria",
        reason: "Early-morning guided wildlife walk for close-up native animal encounters in a peaceful setting",
        url: "https://www.kkday.com/en-au/product/141587-dawn-discovery-tour-wildlife-wonders-victoria-australia",
      },
      {
        name: "Yarra Valley Wine Tour from Melbourne | Victoria",
        reason: "A classic day trip for wine tasting, beautiful vineyards, and relaxing countryside views",
        url: "https://www.kkday.com/en-au/product/129771-yarra-valley-wine-tour-from-melbourne-victoria",
      },
      {
        name: "Sydney Opera House Official Backstage Tour with Breakfast | Australia",
        reason: "Go behind the scenes at the Opera House and start the day with breakfast — iconic and premium",
        url: "https://www.kkday.com/en-au/product/145500-sydney-opera-house-official-backstage-tour-with-breakfast-australia",
      },
      {
        name: "Hunter Valley Wineries Colourful Day Trip | Hunter Valley Departure",
        reason: "Small-group winery day with tastings and a fun, social vibe in Hunter Valley",
        url: "https://www.kkday.com/en-au/product/259557",
      },
      {
        name: "Secrets of Pearling + Farm Cruise + Oyster Tasting | New South Wales",
        reason: "A unique mix of river cruise + pearling/farm insight + fresh oyster tasting (with optional transfer)",
        url: "https://www.kkday.com/en-au/product/250768",
      },
      {
        name: "Broken Bay Pearl Shell to Showroom Tour | New South Wales",
        reason: "Learn how pearls go from shell to finished jewellery — niche, educational, and super different",
        url: "https://www.kkday.com/en-au/product/123804",
      },
      {
        name: "Sydney Opera House Official Architectural Tour (English) | Australia",
        reason: "A 1-hour deep dive into the Opera House design story — perfect if you love architecture",
        url: "https://www.kkday.com/en-au/product/119589-sydney-opera-house-architectural-english-tour-1hour",
      },
    ],
    tips: [
      'Pre-book Aboriginal cultural experiences and museum entry (e.g. NMA, MONA, Australian Museum).',
      'Download apps or guides for national parks and heritage sites before you hit patchy coverage.',
      'Plan rest days — Australia’s distances are huge; factor in travel time between cities and regions.',
    ],
    trivia: [
      'The National Museum of Australia holds over 250,000 objects telling the story of the continent.',
      'Aboriginal culture is the oldest continuous culture on Earth — at least 65,000 years.',
      'MONA in Hobart is one of the world’s most provocative private museums, carved into a cliff.',
    ],
  },
  {
    riasecType: 'ARTISTIC',
    title: 'The Creative Wanderer',
    description:
      'You seek expressive, unique, and inspirational places—art, design, and creative scenes.',
    imageUrl: '/images/types/ARTISTIC.png',
    shareImageUrl: '/images/share/creative-wanderer.png',
    destinations: [
      {
        name: "Fitzroy Market",
        reason: "Weekend browsing for local makers, vintage finds, and a classic Melbourne neighbourhood vibe",
        url: "https://www.fitzroymarket.com/",
      },
      {
        name: "Melbourne Foodies Bucket List Experience | Victoria",
        reason: "A curated foodie experience to try standout bites and discover Melbourne’s food culture",
        url: "https://www.kkday.com/en-au/product/125961-melbourne-foodies-bucket-list-experience-victoria",
      },
      {
        name: "LEGOLAND Discovery Centre Melbourne Ticket | Victoria",
        reason: "Indoor LEGO-themed attraction — fun, interactive, and easy for a light activity day",
        url: "https://www.kkday.com/en-au/product/11880-legoland-discovery-centre-melbourne-australia",
      },
      {
        name: "NGV Winter Masterpieces®️ 2025: French Impressionism Exhibition Ticket | Melbourne",
        reason: "A major NGV exhibition pick if you want a high-quality art day (especially for design inspiration)",
        url: "https://www.kkday.com/en-au/product/286574",
      },
      {
        name: "Paint and Sip Experience at the Sydney Tower Eye | Australia",
        reason: "Do a paint-and-sip session with a skyline view — relaxed, social, and very photo-friendly",
        url: "https://www.kkday.com/en-au/product/126915-paint-and-sip-sydney-tower-eye-experience-australia",
      },
      {
        name: "2025 Great Opera Hits at the Sydney Opera House | Sydney",
        reason: "A highlight show at an iconic venue — great if you want a cultural night out in Sydney",
        url: "https://www.kkday.com/en-au/product/20293",
      },
      {
        name: "Art Gallery of New South Wales & Museum of Contemporary Art Australia – Seasonal Exhibitions | Sydney",
        reason: "A flexible option for rotating exhibitions across two of Sydney’s top art spaces",
        url: "https://www.kkday.com/en-au/product/172939",
      },
    ],
    tips: [
      'Hit Melbourne’s laneway galleries and Sydney’s Art Gallery of NSW on weekday mornings for fewer crowds.',
      'Bring a sketchbook or camera — street art in Melbourne and Sydney is world‑class and ever‑changing.',
      'Explore weekend markets: The Rocks (Sydney), Queen Vic (Melbourne), Salamanca (Hobart) for local crafts and vibes.',
    ],
    trivia: [
      'Melbourne’s laneways host one of the southern hemisphere’s biggest street art scenes.',
      'The Sydney Opera House roof is made of over 1 million tiles and is a UNESCO World Heritage Site.',
      'MONA’s owner also runs Dark Mofo — Tasmania’s winter arts and music festival that draws crowds from across the country.',
    ],
  },
  {
    riasecType: 'SOCIAL',
    title: 'The Connection Traveler',
    description:
      'You enjoy meeting people, group activities, and immersive local experiences.',
    imageUrl: '/images/types/SOCIAL.png',
    shareImageUrl: '/images/share/connection-traveler.png',
    destinations: [
      {
        name: "MONOPOLY DREAMS Melbourne Ticket | Australia",
        reason: "A playful, interactive attraction for quick fun photos and light entertainment in the city",
        url: "https://www.kkday.com/en-au/product/154807-monopoly-dreams-melbourne-ticket-australia",
      },
      {
        name: "Luna Park Melbourne Unlimited Ride Tickets | Victoria",
        reason: "Classic Melbourne amusement park vibes — unlimited rides for a full-on fun day",
        url: "https://www.kkday.com/en-au/product/170333",
      },
      {
        name: "Phillip Island Penguin Parade & Moonlit Sanctuary Wildlife Park Day Tour | Melbourne",
        reason: "One-day wildlife bucket list: penguin parade + sanctuary visit, super iconic for visitors",
        url: "https://www.kkday.com/en-au/product/138064-philip-island-penguin-parade-moonlit-sanctuary-wildlife-park-day-tour-melbourne",
      },
      {
        name: "Stefano Marvello Italian Cooking Class with Dining | Australia",
        reason: "Hands-on cooking class + sit-down meal — a cozy, social experience in Sydney",
        url: "https://www.kkday.com/en-au/product/133025-stefano-marvello-italian-cooking-class-with-dining-australia",
      },
      {
        name: 'Sydney Walking Tour with a Local Guide',
        reason: "Explore Sydney like a local with hidden spots, stories, and a flexible walking pace",
        url: "https://www.kkday.com/en-au/product/279510",
      },
      {
        name: "CERES Community Environment Park (Brunswick East)",
        reason: "A wholesome Melbourne spot for sustainability, gardens, workshops, and community culture",
        url: "https://school.ceres.org.au/adultlearning/",
      },
      {
        name: "Irukandji Shark & Ray Encounters Admission Ticket | New South Wales",
        reason: "Get up close with sharks and rays in a guided encounter — memorable and a bit thrilling",
        url: "https://www.kkday.com/en-au/product/132244-irukandji-shark-and-ray-encounters-ticket-new-south-wales-australia",
      },
    ],
    tips: [
      'Join small-group food, walking, or day tours in Sydney, Melbourne, or regional towns to meet others.',
      'Stay in social hostels or boutique B&Bs where hosts share local tips and often organise get-togethers.',
      'Learn a few Aussie phrases and say g’day — locals love a chat and will often point you to hidden spots.',
    ],
    trivia: [
      'Australians are among the world’s most outgoing travellers — and just as welcoming at home.',
      'Food and wine tours in the Barossa, Hunter Valley, and Margaret River are top-rated for meeting people.',
      'Sydney’s Bondi to Coogee walk is as much a social experience as a scenic one — everyone says hi.',
    ],
  },
  {
    riasecType: 'ENTERPRISING',
    title: 'The Opportunistic Adventurer',
    description:
      'You love premium experiences, unique stays, and curated itineraries with flair.',
    imageUrl: '/images/results/ENTERPRISING.png',
    shareImageUrl: '/images/share/luxury-adventurer.png',
    destinations: [
      {
        name: "2-Hour Surfing Lesson at Torquay | Melbourne",
        reason: "Learn to surf near Melbourne on a famous surf coast — great intro session with ocean vibes",
        url: "https://www.kkday.com/en-au/product/124239-2-hour-surfing-lesson-at-torquay-melbourne-australia",
      },
      {
        name: "Fishing & Beer Tasting Day Tour on the Bellarine Peninsula | Australia",
        reason: "A fun outdoors day combining hands-on fishing with relaxed local beer tasting",
        url: "https://www.kkday.com/en-au/product/132700",
      },
      {
        name: "Wilsons Promontory Wilderness Tour | Melbourne",
        reason: "Big nature day: rugged coastline, scenic hikes, and one of Victoria’s most iconic national parks",
        url: "https://www.kkday.com/en-au/product/250384-wilsons-promontory-wilderness-tour-melbourne",
      },
      {
        name: "Marrickville Munch – Sydney Food Tour | Australia",
        reason: "Small-group food crawl through Marrickville — awesome if you like local flavours and hidden gems",
        url: "https://www.kkday.com/en-au/product/270349",
      },
      {
        name: "Vertical Tasting of Pokolbin Dry Red Shiraz (6 Vintages) + Cheese & Charcuterie Board",
        reason: "A premium wine tasting experience in the Hunter region — compare vintages with a proper pairing board",
        url: "https://www.kkday.com/en-au/product/141282-vertical-tasting-of-pokolbin-dry-red-shiraz-at-tulloch-wines-new-south-wales-australia",
      },
      {
        name: "Melbourne Connect",
        reason: "A hub for events, innovation, and community updates — handy for finding what’s on in Melbourne",
        url: "https://www.instagram.com/melbconnect/",
      },
    ],
    tips: [
      'Book luxury lodges (Qualia, Southern Ocean Lodge, Lizard Island) and VIP experiences well in advance.',
      'Use airport lounges and premium transfers to make long domestic flights feel seamless.',
      'Shoulder season (Apr–May, Sep–Oct) often has better rates and fewer crowds at top spots.',
    ],
    trivia: [
      "Qualia on Hamilton Island is regularly named among the world's best luxury resorts.",
      "Australia has some of the most exclusive wilderness lodges, from the Kimberley to Tasmania.",
      "Wine regions like Barossa and Margaret River offer world-class cellar doors and fine dining.",
    ],
  },
  {
    riasecType: 'CONVENTIONAL',
    title: 'The Planned Traveler',
    description:
      'You appreciate organized trips, efficient schedules, and reliable comforts.',
    imageUrl: '/images/types/CONVENTIONAL.png',
    shareImageUrl: '/images/share/planned-traveler.png',
    destinations: [
      {
        name: "Great Ocean Road, Penguin Parade & Free City 3-Day Tour from Melbourne | Victoria",
        reason: "A bundled 3-day plan that covers top Melbourne highlights plus Great Ocean Road and the Penguin Parade",
        url: "https://www.kkday.com/en-au/product/268898",
      },
      {
        name: "3D2N Great Ocean Road to Grampians Tour in Victoria | Australia",
        reason: "Multi-day adventure combining coastal icons (GOR) with Grampians landscapes and hikes",
        url: "https://www.kkday.com/en-au/product/137179-3d2n-great-ocean-road-to-grampians-tour-in-victoria-australia",
      },
      {
        name: "Melbourne Great Ocean Road 2-Day, 1-Night Tour (Chinese) | Little Red Riding Hood Lighthouse + Apollo Bay + Twelve Apostles",
        reason: "A 2D1N itinerary packed with Great Ocean Road landmarks, ideal if you want a guided Chinese-language tour",
        url: "https://www.kkday.com/en-au/product/160479",
      },
      {
        name: "Melbourne 4-Day Fun Tour | Australia",
        reason: "A convenient multi-day itinerary for seeing Melbourne’s must-dos without planning everything yourself",
        url: "https://www.kkday.com/en-au/product/251904",
      },
      {
        name: "Melbourne Goldfields and City Day Tour | Gold Rush Town + Melbourne City + Eureka Skydeck",
        reason: "A day tour mixing gold-rush history with city highlights, finishing with panoramic views from Eureka",
        url: "https://www.kkday.com/en-au/product/137694",
      },
      {
        name: "Essential Melbourne Walking Tour",
        reason: "A solid intro walk to understand the city’s layout, laneways, stories, and key landmarks",
        url: "https://www.kkday.com/en-au/product/250449",
      },
      {
        name: "Hunter Valley + Broken Bay Australian White Pearl Tour (3D2N) | Hot Air Balloon + Sydney Tower + Pearl Experience",
        reason: "A 3-day packaged trip combining wine region vibes with a pearl-focused Broken Bay experience",
        url: "https://www.kkday.com/en-au/product/247049",
      },
      {
        name: "One-day Tour to Hunter Valley (Sydney) | 3 Wineries + Tasting + Lunch (Chinese Service)",
        reason: "Easy Hunter Valley day trip with guaranteed winery stops, tastings, and lunch included",
        url: "https://www.kkday.com/en-au/product/200353",
      },
    ],
    tips: [
      'Build buffer time — domestic flights and long drives (e.g. Sydney–Melbourne) eat into the day.',
      'Keep all bookings in one itinerary app; add confirmation numbers and contact details for tours and accommodation.',
      'Carry printed or digital copies of ID, bookings, and travel insurance; mobile coverage can drop in regional areas.',
    ],
    trivia: [
      "Sydney's Opal and Melbourne's myki make public transport straightforward and predictable in the cities.",
      "Australian long-distance trains (e.g. Indian Pacific, Ghan) run to a fixed schedule — plan around them.",
      "Driving on the left is the rule; speed limits are strictly enforced, especially in regional and outback areas.",
    ],
  },
];

const questions: Array<{
  text: string;
  backgroundImage: string;
  answers: Array<{ text: string; riasecType: RiasecType; imageUrl?: string }>;
}> = [
  {
    text: 'In the first day of your trip, a wombat sneaks into camp and steals your snack. What’s your reaction?',
    backgroundImage: '/images/backgrounds/question1-bg.png',
    answers: [
      { text: 'Observe its eating habits', riasecType: 'INVESTIGATIVE' },
      { text: 'Check what food is left', riasecType: 'CONVENTIONAL' },
      { text: 'Chase it to get back', riasecType: 'REALISTIC' },
      { text: 'Plan how to guard food', riasecType: 'ENTERPRISING' },
      { text: 'Write a funny poem', riasecType: 'ARTISTIC' },
    ],
  },
  {
    text: 'At night by the campfire, sparks suddenly fly up into the dark sky. What do you do?',
    backgroundImage: '/images/backgrounds/question2-bg.webp',
    answers: [
      { text: 'Add more wood neatly', riasecType: 'CONVENTIONAL' },
      { text: 'Point it out to friends', riasecType: 'SOCIAL' },
      { text: 'Make a quick wish', riasecType: 'ENTERPRISING' },
      { text: 'Imagine it’s fireworks', riasecType: 'ARTISTIC' },
    ],
  },
  {
    text: 'After a long climb, you reach a mountain peak. What matters most to you in that moment?',
    backgroundImage: '/images/backgrounds/question3-bg.webp',
    answers: [
      { text: 'Enjoy the breathtaking view', riasecType: 'ARTISTIC' },
      { text: 'Celebrate as the leader', riasecType: 'ENTERPRISING' },
      { text: 'Share joy with friends', riasecType: 'SOCIAL' },
      { text: 'Feel the achievement', riasecType: 'REALISTIC' },
    ],
  },
  {
    text: 'A strong wind blows your hat straight into a muddy pond. What do you do?',
    backgroundImage: '/images/backgrounds/question4-bg.webp',
    answers: [
      { text: 'Ask friends for help', riasecType: 'SOCIAL' },
      { text: 'Study the water currents', riasecType: 'INVESTIGATIVE' },
      { text: 'Imagine a comedy scene', riasecType: 'ARTISTIC' },
      { text: 'Jump in to rescue', riasecType: 'REALISTIC' },
    ],
  },
  {
    text: 'Deep in the rainforest, you hear an unfamiliar sound echoing around you on a rainy day. What’s your reaction?',
    backgroundImage: '/images/backgrounds/question5-bg.webp',
    answers: [
      { text: 'Mark the location down', riasecType: 'CONVENTIONAL' },
      { text: 'Imagine it as music', riasecType: 'ARTISTIC' },
      { text: 'Lead the group closer', riasecType: 'ENTERPRISING' },
      { text: 'Track it down quickly', riasecType: 'REALISTIC' },
      { text: 'Analyse the sound carefully', riasecType: 'INVESTIGATIVE' },
    ],
  },
  {
    text: 'A rainbow appears after the rain during your trip. What\'s your first reaction?',
    backgroundImage: '/images/backgrounds/question6-bg.webp',
    answers: [
      { text: 'Think about light and water ', riasecType: 'INVESTIGATIVE', imageUrl: '/images/answers/q6-1.webp' },
      { text: 'Call others to take a group photo', riasecType: 'SOCIAL', imageUrl: '/images/answers/q6-2.webp' },
      { text: 'Capture it in artn', riasecType: 'ARTISTIC', imageUrl: '/images/answers/q6-3.webp' },
      { text: 'Treat it as lucky', riasecType: 'ENTERPRISING', imageUrl: '/images/answers/q6-4.webp' },
    ],
  },
  {
    text: 'As the journey winds down, you find yourself under a clear sky full of stars. What do you do?',
    backgroundImage: '/images/backgrounds/question7-bg.webp',
    answers: [
      { text: 'Note constellations for memory ', riasecType: 'CONVENTIONAL' },
      { text: 'Announce dreams for the future ', riasecType: 'ENTERPRISING' },
      { text: 'Observe the night patterns ', riasecType: 'INVESTIGATIVE' },
      { text: 'Lie back and enjoy', riasecType: 'REALISTIC' },
    ],
  },
  {
    text: 'At the end of your trip, what makes you feel most fulfilled?',
    backgroundImage: '/images/backgrounds/question8-bg.webp',
    answers: [
      { text: 'Strong connections', riasecType: 'SOCIAL' },
      { text: 'Plans completed', riasecType: 'CONVENTIONAL' },
      { text: 'Knowledge gained ', riasecType: 'INVESTIGATIVE' },
      { text: 'Challenges completed', riasecType: 'REALISTIC' },
    ],
  },
  {
    text: 'If you could sum up your whole adventure in one word, what would it be?',
    backgroundImage: '/images/backgrounds/question9-bg.webp',
    answers: [
      { text: 'Friendship', riasecType: 'REALISTIC' },
      { text: 'Inspiration', riasecType: 'ARTISTIC' },
      { text: 'Completion', riasecType: 'CONVENTIONAL' },
      { text: 'Discovery', riasecType: 'INVESTIGATIVE' },
      { text: 'Victory', riasecType: 'ENTERPRISING' },
    ],
  },
  {
    text: 'What souvenir would you bring back from this trip?',
    backgroundImage: '/images/backgrounds/question6-bg.webp',
    answers: [
      { text: 'A group photo', riasecType: 'SOCIAL', imageUrl: '/images/answers/q10-1.webp' },
      { text: 'A creative keepsake', riasecType: 'ARTISTIC', imageUrl: '/images/answers/q10-2.webp' },
      { text: 'A neat journal', riasecType: 'CONVENTIONAL', imageUrl: '/images/answers/q10-3.webp' },
      { text: 'A rock or feather', riasecType: 'REALISTIC', imageUrl: '/images/answers/q10-4.webp' },
    ],
  },
];

async function main() {
  // Clean existing data
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.travelerType.deleteMany();

  // Seed traveler types
  for (const t of travelerTypes) {
    await prisma.travelerType.create({
      data: {
        riasecType: t.riasecType,
        title: t.title,
        description: t.description,
        imageUrl: t.imageUrl,
        shareImageUrl: t.shareImageUrl,
        destinations: JSON.stringify(t.destinations),
        tips: JSON.stringify(t.tips),
        trivia: JSON.stringify(t.trivia),
      },
    });
  }

  // Seed questions with answers
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    await prisma.question.create({
      data: {
        text: q.text,
        order: i + 1,
        backgroundImage: q.backgroundImage || '',
        answers: {
          create: q.answers.map((a) => ({
            text: a.text,
            riasecType: a.riasecType,
            imageUrl: a.imageUrl || null,
          })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed completed.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

