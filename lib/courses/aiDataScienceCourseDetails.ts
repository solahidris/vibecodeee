import type { CourseDetail, CourseExercise } from '@/lib/courses/types'

export type { CourseExercise }

export type AiDataScienceCourseDetail = CourseDetail

export const aiDataScienceCourseDetails: Record<
  string,
  AiDataScienceCourseDetail
> = {
  'ai-prompt-engineering': {
    id: 'ai-prompt-engineering',
    title: 'AI Prompt Engineering',
    description: 'Frameworks for getting 10x better results from LLMs.',
    overview:
      'Build prompts that are repeatable, specific, and easy to evaluate. You will practice prompt scaffolds, context framing, few-shot examples, and self-checks.',
    outcomes: [
      'Structure prompts with clear roles, goals, and constraints.',
      'Provide context and examples that improve response quality.',
      'Add evaluation checks to keep outputs on-spec.',
    ],
    exercises: [
      {
        id: 'prompt-scaffold',
        title: 'Draft a Prompt Scaffold',
        instruction:
          'Write a prompt skeleton with Role, Goal, Constraints, and Output Format labels.',
        details: [
          'Use the exact labels and put each on its own line.',
          'Fill in a short value after each label.',
        ],
        placeholder:
          'Role: You are a senior product analyst.\nGoal: Summarize the key insights from the input.\nConstraints: 5 bullet points max.\nOutput Format: Markdown list.',
        expected: {
          all: [
            '\\bRole\\s*:',
            '\\bGoal\\s*:',
            '\\bConstraints\\s*:',
            '\\bOutput\\s*Format\\s*:',
          ],
        },
        checkFor: ['Role:', 'Goal:', 'Constraints:', 'Output Format:'],
        success: 'Nice. That scaffold will keep outputs consistent.',
        failure:
          'Include Role, Goal, Constraints, and Output Format labels.',
      },
      {
        id: 'prompt-context-input',
        title: 'Add Context and Input',
        instruction:
          'Add Context and Input sections to the prompt using the exact labels.',
        details: [
          'Use the labels `Context:` and `Input:` on separate lines.',
          'Add a short example value for each.',
        ],
        placeholder:
          'Context: You are summarizing a weekly sales report.\nInput: {{report_text}}',
        expected: {
          all: ['\\bContext\\s*:', '\\bInput\\s*:'],
        },
        checkFor: ['Context:', 'Input:'],
        success: 'Great. Context plus input makes prompts far clearer.',
        failure: 'Add both Context: and Input: sections.',
      },
      {
        id: 'prompt-few-shot',
        title: 'Add a Few-Shot Example',
        instruction:
          'Include one example that shows an Input and Output pair.',
        details: [
          'Use the label `Example:` above the pair.',
          'Include both `Input:` and `Output:` lines.',
        ],
        placeholder:
          'Example:\nInput: Monthly sales increased 12%.\nOutput: Sales grew 12% month over month, led by SMB upgrades.',
        expected: {
          all: ['\\bExample\\s*:', '\\bInput\\s*:', '\\bOutput\\s*:'],
        },
        checkFor: ['Example:', 'Input:', 'Output:'],
        success: 'Nice. Few-shot examples guide the model clearly.',
        failure: 'Include Example:, Input:, and Output: labels.',
      },
      {
        id: 'prompt-checklist',
        title: 'Add a Checklist',
        instruction:
          'Add a Checklist section with criteria for Accuracy, Constraints, and Format.',
        details: [
          'Start with the label `Checklist:`.',
          'Include those three criteria in bullet form.',
        ],
        placeholder:
          'Checklist:\n- Accuracy: Facts match the input.\n- Constraints: 5 bullets max.\n- Format: Markdown list.',
        expected: {
          all: [
            '\\bChecklist\\s*:',
            '\\bAccuracy\\b',
            '\\bConstraints\\b',
            '\\bFormat\\b',
          ],
        },
        checkFor: ['Checklist:', 'Accuracy', 'Constraints', 'Format'],
        success: 'Great. That checklist makes evaluation easy.',
        failure:
          'Include Checklist: plus Accuracy, Constraints, and Format criteria.',
      },
    ],
  },
  'ai-chatbots': {
    id: 'ai-chatbots',
    title: 'Building AI Chatbots',
    description: 'Integrating OpenAI/Gemini APIs into your web apps.',
    overview:
      'Design chat experiences that are reliable in production. You will practice message payloads, role setup, safety rules, and fallback responses.',
    outcomes: [
      'Structure chat requests with the right fields.',
      'Write clear system and user messages.',
      'Add guardrails and fallbacks for safer replies.',
    ],
    exercises: [
      {
        id: 'chatbot-payload',
        title: 'Create a Chat Request Payload',
        instruction:
          'Write a minimal JSON request that includes model, messages, and temperature.',
        details: [
          'Use JSON-like syntax.',
          'Include all three fields.',
        ],
        placeholder:
          '{\n  "model": "gpt-4.1-mini",\n  "messages": [],\n  "temperature": 0.2\n}',
        expected: {
          all: ['\\bmodel\\b', '\\bmessages\\b', '\\btemperature\\b'],
        },
        checkFor: ['model', 'messages', 'temperature'],
        success: 'Great. That is a solid minimal payload.',
        failure: 'Include model, messages, and temperature fields.',
      },
      {
        id: 'chatbot-roles',
        title: 'Add System and User Messages',
        instruction:
          'Create a messages array with system and user roles, each with content.',
        details: [
          'Include role "system" and role "user".',
          'Each message should have content text.',
        ],
        placeholder:
          '[\n  {"role": "system", "content": "You are a helpful support bot."},\n  {"role": "user", "content": "Reset my password."}\n]',
        expected: {
          all: ['\\brole\\b', '\\bsystem\\b', '\\buser\\b', '\\bcontent\\b'],
        },
        checkFor: ['role', 'system', 'user', 'content'],
        success: 'Nice. Clear role separation improves behavior.',
        failure: 'Include system and user roles with content.',
      },
      {
        id: 'chatbot-safety-rules',
        title: 'Add Safety Rules',
        instruction:
          'Add a Safety section with Rule 1 and Rule 2 for bot behavior.',
        details: [
          'Use the labels `Safety:`, `Rule 1:`, and `Rule 2:`.',
          'Write short, specific rules.',
        ],
        placeholder:
          'Safety:\nRule 1: Refuse requests for passwords or secrets.\nRule 2: Ask for clarification when intent is unclear.',
        expected: {
          all: ['\\bSafety\\s*:', 'Rule\\s*1', 'Rule\\s*2'],
        },
        checkFor: ['Safety:', 'Rule 1:', 'Rule 2:'],
        success: 'Great. Clear rules keep the bot on track.',
        failure: 'Include Safety:, Rule 1:, and Rule 2: labels.',
      },
      {
        id: 'chatbot-fallback',
        title: 'Write a Fallback Response',
        instruction:
          'Write a fallback response that admits uncertainty and asks to clarify.',
        details: [
          'Include the word `clarify`.',
          'End with a question mark.',
        ],
        placeholder:
          'I am not sure I understood that. Can you clarify what you need?',
        expected: {
          all: ['\\bclarify\\b', '\\?'],
        },
        checkFor: ['clarify', '?'],
        success: 'Perfect. A good fallback keeps the conversation moving.',
        failure: 'Include the word clarify and a question mark.',
      },
    ],
  },
  'vector-databases': {
    id: 'vector-databases',
    title: 'Vector Databases Basics',
    description: 'Understanding Pinecone/Chroma for AI memory.',
    overview:
      'Learn how embeddings power semantic search. You will practice defining embeddings, upserting vectors, querying by similarity, and chunking content.',
    outcomes: [
      'Explain embeddings and similarity search clearly.',
      'Store vectors with metadata for retrieval.',
      'Chunk and query data effectively.',
    ],
    exercises: [
      {
        id: 'vector-definition',
        title: 'Define an Embedding',
        instruction:
          'Write one sentence that uses the words embedding, vector, and similarity.',
        details: [
          'Keep it to a single sentence.',
          'Include all three keywords.',
        ],
        placeholder:
          'An embedding is a vector that lets us measure similarity between pieces of text.',
        expected: {
          all: ['\\bembedding\\b', '\\bvector\\b', '\\bsimilarity\\b'],
        },
        checkFor: ['embedding', 'vector', 'similarity'],
        success: 'Nice. That captures the core idea.',
        failure: 'Include the words embedding, vector, and similarity.',
      },
      {
        id: 'vector-upsert',
        title: 'Upsert a Vector',
        instruction:
          'Write a pseudo-code object for upserting a vector with id, values, and metadata.',
        details: [
          'Use the exact keys id, values, and metadata.',
          'Any values are fine.',
        ],
        placeholder:
          '{ id: "doc-1", values: [0.12, 0.98], metadata: { source: "faq" } }',
        expected: {
          all: ['\\bid\\b', '\\bvalues\\b', '\\bmetadata\\b'],
        },
        checkFor: ['id', 'values', 'metadata'],
        success: 'Great. That is a correct upsert shape.',
        failure: 'Include id, values, and metadata keys.',
      },
      {
        id: 'vector-query',
        title: 'Run a Similarity Query',
        instruction:
          'Write a query object that includes topK and a filter (or where) clause.',
        details: [
          'Include the key topK.',
          'Include either filter or where.',
        ],
        placeholder:
          '{ vector: [0.1, 0.2], topK: 5, filter: { category: "docs" } }',
        expected: {
          all: ['topK'],
          any: ['\\bfilter\\b', '\\bwhere\\b'],
        },
        checkFor: ['topK', 'filter/where'],
        success: 'Nice. That query has the right ingredients.',
        failure: 'Include topK and either filter or where.',
      },
      {
        id: 'vector-chunking',
        title: 'Define Chunking Settings',
        instruction:
          'Describe chunking settings using chunk_size and overlap.',
        details: [
          'Use the exact keys chunk_size and overlap.',
          'Provide any numeric values.',
        ],
        placeholder: 'chunk_size: 500\noverlap: 50',
        expected: {
          all: ['\\bchunk_size\\b', '\\boverlap\\b'],
        },
        checkFor: ['chunk_size', 'overlap'],
        success: 'Perfect. Chunking controls retrieval quality.',
        failure: 'Include both chunk_size and overlap.',
      },
    ],
  },
  'langchain-intro': {
    id: 'langchain-intro',
    title: 'LangChain Intro',
    description: 'Chaining AI tasks together for complex automation.',
    overview:
      'Connect prompts, models, and tools into repeatable chains. You will practice chaining components, templating inputs, retrieval, and memory.',
    outcomes: [
      'Compose simple prompt-to-model chains.',
      'Use templates and variables consistently.',
      'Add retrieval and memory for richer flows.',
    ],
    exercises: [
      {
        id: 'langchain-chain',
        title: 'Sketch a Basic Chain',
        instruction:
          'Write a chain description that includes Prompt, LLM, and Parser.',
        details: [
          'Use those exact words.',
          'A single line is fine.',
        ],
        placeholder: 'Prompt -> LLM -> Parser',
        expected: {
          all: ['\\bPrompt\\b', '\\bLLM\\b', '\\bParser\\b'],
        },
        checkFor: ['Prompt', 'LLM', 'Parser'],
        success: 'Nice. That is the core LangChain pipeline.',
        failure: 'Include Prompt, LLM, and Parser.',
      },
      {
        id: 'langchain-template',
        title: 'Use Prompt Variables',
        instruction:
          'Write a prompt template that includes {topic} and {audience}.',
        details: [
          'Use curly braces around each variable.',
          'Any sentence is fine.',
        ],
        placeholder: 'Explain {topic} for a {audience} audience.',
        expected: {
          all: ['\\{\\s*topic\\s*\\}', '\\{\\s*audience\\s*\\}'],
        },
        checkFor: ['{topic}', '{audience}'],
        success: 'Great. Variables make prompts reusable.',
        failure: 'Include both {topic} and {audience}.',
      },
      {
        id: 'langchain-retriever',
        title: 'Add a Retriever Step',
        instruction:
          'Show a retriever call that sets k= and stores docs in context.',
        details: [
          'Include the word retriever.',
          'Include k= and context.',
        ],
        placeholder:
          'const docs = retriever.getRelevantDocuments(query, k=4)\nconst context = docs.join("\n")',
        expected: {
          all: ['\\bretriever\\b', 'k\\s*=', '\\bcontext\\b'],
        },
        checkFor: ['retriever', 'k=', 'context'],
        success: 'Nice. Retrieval is wired into the chain.',
        failure: 'Include retriever, k=, and context.',
      },
      {
        id: 'langchain-memory',
        title: 'Configure Memory',
        instruction:
          'Add memory configuration that includes memory and chat_history.',
        details: [
          'Use the key memory.',
          'Include chat_history as a field.',
        ],
        placeholder: 'memory: buffer\nchat_history: []',
        expected: {
          all: ['\\bmemory\\b', '\\bchat_history\\b'],
        },
        checkFor: ['memory', 'chat_history'],
        success: 'Great. Memory keeps conversations coherent.',
        failure: 'Include memory and chat_history.',
      },
    ],
  },
  'ai-agents': {
    id: 'ai-agents',
    title: 'AI Agents 101',
    description: 'Building autonomous bots that can use tools.',
    overview:
      'Learn how agents plan, call tools, and stay safe. You will practice agent loops, tool schemas, tool calls, and guardrails.',
    outcomes: [
      'Describe a basic agent reasoning loop.',
      'Define tools with clear schemas.',
      'Add safety checks and stop conditions.',
    ],
    exercises: [
      {
        id: 'agent-loop',
        title: 'Write the Agent Loop',
        instruction:
          'Write the agent loop steps using Plan, Act, Observe, and Reflect.',
        details: [
          'Include each word once.',
          'You can use arrows or commas.',
        ],
        placeholder: 'Plan -> Act -> Observe -> Reflect',
        expected: {
          all: ['\\bPlan\\b', '\\bAct\\b', '\\bObserve\\b', '\\bReflect\\b'],
        },
        checkFor: ['Plan', 'Act', 'Observe', 'Reflect'],
        success: 'Nice. That is the classic agent loop.',
        failure: 'Include Plan, Act, Observe, and Reflect.',
      },
      {
        id: 'agent-tool-schema',
        title: 'Define a Tool Schema',
        instruction:
          'Write a tool spec that includes name, description, and parameters.',
        details: [
          'Use those exact keys.',
          'Any example tool is fine.',
        ],
        placeholder:
          '{ name: "search", description: "Find docs", parameters: { query: "string" } }',
        expected: {
          all: ['\\bname\\b', '\\bdescription\\b', '\\bparameters\\b'],
        },
        checkFor: ['name', 'description', 'parameters'],
        success: 'Great. A clear schema makes tools usable.',
        failure: 'Include name, description, and parameters.',
      },
      {
        id: 'agent-tool-call',
        title: 'Write a Tool Call',
        instruction:
          'Write a tool call object that includes tool and args.',
        details: [
          'Use the keys tool and args.',
          'Any tool name is fine.',
        ],
        placeholder: '{ tool: "search", args: { query: "pricing" } }',
        expected: {
          all: ['\\btool\\b', '\\bargs\\b'],
        },
        checkFor: ['tool', 'args'],
        success: 'Nice. That is a valid tool call shape.',
        failure: 'Include tool and args keys.',
      },
      {
        id: 'agent-guardrails',
        title: 'Add Guardrails',
        instruction:
          'Add guardrails that include max_steps and human_approval.',
        details: [
          'Use the exact keys max_steps and human_approval.',
          'Any values are fine.',
        ],
        placeholder: 'max_steps: 5\nhuman_approval: true',
        expected: {
          all: ['\\bmax_steps\\b', '\\bhuman_approval\\b'],
        },
        checkFor: ['max_steps', 'human_approval'],
        success: 'Great. Guardrails keep agents safe.',
        failure: 'Include max_steps and human_approval.',
      },
    ],
  },
  'ml-intro': {
    id: 'ml-intro',
    title: 'Machine Learning Intro',
    description: 'Understanding the math and logic behind the hype.',
    overview:
      'Cover the basic ideas behind training, evaluation, and model behavior. You will practice splits, simple equations, losses, and fit concepts.',
    outcomes: [
      'Describe how data is split for training and testing.',
      'Recognize the structure of a simple linear model.',
      'Explain evaluation and fit tradeoffs.',
    ],
    exercises: [
      {
        id: 'ml-train-test',
        title: 'Create a Train/Test Split',
        instruction:
          'Write a split statement that uses 80% train and 20% test.',
        details: [
          'Include the words train and test.',
          'Include the numbers 80 and 20.',
        ],
        placeholder: 'train: 80%\ntest: 20%',
        expected: {
          all: ['\\btrain\\b', '\\btest\\b', '80', '20'],
        },
        checkFor: ['train', 'test', '80', '20'],
        success: 'Nice. That split is the common baseline.',
        failure: 'Include train, test, 80, and 20.',
      },
      {
        id: 'ml-linear-model',
        title: 'Write a Linear Model',
        instruction: 'Write the equation y = w*x + b (or y_hat = w*x + b).',
        details: [
          'Include y or y_hat on the left side.',
          'Include w*x + b on the right side.',
        ],
        placeholder: 'y = w*x + b',
        expected: {
          all: ['\\b(y|y_hat)\\s*=', '\\bw\\s*\\*?\\s*x\\b', '\\+\\s*b\\b'],
        },
        checkFor: ['y = w*x + b'],
        success: 'Great. That is the classic linear model form.',
        failure: 'Use y (or y_hat) = w*x + b.',
      },
      {
        id: 'ml-loss',
        title: 'Name a Loss Function',
        instruction:
          'Write the loss as MSE or spell out mean squared error.',
        details: [
          'Either MSE or the full phrase is acceptable.',
          'Keep it short.',
        ],
        placeholder: 'loss: MSE',
        expected: {
          any: ['\\bMSE\\b', 'mean\\s+squared\\s+error'],
        },
        checkFor: ['MSE', 'mean squared error'],
        success: 'Nice. MSE is a standard regression loss.',
        failure: 'Include MSE or the phrase mean squared error.',
      },
      {
        id: 'ml-over-under',
        title: 'Overfitting vs Underfitting',
        instruction:
          'Explain overfitting vs underfitting in one sentence and include both words.',
        details: [
          'One sentence is enough.',
          'Include both terms explicitly.',
        ],
        placeholder:
          'Overfitting memorizes training data, while underfitting misses patterns in the data.',
        expected: {
          all: ['\\boverfitting\\b', '\\bunderfitting\\b'],
        },
        checkFor: ['overfitting', 'underfitting'],
        success: 'Great. That captures the contrast clearly.',
        failure: 'Include both overfitting and underfitting.',
      },
    ],
  },
}

export const getAiDataScienceCourseDetail = (courseId: string) =>
  aiDataScienceCourseDetails[courseId]
