export const config = { runtime: 'edge' }

import { createClient } from '@supabase/supabase-js'

const WHITELIST_PHONE_NUMBERS = [
  "60107121471",
  "60107043558",
  "60182122730",
  "601121888560",
  "60186610228",
  "60174968858",
  "60197420493",
  "60123095550",
  "60187641741",
  "60102986040",
  "60132712340",
]

// Sanitize phone number: remove all non-digit characters
function sanitizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '')
}

// Validate phone format: must start with 60 and be 10-12 digits
function isValidPhoneFormat(phone: string): boolean {
  return /^60\d{8,10}$/.test(phone)
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { phoneNumber, userId } = await req.json()

    if (!phoneNumber || !userId) {
      return new Response(
        JSON.stringify({ error: 'Phone number and user ID are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Sanitize the phone number
    const sanitizedPhone = sanitizePhoneNumber(phoneNumber)

    // Validate format
    if (!isValidPhoneFormat(sanitizedPhone)) {
      return new Response(
        JSON.stringify({
          error: 'Invalid phone format. Please enter a Malaysian number starting with 60 (e.g., 60123456789)'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Check if phone number is in whitelist
    if (!WHITELIST_PHONE_NUMBERS.includes(sanitizedPhone)) {
      return new Response(
        JSON.stringify({
          error: 'Phone number not found in our Day 1 supporters list. Please check the number and try again.'
        }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Update user profile with subscription and phone number
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase configuration missing')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { error: updateError, data } = await supabase
      .from('profiles')
      .update({
        has_active_subscription: true,
        phone_number: sanitizedPhone,
        subscription_started_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()

    if (updateError) {
      console.error('Error updating profile:', updateError)
      return new Response(
        JSON.stringify({ error: 'Failed to activate subscription', details: updateError.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    console.log(`Day 1 supporter verified and activated: ${userId} (${sanitizedPhone})`)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Welcome back, Day 1 supporter! Your premium access has been activated.',
        user: data[0]
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Phone verification error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
