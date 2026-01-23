import { PrismaClient, RiasecType } from '@prisma/client';

const prisma = new PrismaClient();

type Destination = { name: string; reason: string };

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
    imageUrl: '/images/types/adventure-seeker.png',
    shareImageUrl: '/images/share/adventure-seeker.png',
    destinations: [
      { name: 'Patagonia, Chile', reason: 'Epic treks and dramatic landscapes' },
      { name: 'New Zealand', reason: 'World-class hiking and adventure sports' },
      { name: 'Banff, Canada', reason: 'Mountain trails and alpine lakes' },
    ],
    tips: [
      'Pack layers and durable gear',
      'Start early to avoid crowds on trails',
      'Book adventure tours with certified guides',
    ],
    trivia: [
      'Patagonia’s W Trek is consistently ranked among the top hikes globally.',
    ],
  },
  {
    riasecType: 'INVESTIGATIVE',
    title: 'The Cultural Explorer',
    description:
      'Curious and analytical, you love destinations rich with history, science, and discovery.',
    imageUrl: '/images/types/cultural-explorer.png',
    shareImageUrl: '/images/share/cultural-explorer.png',
    destinations: [
      { name: 'Kyoto, Japan', reason: 'Temples, tea culture, and history' },
      { name: 'Athens, Greece', reason: 'Classical sites and museums' },
      { name: 'Cairo, Egypt', reason: 'Ancient wonders and archaeology' },
    ],
    tips: [
      'Pre-book museum tickets',
      'Download audio guides',
      'Plan rest days for deep-dive learning',
    ],
    trivia: ['The Acropolis Museum houses over 4,000 artifacts.'],
  },
  {
    riasecType: 'ARTISTIC',
    title: 'The Creative Wanderer',
    description:
      'You seek expressive, unique, and inspirational places—art, design, and creative scenes.',
    imageUrl: '/images/types/creative-wanderer.png',
    shareImageUrl: '/images/share/creative-wanderer.png',
    destinations: [
      { name: 'Barcelona, Spain', reason: 'Gaudí architecture and vibrant art' },
      { name: 'Berlin, Germany', reason: 'Street art and creative hubs' },
      { name: 'Marrakesh, Morocco', reason: 'Colors, crafts, and markets' },
    ],
    tips: [
      'Visit galleries during weekday mornings',
      'Bring a sketchbook or camera',
      'Explore local maker markets',
    ],
    trivia: ['Berlin has over 170 museums and countless galleries.'],
  },
  {
    riasecType: 'SOCIAL',
    title: 'The Connection Traveler',
    description:
      'You enjoy meeting people, group activities, and immersive local experiences.',
    imageUrl: '/images/types/connection-traveler.png',
    shareImageUrl: '/images/share/connection-traveler.png',
    destinations: [
      { name: 'Lisbon, Portugal', reason: 'Friendly vibe and social hostels' },
      { name: 'Chiang Mai, Thailand', reason: 'Community activities and meetups' },
      { name: 'Mexico City, Mexico', reason: 'Food tours and lively neighborhoods' },
    ],
    tips: [
      'Join small group tours',
      'Stay in social accommodations',
      'Learn basic local phrases',
    ],
    trivia: ['Food tours are among the top-rated social travel activities.'],
  },
  {
    riasecType: 'ENTERPRISING',
    title: 'The Luxury Adventurer',
    description:
      'You love premium experiences, unique stays, and curated itineraries with flair.',
    imageUrl: '/images/types/luxury-adventurer.png',
    shareImageUrl: '/images/share/luxury-adventurer.png',
    destinations: [
      { name: 'Dubai, UAE', reason: 'Iconic luxury and unique attractions' },
      { name: 'Santorini, Greece', reason: 'High-end stays with stunning views' },
      { name: 'Maldives', reason: 'Overwater villas and private excursions' },
    ],
    tips: [
      'Book VIP experiences in advance',
      'Use lounge access for smooth travel',
      'Consider shoulder season for better rates',
    ],
    trivia: ['Santorini’s caldera views are among the most photographed on earth.'],
  },
  {
    riasecType: 'CONVENTIONAL',
    title: 'The Planned Traveler',
    description:
      'You appreciate organized trips, efficient schedules, and reliable comforts.',
    imageUrl: '/images/types/planned-traveler.png',
    shareImageUrl: '/images/share/planned-traveler.png',
    destinations: [
      { name: 'Tokyo, Japan', reason: 'Efficient transport and clean city' },
      { name: 'Zurich, Switzerland', reason: 'Orderly, punctual, and well-organized' },
      { name: 'Singapore', reason: 'Safe, structured, and spotless' },
    ],
    tips: [
      'Build buffer time between activities',
      'Save bookings in one itinerary app',
      'Carry copies of essential documents',
    ],
    trivia: ['Tokyo’s rail system averages a delay of under a minute.'],
  },
];

