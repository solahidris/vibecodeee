// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const config = {
  runtime: 'edge',
}

export default async function handler(req: Request) {
  return new Response(
    JSON.stringify({ name: "John Doe" }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
