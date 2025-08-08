import React, { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  priceId: string;
  mode: 'payment' | 'subscription';
  className?: string;
  children: React.ReactNode;
}

export function CheckoutButton({ priceId, mode, className = '', children }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // Check if we have the required environment variables
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Application configuration error. Please contact support.');
      }

      console.log('Creating checkout session with:', {
        price_id: priceId,
        mode,
        success_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/`,
      });

      const response = await fetch(`${supabaseUrl}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          price_id: priceId,
          mode,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/`,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        let errorMessage = 'Failed to create checkout session';
        
        try {
          const errorData = await response.json();
          console.error('Error response data:', errorData);
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
          // Handle non-JSON responses (like 404 HTML pages)
          if (response.status === 404) {
            errorMessage = 'Payment service is not available. The Stripe checkout function needs to be deployed to your Supabase project.';
          } else {
            errorMessage = `${errorMessage} (${response.status}: ${response.statusText})`;
          }
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Success response data:', data);
      
      if (data.url) {
        console.log('Redirecting to checkout URL:', data.url);
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received from server');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      
      let userMessage = 'An error occurred during checkout. Please try again.';
      
      if (error instanceof Error) {
        // Provide more specific error messages based on the error content
        if (error.message.includes('Stripe configuration error') || 
            error.message.includes('Stripe API key is invalid') ||
            error.message.includes('STRIPE_SECRET_KEY')) {
          userMessage = 'Payment system is temporarily unavailable. Please contact support at solve@growshinefin.com or call +1 (609) 674-7817.';
        } else if (error.message.includes('Invalid price ID')) {
          userMessage = 'Invalid product configuration. Please contact support.';
        } else if (error.message.includes('Failed to fetch') || 
                   error.message.includes('NetworkError') ||
                   error.message.includes('TypeError: Failed to fetch')) {
          userMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('Application configuration error')) {
          userMessage = error.message;
        } else {
          userMessage = `Checkout error: ${error.message}`;
        }
      }
      
      alert(userMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
      ) : (
        <CreditCard className="w-5 h-5 mr-2" />
      )}
      {loading ? 'Processing...' : children}
    </button>
  );
}