import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY');

// Helper function to create responses with CORS headers
function corsResponse(body: string | object | null, status = 200) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  };

  // For 204 No Content, don't include Content-Type or body
  if (status === 204) {
    return new Response(null, { status, headers });
  }

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
}

Deno.serve(async (req) => {
  try {
    console.log(`Received ${req.method} request to stripe-checkout`);
    
    if (req.method === 'OPTIONS') {
      console.log('Handling CORS preflight request');
      return corsResponse({}, 204);
    }

    if (req.method !== 'POST') {
      console.log(`Method ${req.method} not allowed`);
      return corsResponse({ error: 'Method not allowed' }, 405);
    }

    // Check if Stripe secret key is available
    if (!stripeSecret) {
      console.error('STRIPE_SECRET_KEY environment variable is not set');
      return corsResponse({ 
        error: 'Stripe configuration error. Payment system is not properly configured. Please contact support.' 
      }, 500);
    }

    const stripe = new Stripe(stripeSecret, {
      appInfo: {
        name: 'Bolt Integration',
        version: '1.0.0',
      },
    });

    let requestBody;
    try {
      requestBody = await req.json();
      console.log('Request body:', requestBody);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return corsResponse({ error: 'Invalid JSON in request body' }, 400);
    }

    const { price_id, success_url, cancel_url, mode, customer_email } = requestBody;

    const error = validateParameters(
      { price_id, success_url, cancel_url, mode },
      {
        cancel_url: 'string',
        price_id: 'string',
        success_url: 'string',
        mode: { values: ['payment', 'subscription'] },
      },
    );

    if (error) {
      console.error('Parameter validation error:', error);
      return corsResponse({ error }, 400);
    }

    console.log('Creating Stripe checkout session with parameters:', {
      price_id,
      mode,
      success_url,
      cancel_url,
      customer_email
    });

    // Create checkout session configuration
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode,
      success_url,
      cancel_url,
      // Collect customer information during checkout
      customer_creation: 'always',
      billing_address_collection: 'required',
      // Collect customer email if not provided
      customer_email: customer_email || undefined,
    };

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log(`Successfully created checkout session ${session.id} with URL: ${session.url}`);

    return corsResponse({ 
      sessionId: session.id, 
      url: session.url 
    });
  } catch (error: any) {
    console.error(`Checkout error: ${error.message}`);
    console.error('Error stack:', error.stack);
    
    // Provide more specific error messages
    if (error.message?.includes('Invalid API Key')) {
      return corsResponse({ 
        error: 'Stripe API key is invalid. Please check configuration.' 
      }, 500);
    }
    
    if (error.message?.includes('No such price')) {
      return corsResponse({ 
        error: 'Invalid price ID provided. Please contact support.' 
      }, 400);
    }

    if (error.message?.includes('API key')) {
      return corsResponse({ 
        error: 'Stripe configuration error. Please contact support.' 
      }, 500);
    }
    
    return corsResponse({ 
      error: 'An error occurred while creating the checkout session. Please try again or contact support.' 
    }, 500);
  }
});

type ExpectedType = 'string' | { values: string[] };
type Expectations<T> = { [K in keyof T]: ExpectedType };

function validateParameters<T extends Record<string, any>>(values: T, expected: Expectations<T>): string | undefined {
  for (const parameter in values) {
    const expectation = expected[parameter];
    const value = values[parameter];

    if (expectation === 'string') {
      if (value == null) {
        return `Missing required parameter ${parameter}`;
      }
      if (typeof value !== 'string') {
        return `Expected parameter ${parameter} to be a string got ${JSON.stringify(value)}`;
      }
    } else {
      if (!expectation.values.includes(value)) {
        return `Expected parameter ${parameter} to be one of ${expectation.values.join(', ')}`;
      }
    }
  }

  return undefined;
}