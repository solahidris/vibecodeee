export type BackendCourse = {
  id: string
  number: number
  title: string
  description: string
}

export const backendCourses: BackendCourse[] = [
  {
    id: 'nodejs-event-loop',
    number: 16,
    title: 'Node.js Core Concept',
    description: 'The event loop and building non-blocking applications. Timers, I/O, and offloading.',
  },
  {
    id: 'express-framework',
    number: 17,
    title: 'Express.js Framework',
    description: 'Routing and middleware for scalable servers. Routers, errors, and maintainable APIs.',
  },
  {
    id: 'sql-relational-dbs',
    number: 18,
    title: 'SQL & Relational DBs',
    description: 'PostgreSQL/MySQL: Schema design and complex queries. Joins, indexes, and aggregates.',
  },
  {
    id: 'nosql-mongodb',
    number: 19,
    title: 'NoSQL with MongoDB',
    description: 'Document-based storage for flexible data. CRUD, indexes, and pipelines.',
  },
  {
    id: 'rest-api-best-practices',
    number: 20,
    title: 'REST API Best Practices',
    description: 'Versioning, status codes, and clean architecture. Errors, pagination, and idempotency.',
  },
  {
    id: 'graphql-fundamentals',
    number: 21,
    title: 'GraphQL Fundamentals',
    description: 'An alternative to REST for flexible data fetching. Schemas, queries, and variables.',
  },
  {
    id: 'authentication-deep-dive',
    number: 22,
    title: 'Authentication Deep Dive',
    description: 'JWT, OAuth2, and secure cookie management. Sessions, headers, and token safety.',
  },
  {
    id: 'python-for-backend',
    number: 23,
    title: 'Python for Backend',
    description: 'Building fast APIs with FastAPI. Models, routing, and uvicorn.',
  },
  {
    id: 'docker-basics',
    number: 24,
    title: 'Docker Basics',
    description: 'Containerizing your apps so they work on every machine. Dockerfiles, builds, and compose.',
  },
]
