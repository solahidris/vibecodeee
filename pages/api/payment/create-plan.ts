export const config = { runtime: 'edge' }

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const apiKey = process.env.HITPAY_API_KEY
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Create subscription plan
    const formData = new URLSearchParams({
      name: 'Telegram Community Access',
      description: 'Monthly subscription to join the Telegram community',
      currency: 'MYR',
      amount: '10.00',
      cycle: 'monthly',
      reference: 'telegram_community_monthly',
    })

    const response = await fetch('https://api.hit-pay.com/v1/subscription-plan', {
      method: 'POST',
      headers: {
        'X-BUSINESS-API-KEY': apiKey,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('HitPay API error:', data)
      return new Response(JSON.stringify({ error: 'Failed to create plan', details: data }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error creating subscription plan:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
