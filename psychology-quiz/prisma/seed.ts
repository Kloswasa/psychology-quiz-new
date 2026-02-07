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
  backgroundImage: string;
  answers: Array<{ text: string; riasecType: RiasecType; imageUrl?: string }>;
}> = [
  {
    text: 'In the first day of your trip, a wombat sneaks into camp and steals your snack. What’s your reaction?',
    backgroundImage: '',
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
    backgroundImage: '',
    answers: [
      { text: 'Add more wood neatly', riasecType: 'CONVENTIONAL' },
      { text: 'Point it out to friends', riasecType: 'SOCIAL' },
      { text: 'Make a quick wish', riasecType: 'ENTERPRISING' },
      { text: 'Imagine it’s fireworks', riasecType: 'ARTISTIC' },
    ],
  },
  {
    text: 'After a long climb, you reach a mountain peak. What matters most to you in that moment?',
    backgroundImage: '',
    answers: [
      { text: 'Enjoy the breathtaking view', riasecType: 'ARTISTIC' },
      { text: 'Celebrate as the leader', riasecType: 'ENTERPRISING' },
      { text: 'Share joy with friends', riasecType: 'SOCIAL' },
      { text: 'Feel the achievement', riasecType: 'REALISTIC' },
    ],
  },
  {
    text: 'A strong wind blows your hat straight into a muddy pond. What do you do?',
    backgroundImage: '',
    answers: [
      { text: 'Ask friends for help', riasecType: 'SOCIAL' },
      { text: 'Study the water currents', riasecType: 'INVESTIGATIVE' },
      { text: 'Imagine a comedy scene', riasecType: 'ARTISTIC' },
      { text: 'Jump in to rescue', riasecType: 'REALISTIC' },
    ],
  },
  {
    text: 'Deep in the rainforest, you hear an unfamiliar sound echoing around you on a rainy day. What’s your reaction?',
    backgroundImage: '',
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
    backgroundImage: '',
    answers: [
      { text: 'Think about light and water ', riasecType: 'INVESTIGATIVE' },
      { text: 'Call others to take a group photo', riasecType: 'SOCIAL' },
      { text: 'Capture it in artn', riasecType: 'ARTISTIC' },
      { text: 'Treat it as lucky', riasecType: 'ENTERPRISING' },
    ],
  },
  {
    text: 'As the journey winds down, you find yourself under a clear sky full of stars. What do you do?',
    backgroundImage: '/images/backgrounds/Q7.webp',
    answers: [
      { text: 'Note constellations for memory ', riasecType: 'CONVENTIONAL' },
      { text: 'Announce dreams for the future ', riasecType: 'ENTERPRISING' },
      { text: 'Observe the night patterns ', riasecType: 'INVESTIGATIVE' },
      { text: 'Lie back and enjoy', riasecType: 'REALISTIC' },
    ],
  },
  {
    text: 'At the end of your trip, what makes you feel most fulfilled?',
    backgroundImage: '',
    answers: [
      { text: 'Strong connections', riasecType: 'SOCIAL' },
      { text: 'Plans completed', riasecType: 'CONVENTIONAL' },
      { text: 'Knowledge gained ', riasecType: 'INVESTIGATIVE' },
      { text: 'Challenges completed', riasecType: 'REALISTIC' },
    ],
  },
  {
    text: 'If you could sum up your whole adventure in one word, what would it be?',
    backgroundImage: '',
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
    backgroundImage: '',
    answers: [
      { text: 'A group photo', riasecType: 'SOCIAL' },
      { text: 'A creative keepsake', riasecType: 'ARTISTIC' },
      { text: 'A neat journal', riasecType: 'CONVENTIONAL' },
      { text: 'A rock or feather', riasecType: 'REALISTIC' },
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

