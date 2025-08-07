import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '', 
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Helper function to create responses with CORS headers
function corsResponse(body: string | object | null, status = 200) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  };

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
    console.log(`Received ${req.method} request to submit-lead`);
    
    if (req.method === 'OPTIONS') {
      console.log('Handling CORS preflight request');
      return corsResponse({}, 204);
    }

    if (req.method !== 'POST') {
      console.log(`Method ${req.method} not allowed`);
      return corsResponse({ error: 'Method not allowed' }, 405);
    }

    let requestBody;
    try {
      requestBody = await req.json();
      console.log('Request body:', requestBody);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return corsResponse({ error: 'Invalid JSON in request body' }, 400);
    }

    const { name, email, phone, source } = requestBody;

    // Validate required fields
    if (!name || !email || !phone) {
      return corsResponse({ error: 'Missing required fields: name, email, phone' }, 400);
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return corsResponse({ error: 'Invalid email format' }, 400);
    }

    // Store lead in database
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        source: source || 'website',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      
      // Handle duplicate email
      if (error.code === '23505' && error.message.includes('email')) {
        return corsResponse({ error: 'This email is already registered' }, 409);
      }
      
      return corsResponse({ error: 'Failed to save lead information' }, 500);
    }

    console.log('Lead saved successfully:', data);

    // Here you can add integration with external CRM systems
    // For example: HubSpot, Salesforce, Mailchimp, etc.
    try {
      await sendToCRM({
        name,
        email,
        phone,
        source,
        leadId: data.id
      });
    } catch (crmError) {
      console.error('CRM integration error:', crmError);
      // Don't fail the request if CRM fails, just log it
    }

    return corsResponse({ 
      success: true, 
      message: 'Lead submitted successfully',
      leadId: data.id 
    });

  } catch (error: any) {
    console.error(`Lead submission error: ${error.message}`);
    console.error('Error stack:', error.stack);
    
    return corsResponse({ 
      error: 'An error occurred while submitting your information. Please try again.' 
    }, 500);
  }
});

// Function to send lead data to external CRM
async function sendToCRM(leadData: {
  name: string;
  email: string;
  phone: string;
  source: string;
  leadId: number;
}) {
  // Example: Send to HubSpot (replace with your CRM API)
  const hubspotApiKey = Deno.env.get('HUBSPOT_API_KEY');
  
  if (!hubspotApiKey) {
    console.log('No HubSpot API key configured, skipping CRM sync');
    return;
  }

  try {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hubspotApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          firstname: leadData.name.split(' ')[0],
          lastname: leadData.name.split(' ').slice(1).join(' ') || '',
          email: leadData.email,
          phone: leadData.phone,
          lead_source: leadData.source,
          lifecyclestage: 'lead',
          hs_lead_status: 'NEW',
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HubSpot API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Lead sent to HubSpot successfully:', result.id);
    
  } catch (error) {
    console.error('Failed to send lead to HubSpot:', error);
    throw error;
  }
}