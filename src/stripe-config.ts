export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  originalPrice?: number;
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_RNxhN6Y30LxVlv',
    priceId: 'price_1Rf01cL1MBQjIhgeV6ZFdHQP',
    name: 'Complete Will & Trust Package – Lifetime Access',
    description: 'NetLaw\'s estate planning service simplifies securing your family\'s future, making it both easy and accessible. This comprehensive package includes Last Will & Testament, Power of Attorney, Revocable Living Trust, Pet Trust, HIPAA Authorization, Healthcare Surrogate',
    mode: 'payment',
    price: 499.00,
    originalPrice: 999.00
  }
];

export const getProductById = (id: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.id === id);
};

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};