const questions: Array<{
  text: string;
  answers: Array<{ text: string; riasecType: RiasecType }>;
}> = [
  {
    text: 'Your ideal vacation activity would be...',
    answers: [
      { text: 'Hiking a challenging mountain trail', riasecType: 'REALISTIC' },
      { text: 'Visiting museums and historical sites', riasecType: 'INVESTIGATIVE' },
      { text: 'Exploring local art scenes and galleries', riasecType: 'ARTISTIC' },
      { text: 'Joining a group tour to meet new people', riasecType: 'SOCIAL' },
      { text: 'Staying at a luxury resort with VIP experiences', riasecType: 'ENTERPRISING' },
    ],
  },
  {
    text: 'When planning a trip, you prefer to...',
    answers: [
      { text: 'Wing it and see where the day takes you', riasecType: 'ARTISTIC' },
      { text: 'Create a detailed, day-by-day schedule', riasecType: 'CONVENTIONAL' },
      { text: 'Ask friends for recommendations and go together', riasecType: 'SOCIAL' },
      { text: 'Find the best deals on premium experiences', riasecType: 'ENTERPRISING' },
    ],
  },
  {
    text: 'Which destination excites you most?',
    answers: [
      { text: 'A rugged national park', riasecType: 'REALISTIC' },
      { text: 'A historic capital city', riasecType: 'INVESTIGATIVE' },
      { text: 'A colorful artsy town', riasecType: 'ARTISTIC' },
      { text: 'A lively coastal city with group activities', riasecType: 'SOCIAL' },
      { text: 'An exclusive island retreat', riasecType: 'ENTERPRISING' },
    ],
  },
  {
    text: 'In a new city, you first...',
    answers: [
      { text: 'Head to a scenic outdoor spot', riasecType: 'REALISTIC' },
      { text: 'Visit the top-rated museum', riasecType: 'INVESTIGATIVE' },
      { text: 'Find a local gallery or artisan market', riasecType: 'ARTISTIC' },
      { text: 'Join a walking tour to meet people', riasecType: 'SOCIAL' },
    ],
  },
  {
    text: 'Your travel photos are mostly...',
    answers: [
      { text: 'Mountains, trails, and wildlife', riasecType: 'REALISTIC' },
      { text: 'Landmarks with historical context', riasecType: 'INVESTIGATIVE' },
      { text: 'Street art and unique compositions', riasecType: 'ARTISTIC' },
      { text: 'Group selfies and food moments', riasecType: 'SOCIAL' },
    ],
  },
  {
    text: 'Your accommodation choice is...',
    answers: [
      { text: 'A cabin near the trails', riasecType: 'REALISTIC' },
      { text: 'A place near museums and libraries', riasecType: 'INVESTIGATIVE' },
      { text: 'A boutique hotel with creative design', riasecType: 'ARTISTIC' },
      { text: 'A luxury hotel with concierge services', riasecType: 'ENTERPRISING' },
    ],
  },
  {
    text: 'On a free afternoon, you would...',
    answers: [
      { text: 'Rent a bike and explore parks', riasecType: 'REALISTIC' },
      { text: 'Take a guided history tour', riasecType: 'INVESTIGATIVE' },
      { text: 'Attend a local craft workshop', riasecType: 'ARTISTIC' },
      { text: 'Hang out at a social market', riasecType: 'SOCIAL' },
    ],
  },
  {
    text: 'Your packing style is...',
    answers: [
      { text: 'Functional gear and multi-tools', riasecType: 'REALISTIC' },
      { text: 'Books, notes, and research lists', riasecType: 'INVESTIGATIVE' },
      { text: 'Camera and creative supplies', riasecType: 'ARTISTIC' },
      { text: 'Neatly organized packing cubes', riasecType: 'CONVENTIONAL' },
    ],
  },
  {
    text: 'When choosing restaurants, you...',
    answers: [
      { text: 'Pick a place near a scenic walk', riasecType: 'REALISTIC' },
      { text: 'Seek out historic eateries', riasecType: 'INVESTIGATIVE' },
      { text: 'Try photogenic and unique spots', riasecType: 'ARTISTIC' },
      { text: 'Book a spot with social buzz', riasecType: 'SOCIAL' },
      { text: 'Opt for a high-end tasting menu', riasecType: 'ENTERPRISING' },
    ],
  },
  {
    text: 'Your perfect day ends with...',
    answers: [
      { text: 'A sunset hike', riasecType: 'REALISTIC' },
      { text: 'Reflecting on what you learned', riasecType: 'INVESTIGATIVE' },
      { text: 'Sketching or photo editing', riasecType: 'ARTISTIC' },
      { text: 'A group hangout or event', riasecType: 'SOCIAL' },
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
        answers: {
          create: q.answers.map((a) => ({
            text: a.text,
            riasecType: a.riasecType,
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

