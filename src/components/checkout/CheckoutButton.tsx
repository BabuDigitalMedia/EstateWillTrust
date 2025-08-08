import React, { useState } from 'react';
import { CreditCard, Loader2, ExternalLink } from 'lucide-react';

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
      // Get payment link from environment variable
      const paymentLink = import.meta.env.VITE_PAYMENT_LINK;
      
      if (!paymentLink) {
        throw new Error('Payment link not configured. Please contact support.');
      }

      console.log('Redirecting to payment link:', paymentLink);

      // Redirect to the payment link
      window.location.href = paymentLink;

    } catch (error) {
      console.error('Checkout error:', error);
      
      let userMessage = 'An error occurred during checkout. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('Payment link not configured')) {
          userMessage = 'Payment system is temporarily unavailable. Please contact support at solve@growshinefin.com or call +1 (609) 674-7817.';
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
        <ExternalLink className="w-5 h-5 mr-2" />
      )}
      {loading ? 'Redirecting...' : children}
    </button>
  );
}