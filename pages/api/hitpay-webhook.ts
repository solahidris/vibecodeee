import crypto from 'crypto'

export const config = { runtime: 'edge' }

interface WebhookPayload {
  payment_id: string
  recurring_billing_id: string
  amount: string
  currency: string
  status: 'succeeded' | 'failed'
  reference: string
  hmac: string
}

// Validate HMAC signature
function validateWebhookSignature(payload: Record<string, string>, secret: string): boolean {
  const { hmac: receivedHmac, ...data } = payload

  // Sort keys alphabetically and concatenate values
  const sortedKeys = Object.keys(data).sort()
  const signatureString = sortedKeys.map(key => `${key}${data[key]}`).join('')

  // Calculate HMAC
  const calculatedHmac = crypto
    .createHmac('sha256', secret)
    .update(signatureString)
    .digest('hex')

  return calculatedHmac === receivedHmac
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const salt = process.env.HITPAY_API_SALT
    if (!salt) {
      console.error('HITPAY_API_SALT not configured')
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Parse form data
    const formData = await req.formData()
    const payload: Record<string, string> = {}

    formData.forEach((value, key) => {
      payload[key] = value.toString()
    })

    // Validate HMAC signature
    if (!validateWebhookSignature(payload, salt)) {
      console.error('Invalid webhook signature')
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const {
      payment_id,
      recurring_billing_id,
      amount,
      currency,
      status,
      reference,
    } = payload as unknown as WebhookPayload

    console.log('Webhook received:', {
      payment_id,
      recurring_billing_id,
      amount,
      currency,
      status,
      reference,
    })

    // Handle successful payment
    if (status === 'succeeded') {
      // TODO: Grant telegram access to user
      // Update user's subscription status in database
      // You can use the reference field to identify the user (e.g., user_id or email)

      console.log(`Payment successful for reference: ${reference}`)

      // You could call Supabase here to update user subscription status
      // const supabase = createClient()
      // await supabase.from('subscriptions').insert({
      //   user_id: reference,
      //   payment_id,
      //   recurring_billing_id,
      //   amount: parseFloat(amount),
      //   currency,
      //   status: 'active',
      // })
    } else {
      console.error(`Payment failed for reference: ${reference}`)
    }

    // Return 200 to acknowledge receipt
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
