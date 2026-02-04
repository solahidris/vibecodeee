export const config = { runtime: 'edge' }

interface CreateSubscriptionBody {
  customer_email: string
  customer_name?: string
  plan_id?: string
  user_id: string
}

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

    const body: CreateSubscriptionBody = await req.json()
    const { customer_email, customer_name, plan_id, user_id } = body

    if (!customer_email || !user_id) {
      return new Response(
        JSON.stringify({ error: 'customer_email and user_id are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Calculate start date (today in SGT - Singapore Time)
    const today = new Date()
    const startDate = today.toISOString().split('T')[0]

    // Create form data for recurring billing
    const formData = new URLSearchParams({
      customer_email,
      start_date: startDate,
      redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodeee.com'}/payment/success`,
      reference: user_id, // Use user_id as reference to track who paid
      webhook: 'https://vibecodeee.com/api/hitpay-webhook',
      send_email: 'true',
      'payment_methods[]': 'card',
    })

    // Add optional fields
    if (customer_name) {
      formData.append('customer_name', customer_name)
    }

    // If plan_id is provided, use it. Otherwise, create subscription without plan
    if (plan_id) {
      formData.append('plan_id', plan_id)
    } else {
      // Create subscription without a pre-defined plan
      formData.append('name', 'Telegram Community Access')
      formData.append('cycle', 'monthly')
      formData.append('amount', '10.00')
      formData.append('currency', 'MYR')
    }

    const response = await fetch('https://api.hit-pay.com/v1/recurring-billing', {
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
      return new Response(
        JSON.stringify({ error: 'Failed to create subscription', details: data }),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Return the checkout URL to redirect the user
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error creating recurring billing:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
