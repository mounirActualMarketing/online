import { PrismaClient, ActivityType } from '@prisma/client'

const prisma = new PrismaClient()

interface ActivityData {
  title: string;
  type: string;
  order: number;
  content: string;
  isRequired: boolean;
  description?: string;
}

const assessmentSections = [
  {
    title: "50 Essential Phrases",
    description: "Build a foundation of everyday survival English",
    order: 1,
    content: `Goal: Build a foundation of everyday "survival" English.

Phrases to Practice:
1. How are you doing?
2. Could you repeat that, please?
3. What do you mean by that?
4. Can you help me with this?
5. I really appreciate it.
6. Sorry, I didn't catch that.
7. That sounds great!
8. I totally agree with you.
9. Can I ask you a question?
10. I'll get back to you on that.

And 40 more essential phrases for daily communication...`,
    activities: [
      {
        title: "Practice Essential Phrases",
        type: "PRACTICE",
        order: 1,
        content: "Practice the first 10 essential phrases. Listen, repeat, and record yourself saying each phrase.",
        isRequired: true
      },
      {
        title: "Sentence Writing",
        type: "WRITING",
        order: 2,
        content: "Write 3 sentences using new phrases you practiced today.",
        isRequired: true
      }
    ]
  },
  {
    title: "Fluency Roadmap",
    description: "Provide a structured path to fluency",
    order: 2,
    content: `Goal: Provide a structured path to fluency.

Steps:
1. Build your foundation – essential phrases and vocabulary
2. Practice daily conversations with friends or teachers
3. Listen actively to podcasts, news, and native speakers
4. Record yourself speaking and compare with natives
5. Expand vocabulary through books, articles, and news
6. Engage in lessons or language exchanges
7. Focus on grammar and sentence structure
8. Join group discussions and debates
9. Use English in real-life situations (shopping, dining, travel)
10. Review monthly and set new goals`,
    activities: [
      {
        title: "Self-Assessment",
        type: "REFLECTION",
        order: 1,
        content: "Which step are you on now? Reflect on your current English learning stage.",
        isRequired: true
      }
    ]
  },
  {
    title: "Practice Activities",
    description: "Build fluency through structured practice",
    order: 3,
    content: `Goal: Build fluency through structured practice.

Activities:
1. Role-play Dialogues - Practice real-life conversations
2. Two-Minute Talk - Choose a topic and speak for 2 minutes
3. Daily Journal + Speaking - Write and read aloud
4. Phrase Swap Game - Respond with different phrases`,
    activities: [
      {
        title: "Role-play Exercise",
        type: "SPEAKING",
        order: 1,
        content: "Practice a restaurant conversation. Record yourself playing both customer and waiter roles.",
        isRequired: true
      },
      {
        title: "Two-Minute Talk",
        type: "SPEAKING",
        order: 2,
        content: "Choose a topic and speak for 2 minutes without stopping. Record your speech.",
        isRequired: true
      },
      {
        title: "Reflection Log",
        type: "REFLECTION",
        order: 3,
        content: "Write about: Activity I did today, New phrase I learned",
        isRequired: true
      }
    ]
  },
  {
    title: "Self-Assessment",
    description: "Measure progress regularly",
    order: 4,
    content: `Goal: Measure progress regularly.

Monthly Rating (1–5):
- Confidence in speaking
- Vocabulary range
- Grammar accuracy
- Listening skills

Level Guide:
- Level 1 → Yes/No answers only
- Level 3 → Short conversations
- Level 5 → Express ideas clearly`,
    activities: [
      {
        title: "Monthly Self-Rating",
        type: "REFLECTION",
        order: 1,
        content: "Rate yourself (1-5) on: Confidence in speaking, Vocabulary range, Grammar accuracy, Listening skills",
        isRequired: true
      },
      {
        title: "SMART Goals Setting",
        type: "REFLECTION",
        order: 2,
        content: "Set a SMART goal for your English learning (Specific, Measurable, Achievable, Relevant, Time-bound)",
        isRequired: true
      }
    ]
  },
  {
    title: "Listening Skills",
    description: "Improve comprehension and pronunciation",
    order: 5,
    content: `Goal: Improve comprehension and pronunciation.

Activities:
1. Active Listening - Watch video, write keywords, summarize
2. Shadowing - Listen and repeat at same speed
3. Dictation - Write exactly what you hear`,
    activities: [
      {
        title: "Active Listening Exercise",
        type: "LISTENING",
        order: 1,
        content: "Watch a 3-5 minute English video. Write 5 keywords and provide a summary.",
        isRequired: true
      },
      {
        title: "Dictation Practice",
        type: "LISTENING",
        order: 2,
        content: "Listen to an audio clip and write exactly what you hear.",
        isRequired: true
      },
      {
        title: "Listening Worksheet",
        type: "REFLECTION",
        order: 3,
        content: "Complete: Topic, Keywords, Main Idea, New Vocabulary",
        isRequired: true
      }
    ]
  },
  {
    title: "Speaking Practice",
    description: "Build fluency through speaking often",
    order: 6,
    content: `Goal: Build fluency through speaking often.

Activities:
1. Recording Journal - Speak for 2 min, listen back, correct mistakes
2. Tongue Twisters - Practice difficult sounds
3. Debate - Prepare arguments on both sides of a topic`,
    activities: [
      {
        title: "Recording Journal",
        type: "SPEAKING",
        order: 1,
        content: "Record yourself speaking for 2 minutes about your day. Listen back and note areas for improvement.",
        isRequired: true
      },
      {
        title: "Tongue Twisters",
        type: "SPEAKING",
        order: 2,
        content: "Practice these tongue twisters: 'She sells seashells', 'Red lorry, yellow lorry'",
        isRequired: true
      },
      {
        title: "Speaking Reflection",
        type: "REFLECTION",
        order: 3,
        content: "Reflect on: My biggest speaking challenge, One improvement I noticed",
        isRequired: true
      }
    ]
  },
  {
    title: "Reading Strategies",
    description: "Improve comprehension and vocabulary",
    order: 7,
    content: `Goal: Improve comprehension and vocabulary.

Tasks:
1. Skim → find main idea
2. Scan → look for details  
3. Deep Read → highlight new words, use dictionary`,
    activities: [
      {
        title: "Reading Comprehension",
        type: "READING",
        order: 1,
        content: "Read a short article. Practice skimming for main idea, scanning for details, and deep reading for vocabulary.",
        isRequired: true
      },
      {
        title: "Reading Log",
        type: "REFLECTION",
        order: 2,
        content: "Complete: Title, Main Idea, New Words, 3-Sentence Summary",
        isRequired: true
      },
      {
        title: "Comprehension Questions",
        type: "READING",
        order: 3,
        content: "Answer: Who/what is it about? What happened first, next, last? What is the writer's opinion?",
        isRequired: true
      }
    ]
  },
  {
    title: "Writing Practice",
    description: "Write in different styles",
    order: 8,
    content: `Goal: Write in different styles.

Tasks:
1. Formal Email - Business communication
2. Informal Message - Casual conversation
3. Creative Story - Narrative writing`,
    activities: [
      {
        title: "Formal Email Writing",
        type: "WRITING",
        order: 1,
        content: "Write a formal email requesting a meeting. Use proper business format and polite language.",
        isRequired: true
      },
      {
        title: "Informal Message",
        type: "WRITING",
        order: 2,
        content: "Write an informal message to a friend about weekend plans.",
        isRequired: true
      },
      {
        title: "Creative Story",
        type: "WRITING",
        order: 3,
        content: "Write a creative story starting with: 'Suddenly, the lights went out...'",
        isRequired: true
      },
      {
        title: "Writing Checklist",
        type: "REFLECTION",
        order: 4,
        content: "Check: Correct tense used? Linking words (because, however)? Spelling checked?",
        isRequired: true
      }
    ]
  },
  {
    title: "Grammar & Vocabulary",
    description: "Improve accuracy and expand vocabulary",
    order: 9,
    content: `Goal: Improve accuracy and expand vocabulary.

Grammar Drills:
- Tense practice
- Sentence transformation
- Error correction

Vocabulary Expansion:
- Collocations
- Synonyms
- Word families`,
    activities: [
      {
        title: "Grammar Drills",
        type: "GRAMMAR",
        order: 1,
        content: "Complete these sentences: Yesterday, I ___ (go) to the park. I ___ (study) English for 2 years.",
        isRequired: true
      },
      {
        title: "Vocabulary Expansion",
        type: "VOCABULARY",
        order: 2,
        content: "Learn these collocations: Make a decision, Do homework, Take a risk, Keep a promise",
        isRequired: true
      },
      {
        title: "Vocabulary Bank",
        type: "VOCABULARY",
        order: 3,
        content: "Create a vocabulary bank with: Word, Meaning, Example, Synonym for 5 new words",
        isRequired: true
      }
    ]
  },
  {
    title: "Motivation & Goal Setting",
    description: "Stay consistent and motivated",
    order: 10,
    content: `Goal: Stay consistent and motivated.

Weekly Planning:
- Set weekly goals
- Plan rewards
- Track progress
- Reflect on achievements`,
    activities: [
      {
        title: "Weekly Goal Setting",
        type: "REFLECTION",
        order: 1,
        content: "Set your goal for this week and choose a reward when you succeed.",
        isRequired: true
      },
      {
        title: "Progress Review",
        type: "REFLECTION",
        order: 2,
        content: "Review your progress: What went well? What should I improve?",
        isRequired: true
      },
      {
        title: "Final Reflection",
        type: "REFLECTION",
        order: 3,
        content: "Complete the full assessment reflection: What did you learn? What are your next steps?",
        isRequired: true
      }
    ]
  }
]

async function main() {
  console.log('Seeding assessment sections...')
  
  for (const sectionData of assessmentSections) {
    const { activities, ...section } = sectionData
    
    const createdSection = await prisma.assessmentSection.upsert({
      where: { order: section.order },
      update: section,
      create: section,
    })
    
    console.log(`Created section: ${createdSection.title}`)
    
    // Create activities for this section
    for (const activityData of activities) {
      const activity = activityData as ActivityData;
      await prisma.activity.upsert({
        where: { 
          sectionId_order: {
            sectionId: createdSection.id,
            order: activity.order
          }
        },
        update: {
          title: activity.title,
          description: activity.description || null,
          type: activity.type as ActivityType,
          content: activity.content,
          order: activity.order,
          isRequired: activity.isRequired,
          sectionId: createdSection.id,
        },
        create: {
          title: activity.title,
          description: activity.description || null,
          type: activity.type as ActivityType,
          content: activity.content,
          order: activity.order,
          isRequired: activity.isRequired,
          sectionId: createdSection.id,
        },
      })
    }
    
    console.log(`Created ${activities.length} activities for ${createdSection.title}`)
  }
  
  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
