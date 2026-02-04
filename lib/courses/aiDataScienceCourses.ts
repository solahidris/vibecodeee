export type AiDataScienceCourse = {
  id: string
  number: number
  title: string
  description: string
}

export const aiDataScienceCourses: AiDataScienceCourse[] = [
  {
    id: 'ai-prompt-engineering',
    number: 25,
    title: 'AI Prompt Engineering',
    description: 'Frameworks for getting 10x better results from LLMs.',
  },
  {
    id: 'ai-chatbots',
    number: 26,
    title: 'Building AI Chatbots',
    description: 'Integrating OpenAI/Gemini APIs into your web apps.',
  },
  {
    id: 'vector-databases',
    number: 27,
    title: 'Vector Databases Basics',
    description: 'Understanding Pinecone/Chroma for AI memory.',
  },
  {
    id: 'langchain-intro',
    number: 28,
    title: 'LangChain Intro',
    description: 'Chaining AI tasks together for complex automation.',
  },
  {
    id: 'ai-agents',
    number: 29,
    title: 'AI Agents 101',
    description: 'Building autonomous bots that can use tools.',
  },
  {
    id: 'ml-intro',
    number: 30,
    title: 'Machine Learning Intro',
    description: 'Understanding the math and logic behind the hype.',
  },
]
