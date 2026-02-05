import { createClient } from '@supabase/supabase-js'

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

// Validate HMAC signature using Web Crypto API
async function validateWebhookSignature(payload: Record<string, string>, secret: string): Promise<boolean> {
  const { hmac: receivedHmac, ...data } = payload

  // Sort keys alphabetically and concatenate values
  const sortedKeys = Object.keys(data).sort()
  const signatureString = sortedKeys.map(key => `${key}${data[key]}`).join('')

  // Calculate HMAC using Web Crypto API
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const messageData = encoder.encode(signatureString)

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData)
  const calculatedHmac = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

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
    // Use webhook salt (different from API salt)
    const salt = process.env.HITPAY_WEBHOOK_SALT || process.env.HITPAY_API_SALT
    if (!salt) {
      console.error('HITPAY_WEBHOOK_SALT or HITPAY_API_SALT not configured')
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
    const isValidSignature = await validateWebhookSignature(payload, salt)
    if (!isValidSignature) {
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
      console.log(`Payment successful for reference: ${reference}`)

      // Update user subscription status in Supabase
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
          console.error('Supabase configuration missing')
          return new Response(JSON.stringify({ error: 'Server configuration error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Update user's profile with subscription status
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            has_active_subscription: true,
            subscription_started_at: new Date().toISOString(),
          })
          .eq('id', reference)

        if (updateError) {
          console.error('Error updating subscription status:', updateError)
        } else {
          console.log(`Successfully activated subscription for user: ${reference}`)
        }
      } catch (error) {
        console.error('Error updating Supabase:', error)
      }
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
