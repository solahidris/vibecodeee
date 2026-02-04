export const config = { runtime: 'edge' }

import { createClient } from '@supabase/supabase-js'

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { reference } = await req.json()

    if (!reference) {
      return new Response(
        JSON.stringify({ error: 'Reference (user_id) is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

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

    // Update user's profile with subscription status
    const { error: updateError, data } = await supabase
      .from('profiles')
      .update({
        has_active_subscription: true,
        subscription_started_at: new Date().toISOString(),
      })
      .eq('id', reference)
      .select()

    if (updateError) {
      console.error('Error updating subscription status:', updateError)
      return new Response(
        JSON.stringify({ error: 'Failed to activate subscription', details: updateError }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({ error: 'User not found with that reference ID' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    console.log(`Successfully activated subscription for user: ${reference}`)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Subscription activated successfully',
        user: data[0]
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Manual activation error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
