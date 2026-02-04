export type CourseExercise = {
  id: string
  title: string
  instruction: string
  details: string[]
  placeholder: string
  expected: {
    all?: string[]
    any?: string[]
  }
  checkFor: string[]
  success: string
  failure: string
}

export type BackendCourseDetail = {
  id: string
  title: string
  description: string
  overview: string
  outcomes: string[]
  exercises: CourseExercise[]
}

export const backendCourseDetails: Record<string, BackendCourseDetail> = {
  'nodejs-event-loop': {
    id: 'nodejs-event-loop',
    title: 'Node.js Core Concept',
    description: 'The event loop and building non-blocking applications.',
    overview:
      'Practice how Node schedules work with the event loop and learn to spot non-blocking patterns. Each check is text-only validation. Compare timers, microtasks, and offloading strategies to keep throughput high.',
    outcomes: [
      'Recognize non-blocking APIs and when to await them.',
      'Describe key event loop phases that schedule callbacks.',
      'Choose safe strategies for CPU-heavy workloads.',
      'Batch independent I/O with Promise.all for speed.',
      'Defer work with setImmediate or microtasks when needed.',
    ],
    exercises: [
      {
        id: 'node-timeout',
        title: 'Schedule a Non-Blocking Delay',
        instruction: 'Write a Node snippet that logs after a 1 second delay.',
        details: [
          'Use setTimeout with a callback or arrow function.',
          'Include a delay value in milliseconds.',
        ],
        placeholder: "setTimeout(() => console.log('done'), 1000)",
        expected: {
          all: ['setTimeout', '\\d+', 'console\\.log'],
        },
        checkFor: ['setTimeout', 'console.log', 'delay in ms'],
        success: 'Nice. That uses a non-blocking timer.',
        failure: 'Use setTimeout with a callback and a delay value.',
      },
      {
        id: 'node-readfile',
        title: 'Read a File Asynchronously',
        instruction: 'Use fs.promises.readFile with await.',
        details: [
          'Include await and fs.promises.readFile.',
          'Any file path is fine.',
        ],
        placeholder: "const data = await fs.promises.readFile('notes.txt', 'utf8')",
        expected: {
          all: ['await', 'fs\\.promises\\.readFile'],
        },
        checkFor: ['await', 'fs.promises.readFile'],
        success: 'Great. That is the non-blocking file API.',
        failure: 'Include await with fs.promises.readFile.',
      },
      {
        id: 'node-event-loop-phases',
        title: 'Name Two Event Loop Phases',
        instruction: 'List the phases that handle timers and I/O callbacks.',
        details: [
          'Include the words timers and poll in your answer.',
          'Any additional phases are okay.',
        ],
        placeholder: 'timers, poll, check',
        expected: {
          all: ['timers', 'poll'],
        },
        checkFor: ['timers', 'poll'],
        success: 'Correct. Timers and poll are core phases.',
        failure: 'Make sure to include both timers and poll.',
      },
      {
        id: 'node-offload-cpu',
        title: 'Offload CPU-Heavy Work',
        instruction: 'Name one way to move CPU work off the event loop.',
        details: [
          'Mention worker threads, child processes, or clustering.',
        ],
        placeholder: 'Use worker threads for CPU-bound tasks.',
        expected: {
          any: ['worker', 'child\\s*process', 'cluster'],
        },
        checkFor: ['worker threads', 'child_process', 'cluster'],
        success: 'Exactly. Offloading keeps the loop responsive.',
        failure: 'Mention worker threads, child processes, or clustering.',
      },
      {
        id: 'node-promise-all',
        title: 'Run Parallel I/O',
        instruction: 'Await two async reads using Promise.all.',
        details: [
          'Use Promise.all with an array.',
          'Include fs.promises.readFile twice.',
        ],
        placeholder:
          "await Promise.all([fs.promises.readFile('a.txt'), fs.promises.readFile('b.txt')])",
        expected: {
          all: ['Promise\\.all', 'readFile', '\\['],
        },
        checkFor: ['Promise.all', 'array of promises', 'readFile'],
        success: 'Nice. That batches I/O without blocking.',
        failure: 'Use Promise.all with an array of fs.promises.readFile calls.',
      },
      {
        id: 'node-setimmediate',
        title: 'Defer Work with setImmediate',
        instruction: 'Schedule a callback to run after I/O.',
        details: [
          'Use setImmediate.',
          'Provide a callback function.',
        ],
        placeholder: "setImmediate(() => console.log('after io'))",
        expected: {
          all: ['setImmediate\\s*\\(', '(=>|function)'],
        },
        checkFor: ['setImmediate', 'callback function'],
        success: 'Good. setImmediate defers work to the check phase.',
        failure: 'Use setImmediate with a callback function.',
      },
    ],
  },
  'express-framework': {
    id: 'express-framework',
    title: 'Express.js Framework',
    description: 'Routing and middleware for scalable servers.',
    overview:
      'Build a minimal Express server with middleware and routes. Each check validates the key tokens in your answer. Compose routers and error handlers that keep APIs maintainable.',
    outcomes: [
      'Initialize an Express app and bind a server port.',
      'Register middleware for JSON parsing and logging.',
      'Create routes with clear status responses.',
      'Compose routers for feature-based endpoints.',
      'Handle errors with centralized middleware.',
    ],
    exercises: [
      {
        id: 'express-boot',
        title: 'Start an Express Server',
        instruction: 'Initialize Express and listen on port 3000.',
        details: [
          'Use express() to create the app.',
          'Call app.listen(3000).',
        ],
        placeholder: "const app = express()\napp.listen(3000, () => console.log('up'))",
        expected: {
          all: ['express\\s*\\(', 'app\\.listen\\(\\s*3000'],
        },
        checkFor: ['express()', 'app.listen(3000)'],
        success: 'Server booted. Nice work.',
        failure: 'Include express() and app.listen(3000).',
      },
      {
        id: 'express-json',
        title: 'Enable JSON Middleware',
        instruction: 'Register JSON body parsing middleware.',
        details: ['Use app.use with express.json().'],
        placeholder: 'app.use(express.json())',
        expected: {
          all: ['app\\.use', 'express\\.json'],
        },
        checkFor: ['app.use', 'express.json()'],
        success: 'Great. JSON parsing is enabled.',
        failure: 'Use app.use(express.json()).',
      },
      {
        id: 'express-health',
        title: 'Create a Health Route',
        instruction: 'Add a GET /health route that returns HTTP 200.',
        details: [
          'Use app.get with /health.',
          'Respond with status 200 or sendStatus(200).',
        ],
        placeholder: "app.get('/health', (req, res) => res.sendStatus(200))",
        expected: {
          all: ['app\\.get', '\\/health'],
          any: ['status\\(\\s*200\\s*\\)', 'sendStatus\\(\\s*200\\s*\\)'],
        },
        checkFor: ['app.get', '/health', 'status 200'],
        success: 'Health endpoint looks good.',
        failure: 'Include app.get(/health) with a 200 response.',
      },
      {
        id: 'express-middleware-next',
        title: 'Write Middleware with next()',
        instruction: 'Create a middleware function that logs and calls next().',
        details: [
          'Include req, res, and next parameters.',
          'Call next() to continue the request chain.',
        ],
        placeholder: 'const logger = (req, res, next) => {\n  console.log(req.method)\n  next()\n}',
        expected: {
          all: ['\\breq\\b', '\\bres\\b', 'next\\s*\\('],
        },
        checkFor: ['req', 'res', 'next()'],
        success: 'Perfect. That middleware keeps the chain moving.',
        failure: 'Make sure req, res, and next() appear in the snippet.',
      },
      {
        id: 'express-router',
        title: 'Create a Router',
        instruction: 'Create a router for /api with a GET /users route.',
        details: [
          'Use express.Router().',
          'Mount it with app.use("/api", router).',
        ],
        placeholder:
          "const router = express.Router()\nrouter.get('/users', (req, res) => res.json([]))\napp.use('/api', router)",
        expected: {
          all: ['Router\\s*\\(', 'router\\.get', '\\/users', 'app\\.use\\(\\s*[\"\\\']\\/api'],
        },
        checkFor: ['express.Router', 'router.get', 'app.use(/api)'],
        success: 'Router looks good.',
        failure:
          'Include express.Router(), router.get(/users), and app.use("/api", router).',
      },
      {
        id: 'express-error-middleware',
        title: 'Handle Errors Globally',
        instruction: 'Write error-handling middleware that returns HTTP 500.',
        details: [
          'Use (err, req, res, next) signature.',
          'Send status 500.',
        ],
        placeholder:
          "app.use((err, req, res, next) => {\n  console.error(err)\n  res.status(500).json({ error: 'Server error' })\n})",
        expected: {
          all: ['err', 'req', 'res', 'next', 'status\\(\\s*500'],
        },
        checkFor: ['err, req, res, next', 'status 500'],
        success: 'Nice. Centralized error handling works.',
        failure: 'Use (err, req, res, next) and respond with status 500.',
      },
    ],
  },
  'sql-relational-dbs': {
    id: 'sql-relational-dbs',
    title: 'SQL & Relational DBs',
    description: 'PostgreSQL/MySQL: Schema design and complex queries.',
    overview:
      'Practice core SQL patterns for schema design, querying, and indexing. Each check is text-only validation. Reinforce joins, constraints, and aggregates you will use in production.',
    outcomes: [
      'Model tables with primary keys and constraints.',
      'Filter, order, and join data with confidence.',
      'Create indexes for common access patterns.',
      'Define relationships with foreign keys.',
      'Aggregate results with GROUP BY.',
    ],
    exercises: [
      {
        id: 'sql-create-table',
        title: 'Design a Users Table',
        instruction:
          'Write a CREATE TABLE statement for users with id, email, and created_at.',
        details: [
          'id should be a primary key.',
          'email should be unique.',
          'created_at should have a DEFAULT value.',
        ],
        placeholder:
          'CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email TEXT UNIQUE,\n  created_at TIMESTAMP DEFAULT NOW()\n);',
        expected: {
          all: [
            'CREATE\\s+TABLE',
            '\\busers\\b',
            'PRIMARY\\s+KEY',
            '\\bemail\\b',
            'UNIQUE',
            'created_at',
            'DEFAULT',
          ],
        },
        checkFor: ['CREATE TABLE', 'PRIMARY KEY', 'email UNIQUE', 'created_at DEFAULT'],
        success: 'Schema looks solid.',
        failure: 'Include users table with primary key, unique email, and created_at default.',
      },
      {
        id: 'sql-select-order',
        title: 'Filter and Order Results',
        instruction:
          'Write a SELECT query that filters users and orders them by created_at with a limit.',
        details: [
          'Include WHERE, ORDER BY, and LIMIT.',
          'Any filter condition is fine.',
        ],
        placeholder: 'SELECT * FROM users WHERE active = true ORDER BY created_at DESC LIMIT 10;',
        expected: {
          all: ['SELECT', 'FROM\\s+users', 'WHERE', 'ORDER\\s+BY', 'LIMIT'],
        },
        checkFor: ['SELECT', 'WHERE', 'ORDER BY', 'LIMIT'],
        success: 'Nice. That query filters and sorts correctly.',
        failure: 'Make sure WHERE, ORDER BY, and LIMIT are present.',
      },
      {
        id: 'sql-join',
        title: 'Join Users and Orders',
        instruction: 'Write a JOIN between users and orders on user_id.',
        details: [
          'Include JOIN and ON.',
          'Reference both users and orders tables.',
        ],
        placeholder:
          'SELECT u.email, o.total FROM users u JOIN orders o ON o.user_id = u.id;',
        expected: {
          all: ['JOIN', 'ON', 'users', 'orders', 'user_id'],
        },
        checkFor: ['JOIN', 'ON', 'users', 'orders', 'user_id'],
        success: 'Great join. That is the standard pattern.',
        failure: 'Include JOIN, ON, users, orders, and user_id.',
      },
      {
        id: 'sql-index',
        title: 'Create an Index',
        instruction: 'Add an index for the users email column.',
        details: ['Use CREATE INDEX with ON users(email).'],
        placeholder: 'CREATE INDEX idx_users_email ON users (email);',
        expected: {
          all: ['CREATE\\s+INDEX', 'ON\\s+users', 'email'],
        },
        checkFor: ['CREATE INDEX', 'ON users', 'email'],
        success: 'Index created. Query performance helps.',
        failure: 'Use CREATE INDEX ON users(email).',
      },
      {
        id: 'sql-foreign-key',
        title: 'Add a Foreign Key',
        instruction: 'Create an orders table referencing users(id).',
        details: [
          'Include user_id column.',
          'Use REFERENCES users(id).',
        ],
        placeholder:
          'CREATE TABLE orders (\n  id SERIAL PRIMARY KEY,\n  user_id INT REFERENCES users(id)\n);',
        expected: {
          all: ['CREATE\\s+TABLE', 'orders', 'user_id', 'REFERENCES\\s+users\\s*\\(id\\)'],
        },
        checkFor: ['user_id', 'REFERENCES users(id)'],
        success: 'Foreign key looks correct.',
        failure: 'Include user_id and REFERENCES users(id).',
      },
      {
        id: 'sql-group-by',
        title: 'Aggregate with GROUP BY',
        instruction: 'Count orders by status.',
        details: [
          'Use COUNT(*).',
          'Use GROUP BY status.',
        ],
        placeholder: 'SELECT status, COUNT(*) FROM orders GROUP BY status;',
        expected: {
          all: ['COUNT\\s*\\(', 'GROUP\\s+BY', 'status'],
        },
        checkFor: ['COUNT', 'GROUP BY status'],
        success: 'Aggregate query looks good.',
        failure: 'Include COUNT(*) and GROUP BY status.',
      },
    ],
  },
  'nosql-mongodb': {
    id: 'nosql-mongodb',
    title: 'NoSQL with MongoDB',
    description: 'Document-based storage for flexible data.',
    overview:
      'Practice common MongoDB document operations for inserts, queries, and updates. Each check is text-only validation. Work with filters, projections, and pipeline summaries.',
    outcomes: [
      'Insert and query documents with filters and projections.',
      'Update records using $set.',
      'Add indexes for fast lookups.',
      'Use aggregation pipelines for summaries.',
      'Apply bulk updates with updateMany.',
    ],
    exercises: [
      {
        id: 'mongo-insert',
        title: 'Insert a User Document',
        instruction: 'Insert a user document into the users collection.',
        details: [
          'Use db.users.insertOne.',
          'Include at least an email field.',
        ],
        placeholder: "db.users.insertOne({ email: 'hello@example.com', plan: 'free' })",
        expected: {
          all: ['db\\.users\\.insertOne', '\\{', 'email'],
        },
        checkFor: ['db.users.insertOne', 'email'],
        success: 'Document inserted.',
        failure: 'Use db.users.insertOne with an email field.',
      },
      {
        id: 'mongo-find',
        title: 'Query with a Filter',
        instruction: 'Find orders with status open and return total field.',
        details: [
          'Use db.orders.find.',
          'Include a filter and a projection.',
        ],
        placeholder: "db.orders.find({ status: 'open' }, { total: 1, _id: 0 })",
        expected: {
          all: ['find\\s*\\(', 'status', 'total'],
        },
        checkFor: ['find()', 'status filter', 'total projection'],
        success: 'Query looks good.',
        failure: 'Include find(), status filter, and total projection.',
      },
      {
        id: 'mongo-update',
        title: 'Update a Document',
        instruction: 'Update a user plan using $set.',
        details: [
          'Use updateOne.',
          'Use the $set operator.',
        ],
        placeholder: "db.users.updateOne({ email: 'hello@example.com' }, { $set: { plan: 'pro' } })",
        expected: {
          all: ['updateOne', '\\$set', 'plan'],
        },
        checkFor: ['updateOne', '$set', 'plan'],
        success: 'Update is correct.',
        failure: 'Use updateOne with $set and a plan field.',
      },
      {
        id: 'mongo-index',
        title: 'Create a Unique Index',
        instruction: 'Create a unique index on users email.',
        details: [
          'Use createIndex with email.',
          'Include unique: true.',
        ],
        placeholder: 'db.users.createIndex({ email: 1 }, { unique: true })',
        expected: {
          all: ['createIndex', 'email', 'unique'],
        },
        checkFor: ['createIndex', 'email', 'unique'],
        success: 'Index will enforce uniqueness.',
        failure: 'Use createIndex with email and unique: true.',
      },
      {
        id: 'mongo-aggregate',
        title: 'Aggregate Orders',
        instruction: 'Use $match and $group to sum totals for open orders.',
        details: [
          'Use db.orders.aggregate.',
          'Include $match and $group.',
        ],
        placeholder:
          "db.orders.aggregate([{ $match: { status: 'open' } }, { $group: { _id: '$status', total: { $sum: '$total' } } }])",
        expected: {
          all: ['aggregate', '\\$match', '\\$group'],
        },
        checkFor: ['aggregate', '$match', '$group'],
        success: 'Pipeline looks right.',
        failure: 'Include aggregate with $match and $group.',
      },
      {
        id: 'mongo-update-many',
        title: 'Bulk Increment a Field',
        instruction: 'Increment views by 1 for published posts.',
        details: [
          'Use updateMany.',
          'Use $inc.',
        ],
        placeholder: 'db.posts.updateMany({ published: true }, { $inc: { views: 1 } })',
        expected: {
          all: ['updateMany', '\\$inc', 'views'],
        },
        checkFor: ['updateMany', '$inc', 'views'],
        success: 'Bulk update looks good.',
        failure: 'Use updateMany with $inc on views.',
      },
    ],
  },
  'rest-api-best-practices': {
    id: 'rest-api-best-practices',
    title: 'REST API Best Practices',
    description: 'Versioning, status codes, and clean architecture.',
    overview:
      'Sharpen REST fundamentals with versioned endpoints, status codes, and error design. Each check is text-only validation. Focus on consistent patterns that keep clients predictable.',
    outcomes: [
      'Design versioned endpoints for stable APIs.',
      'Pick correct status codes for common outcomes.',
      'Return consistent error and pagination structures.',
      'Use idempotent methods for safe retries.',
      'Apply consistent delete and update responses.',
    ],
    exercises: [
      {
        id: 'rest-versioning',
        title: 'Define a Versioned Endpoint',
        instruction: 'Write a versioned GET endpoint for listing orders.',
        details: [
          'Use GET.',
          'Include v1 in the path.',
        ],
        placeholder: 'GET /api/v1/orders',
        expected: {
          all: ['\\bGET\\b', '(api\\/)?v1\\/orders'],
        },
        checkFor: ['GET', '/api/v1/orders'],
        success: 'Versioned endpoint looks great.',
        failure: 'Include GET and a v1 path for orders.',
      },
      {
        id: 'rest-status-created',
        title: 'Use the Correct Status Code',
        instruction: 'Return the proper status for a successfully created resource.',
        details: ['Use the standard REST code for creation.'],
        placeholder: '201 Created',
        expected: {
          all: ['201'],
        },
        checkFor: ['201'],
        success: 'Yes. 201 is the correct status for creation.',
        failure: 'Use 201 for a successful creation response.',
      },
      {
        id: 'rest-error-shape',
        title: 'Design a JSON Error Shape',
        instruction: 'Provide a JSON error response with error and code fields.',
        details: [
          'Include an error message.',
          'Include a code value.',
        ],
        placeholder: '{ "error": "Invalid token", "code": "AUTH_01" }',
        expected: {
          all: ['\\berror\\b', '\\bcode\\b'],
        },
        checkFor: ['error', 'code'],
        success: 'Consistent error payload. Nice.',
        failure: 'Include both error and code fields in the JSON.',
      },
      {
        id: 'rest-pagination',
        title: 'Add Pagination Parameters',
        instruction: 'Provide a URL with page and limit query parameters.',
        details: ['Include both page and limit in the query string.'],
        placeholder: '/api/v1/orders?page=2&limit=25',
        expected: {
          all: ['page=', 'limit='],
        },
        checkFor: ['page=', 'limit='],
        success: 'Pagination parameters included.',
        failure: 'Include both page= and limit= parameters.',
      },
      {
        id: 'rest-delete-status',
        title: 'Return 204 for Delete',
        instruction: 'Show a DELETE endpoint with a 204 response.',
        details: [
          'Use DELETE.',
          'Include 204 No Content.',
        ],
        placeholder: 'DELETE /api/v1/orders/123 -> 204 No Content',
        expected: {
          all: ['DELETE', '204'],
        },
        checkFor: ['DELETE', '204'],
        success: 'Yes. 204 is the standard delete response.',
        failure: 'Include DELETE and 204 No Content.',
      },
      {
        id: 'rest-put-replace',
        title: 'Use PUT for Full Replace',
        instruction: 'Provide a PUT request for replacing a user resource.',
        details: [
          'Include /users/{id} path.',
          'Send a full JSON body.',
        ],
        placeholder: 'PUT /api/v1/users/42 { "email": "ada@example.com", "name": "Ada" }',
        expected: {
          all: ['PUT', '\\/users\\/', 'email', 'name'],
        },
        checkFor: ['PUT', '/users/{id}', 'full payload'],
        success: 'Looks like a full replace with PUT.',
        failure: 'Include PUT /users/{id} with a full JSON body.',
      },
    ],
  },
  'graphql-fundamentals': {
    id: 'graphql-fundamentals',
    title: 'GraphQL Fundamentals',
    description: 'An alternative to REST for flexible data fetching.',
    overview:
      'Practice GraphQL queries, mutations, and schema design with short snippets. Each check is text-only validation. Shape schemas and reuse field selections with fragments.',
    outcomes: [
      'Write queries and mutations with precise field selection.',
      'Define schema types with clear fields.',
      'Use variables for dynamic inputs.',
      'Reuse field selections with fragments.',
      'Model complex inputs with input types.',
    ],
    exercises: [
      {
        id: 'graphql-query',
        title: 'Query a User',
        instruction: 'Write a query that fetches a user id and email.',
        details: [
          'Include the user field.',
          'Select id and email fields.',
        ],
        placeholder: 'query { user(id: "1") { id email } }',
        expected: {
          all: ['user', '\\bid\\b', 'email'],
        },
        checkFor: ['user', 'id', 'email'],
        success: 'Nice. Minimal and focused query.',
        failure: 'Include user, id, and email fields in the query.',
      },
      {
        id: 'graphql-mutation',
        title: 'Create a Post',
        instruction: 'Write a mutation that creates a post with a title.',
        details: [
          'Use the mutation keyword.',
          'Include createPost and title.',
        ],
        placeholder: 'mutation { createPost(input: { title: "Hello" }) { id } }',
        expected: {
          all: ['mutation', 'createPost', 'title'],
        },
        checkFor: ['mutation', 'createPost', 'title'],
        success: 'Mutation is correct.',
        failure: 'Include mutation, createPost, and title.',
      },
      {
        id: 'graphql-schema-type',
        title: 'Define a Schema Type',
        instruction: 'Define a User type with id and email fields.',
        details: [
          'Use type User.',
          'Use ID! for the id field.',
        ],
        placeholder: 'type User { id: ID! email: String! }',
        expected: {
          all: ['type\\s+User', 'ID!', 'email'],
        },
        checkFor: ['type User', 'id: ID!', 'email'],
        success: 'Schema type looks good.',
        failure: 'Include type User with id: ID! and email.',
      },
      {
        id: 'graphql-variables',
        title: 'Use Query Variables',
        instruction: 'Write a query that takes $id as a variable.',
        details: [
          'Declare $id with type ID!.',
          'Use $id inside user(id: $id).',
        ],
        placeholder: 'query GetUser($id: ID!) { user(id: $id) { id } }',
        expected: {
          all: ['\\$id', 'ID!', 'user\\s*\\(\\s*id\\s*:\\s*\\$id'],
        },
        checkFor: ['$id', 'ID!', 'user(id: $id)'],
        success: 'Variables are wired correctly.',
        failure: 'Include $id and use it inside user(id: $id).',
      },
      {
        id: 'graphql-fragment',
        title: 'Create a Fragment',
        instruction: 'Define a fragment and spread it in a query.',
        details: [
          'Create fragment UserFields.',
          'Use ...UserFields in query.',
        ],
        placeholder:
          'fragment UserFields on User { id email }\nquery { user(id: "1") { ...UserFields } }',
        expected: {
          all: ['fragment\\s+UserFields', '\\.\\.\\.UserFields'],
        },
        checkFor: ['fragment UserFields', '...UserFields'],
        success: 'Fragment usage looks good.',
        failure: 'Include fragment UserFields and ...UserFields.',
      },
      {
        id: 'graphql-input',
        title: 'Define an Input Type',
        instruction: 'Define CreatePostInput with a required title.',
        details: [
          'Use input CreatePostInput.',
          'Include title: String!.',
        ],
        placeholder:
          'input CreatePostInput { title: String! }\n type Mutation { createPost(input: CreatePostInput!): Post }',
        expected: {
          all: ['input\\s+CreatePostInput', 'title\\s*:\\s*String!'],
        },
        checkFor: ['input CreatePostInput', 'title: String!'],
        success: 'Input type looks correct.',
        failure: 'Define CreatePostInput with title: String!.',
      },
    ],
  },
  'authentication-deep-dive': {
    id: 'authentication-deep-dive',
    title: 'Authentication Deep Dive',
    description: 'JWT, OAuth2, and secure cookie management.',
    overview:
      'Practice secure auth patterns with JWTs, cookies, and OAuth2 parameters. Each check is text-only validation. Reinforce safe defaults for tokens, cookies, and flows.',
    outcomes: [
      'Sign and verify JWT tokens safely.',
      'Configure secure cookies for sessions.',
      'Recognize the core OAuth2 parameters.',
      'Hash passwords before storing credentials.',
      'Use bearer tokens correctly in headers.',
    ],
    exercises: [
      {
        id: 'auth-jwt-sign',
        title: 'Sign a JWT',
        instruction: 'Write a jwt.sign call with an expiration.',
        details: [
          'Use jwt.sign with a payload and secret.',
          'Include expiresIn in the options.',
        ],
        placeholder: "jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })",
        expected: {
          all: ['jwt\\.sign', 'expiresIn'],
        },
        checkFor: ['jwt.sign', 'expiresIn'],
        success: 'Token signing looks good.',
        failure: 'Include jwt.sign and an expiresIn option.',
      },
      {
        id: 'auth-jwt-verify',
        title: 'Verify a JWT',
        instruction: 'Write a jwt.verify call for a token.',
        details: [
          'Use jwt.verify with the token and secret.',
        ],
        placeholder: 'jwt.verify(token, process.env.JWT_SECRET)',
        expected: {
          all: ['jwt\\.verify', 'token'],
        },
        checkFor: ['jwt.verify', 'token'],
        success: 'Verification call is correct.',
        failure: 'Include jwt.verify with the token.',
      },
      {
        id: 'auth-cookie',
        title: 'Set a Secure Cookie',
        instruction: 'Set an HTTP-only, secure cookie with SameSite.',
        details: [
          'Include httpOnly, secure, and sameSite.',
        ],
        placeholder:
          "res.cookie('session', token, { httpOnly: true, secure: true, sameSite: 'lax' })",
        expected: {
          all: ['httpOnly', 'secure', 'sameSite'],
        },
        checkFor: ['httpOnly', 'secure', 'sameSite'],
        success: 'Nice. Cookie settings are secure.',
        failure: 'Include httpOnly, secure, and sameSite options.',
      },
      {
        id: 'auth-oauth2-params',
        title: 'OAuth2 Authorization URL',
        instruction: 'Provide key params for an OAuth2 authorization request.',
        details: [
          'Include response_type=code, client_id, and redirect_uri.',
        ],
        placeholder:
          'https://auth.example.com/authorize?response_type=code&client_id=abc&redirect_uri=https://app.example.com/callback',
        expected: {
          all: ['response_type\\s*=\\s*code', 'client_id', 'redirect_uri'],
        },
        checkFor: ['response_type=code', 'client_id', 'redirect_uri'],
        success: 'OAuth2 parameters look correct.',
        failure: 'Include response_type=code, client_id, and redirect_uri.',
      },
      {
        id: 'auth-bcrypt-hash',
        title: 'Hash a Password',
        instruction: 'Hash a password using bcrypt with salt rounds.',
        details: [
          'Use bcrypt.hash.',
          'Include a salt rounds value.',
        ],
        placeholder: 'const hash = await bcrypt.hash(password, 12)',
        expected: {
          all: ['bcrypt\\.hash', 'password'],
          any: ['\\d+', 'saltRounds'],
        },
        checkFor: ['bcrypt.hash', 'salt rounds'],
        success: 'Nice. Bcrypt hashing is in place.',
        failure: 'Use bcrypt.hash with a password and salt rounds.',
      },
      {
        id: 'auth-bearer',
        title: 'Set Bearer Auth Header',
        instruction: 'Provide an Authorization header with a bearer token.',
        details: [
          'Include Authorization: Bearer.',
          'Any token value is fine.',
        ],
        placeholder: 'Authorization: Bearer eyJhbGciOi...',
        expected: {
          all: ['Authorization', 'Bearer'],
        },
        checkFor: ['Authorization', 'Bearer token'],
        success: 'Header format is correct.',
        failure: 'Include Authorization: Bearer <token>.',
      },
    ],
  },
  'python-for-backend': {
    id: 'python-for-backend',
    title: 'Python for Backend',
    description: 'Building fast APIs with FastAPI.',
    overview:
      'Practice FastAPI fundamentals with routes, models, and local dev commands. Each check is text-only validation. Model requests and responses the FastAPI way.',
    outcomes: [
      'Create FastAPI apps with clear routing.',
      'Define Pydantic models for request bodies.',
      'Run FastAPI locally with uvicorn.',
      'Create POST routes for data creation.',
      'Return typed responses with response_model.',
    ],
    exercises: [
      {
        id: 'fastapi-health',
        title: 'Create a Health Route',
        instruction: 'Write a FastAPI app with a GET /health route.',
        details: [
          'Instantiate FastAPI.',
          'Use the @app.get decorator with /health.',
        ],
        placeholder:
          'from fastapi import FastAPI\napp = FastAPI()\n\n@app.get("/health")\nasync def health():\n    return {"ok": True}',
        expected: {
          all: ['FastAPI', '@app\\.get\\(\\s*["\\\']\\/health'],
        },
        checkFor: ['FastAPI', '@app.get("/health")'],
        success: 'Route defined correctly.',
        failure: 'Include FastAPI() and @app.get("/health").',
      },
      {
        id: 'fastapi-model',
        title: 'Define a Pydantic Model',
        instruction: 'Create a BaseModel with a name field.',
        details: [
          'Use class X(BaseModel).',
          'Include name: str.',
        ],
        placeholder: 'class Item(BaseModel):\n    name: str',
        expected: {
          all: ['BaseModel', 'class', 'name\\s*:\\s*str'],
        },
        checkFor: ['class ... (BaseModel)', 'name: str'],
        success: 'Model looks correct.',
        failure: 'Include a BaseModel class with name: str.',
      },
      {
        id: 'fastapi-path-param',
        title: 'Use a Path Parameter',
        instruction: 'Create a route that uses /users/{user_id}.',
        details: [
          'Include the {user_id} path parameter.',
          'Reference user_id in the function signature.',
        ],
        placeholder:
          '@app.get("/users/{user_id}")\nasync def get_user(user_id: int):\n    return {"id": user_id}',
        expected: {
          all: ['\\/users\\/\\{user_id\\}', 'user_id'],
        },
        checkFor: ['/users/{user_id}', 'user_id'],
        success: 'Path parameter wired up correctly.',
        failure: 'Include /users/{user_id} and user_id in the handler.',
      },
      {
        id: 'fastapi-uvicorn',
        title: 'Run with Uvicorn',
        instruction: 'Provide the uvicorn command to run main:app with reload.',
        details: [
          'Use uvicorn main:app --reload.',
        ],
        placeholder: 'uvicorn main:app --reload',
        expected: {
          all: ['uvicorn', 'main:app', '--reload'],
        },
        checkFor: ['uvicorn', 'main:app', '--reload'],
        success: 'That command will start FastAPI locally.',
        failure: 'Use uvicorn main:app --reload.',
      },
      {
        id: 'fastapi-post',
        title: 'Create a POST Route',
        instruction: 'Write a POST /items route that accepts an Item model.',
        details: [
          'Use @app.post("/items").',
          'Accept item: Item in the signature.',
        ],
        placeholder:
          '@app.post("/items")\nasync def create_item(item: Item):\n    return item',
        expected: {
          all: ['@app\\.post\\(\\s*["\\\']\\/items', '\\bItem\\b'],
        },
        checkFor: ['@app.post("/items")', 'item: Item'],
        success: 'POST route looks good.',
        failure: 'Include @app.post("/items") and item: Item.',
      },
      {
        id: 'fastapi-response-model',
        title: 'Add a Response Model',
        instruction: 'Return a response_model for a GET route.',
        details: [
          'Use response_model=Item.',
          'Use @app.get.',
        ],
        placeholder:
          '@app.get("/items/{item_id}", response_model=Item)\nasync def read_item(item_id: int):\n    return Item(id=item_id, name="Demo")',
        expected: {
          all: ['response_model\\s*=\\s*Item', '@app\\.get'],
        },
        checkFor: ['response_model=Item', '@app.get'],
        success: 'Response model is set.',
        failure: 'Include response_model=Item on the route.',
      },
    ],
  },
  'docker-basics': {
    id: 'docker-basics',
    title: 'Docker Basics',
    description: 'Containerizing your apps so they work on every machine.',
    overview:
      'Practice writing Dockerfiles and using common Docker commands. Each check is text-only validation. Cover image builds, port mapping, and compose basics.',
    outcomes: [
      'Write a minimal Dockerfile for a Node app.',
      'Build and run images with port mapping.',
      'Ignore local files with .dockerignore.',
      'Expose ports and set runtime defaults.',
      'Start multi-container stacks with docker compose.',
    ],
    exercises: [
      {
        id: 'dockerfile-basics',
        title: 'Write a Minimal Dockerfile',
        instruction: 'Provide a Dockerfile snippet for a Node app.',
        details: [
          'Include FROM, WORKDIR, COPY, and CMD.',
        ],
        placeholder:
          'FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD ["npm", "start"]',
        expected: {
          all: ['FROM', 'WORKDIR', 'COPY', 'CMD'],
        },
        checkFor: ['FROM', 'WORKDIR', 'COPY', 'CMD'],
        success: 'Dockerfile snippet looks good.',
        failure: 'Include FROM, WORKDIR, COPY, and CMD.',
      },
      {
        id: 'docker-build',
        title: 'Build an Image',
        instruction: 'Provide the docker build command for an image named api.',
        details: [
          'Use docker build -t api .',
        ],
        placeholder: 'docker build -t api .',
        expected: {
          all: ['docker\\s+build', '-t', '\\.'],
        },
        checkFor: ['docker build', '-t', '.'],
        success: 'Image build command is correct.',
        failure: 'Use docker build -t api .',
      },
      {
        id: 'docker-run',
        title: 'Run with Port Mapping',
        instruction: 'Run the api image with port 3000 exposed.',
        details: [
          'Use docker run with -p 3000:3000.',
        ],
        placeholder: 'docker run -p 3000:3000 api',
        expected: {
          all: ['docker\\s+run', '-p', '3000:3000'],
        },
        checkFor: ['docker run', '-p', '3000:3000'],
        success: 'Container run command is correct.',
        failure: 'Include docker run -p 3000:3000 api.',
      },
      {
        id: 'dockerignore',
        title: 'Ignore Local Files',
        instruction: 'List two common entries for .dockerignore.',
        details: [
          'Include node_modules and .env.',
        ],
        placeholder: 'node_modules\n.env',
        expected: {
          all: ['node_modules', '\\.env'],
        },
        checkFor: ['node_modules', '.env'],
        success: 'Great. Those files will stay out of the image.',
        failure: 'Include both node_modules and .env.',
      },
      {
        id: 'docker-expose',
        title: 'Expose a Port',
        instruction: 'Add an EXPOSE instruction for port 3000.',
        details: [
          'Use EXPOSE 3000.',
        ],
        placeholder: 'EXPOSE 3000',
        expected: {
          all: ['EXPOSE', '3000'],
        },
        checkFor: ['EXPOSE', '3000'],
        success: 'Port exposure looks good.',
        failure: 'Include EXPOSE 3000.',
      },
      {
        id: 'docker-compose-up',
        title: 'Run with Docker Compose',
        instruction: 'Provide the command to start services with docker compose.',
        details: [
          'Use docker compose up.',
        ],
        placeholder: 'docker compose up --build',
        expected: {
          all: ['docker\\s+compose', '\\bup\\b'],
        },
        checkFor: ['docker compose', 'up'],
        success: 'Compose command looks right.',
        failure: 'Use docker compose up.',
      },
    ],
  },
}

export const getBackendCourseDetail = (courseId: string) =>
  backendCourseDetails[courseId]
