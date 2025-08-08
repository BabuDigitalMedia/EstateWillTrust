import React, { useState } from 'react';
import { Shield, CheckCircle, Users, FileText, Heart, Phone, Mail, Globe, Star, Lock, CreditCard, Download, Clock, Award, Scale, BookOpen, UserCheck, Building2, Briefcase, HelpCircle, ChevronDown, ChevronUp, Baby, Home, UserCog, Gift } from 'lucide-react';
import { SuccessPage } from './components/SuccessPage';
import { LeadMagnet } from './components/LeadMagnet';

const STRIPE_PAYMENT_URL = 'https://buy.stripe.com/aFa5kEfqN15i6Oz1GMcV203';

interface PaymentButtonProps {
  className?: string;
  children: React.ReactNode;
}

function PaymentButton({ className = '', children }: PaymentButtonProps) {
  const handleClick = () => {
    window.location.href = STRIPE_PAYMENT_URL;
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <CreditCard className="w-5 h-5 mr-2" />
      {children}
    </button>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      )}
    </div>
  );
}

function App() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What do I get after I make the payment?",
      answer: "After payment, you'll receive an email with a voucher code from <a href='https://www.netlaw.com/legacy' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:text-blue-800 underline'>NetLaw</a>. Use this code to activate your account, where you'll follow an easy step-by-step process to complete your Will, Trust, and other legal documents — 100% online and attorney-approved."
    },
    {
      question: "What does this plan include?",
      answer: `<div class="space-y-2">
        <div class="flex items-center space-x-2">
          <span class="text-green-600">✅</span>
          <span>Last Will & Testament</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-green-600">✅</span>
          <span>Revocable Living Trust</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-green-600">✅</span>
          <span>Durable Financial Power of Attorney</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-green-600">✅</span>
          <span>Healthcare Surrogate & Living Will</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-green-600">✅</span>
          <span>HIPAA Authorization</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-green-600">✅</span>
          <span>Pet Trust (optional)</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-green-600">✅</span>
          <span>Secure Cloud Document Storage</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-green-600">✅</span>
          <span><strong>Free Lifetime Updates</strong></span>
        </div>
      </div>`
    },
    {
      question: "Is this legally valid in all states?",
      answer: "Yes! NetLaw documents are attorney-approved and compliant in all 50 U.S. states."
    },
    {
      question: "Do I need a lawyer to complete this?",
      answer: "No. The process is designed so you can complete it confidently without an attorney. But if you'd like legal guidance, you can consult one independently."
    },
    {
      question: "How long does it take to finish?",
      answer: "Most people complete everything in 30–60 minutes — on your own time, from any device."
    },
    {
      question: "Can I make changes later?",
      answer: "Yes! You get lifetime access to your estate plan with unlimited free updates — for life."
    },
    {
      question: "Is it safe and secure?",
      answer: "Absolutely. Your data is encrypted and stored securely using bank-level security standards."
    },
    {
      question: "What is a Last Will and Testament?",
      answer: "A Last Will and Testament is a legal document that specifies how you want your assets distributed after your death. It allows you to name beneficiaries for your property, designate guardians for minor children, and appoint an executor to manage your estate. Without a will, state laws determine how your assets are distributed, which may not align with your wishes."
    },
    {
      question: "What is a Living Trust and how is it different from a Will?",
      answer: "A Living Trust (also called a Revocable Trust) is a legal entity that holds your assets during your lifetime and distributes them after your death. Unlike a will, assets in a trust avoid probate court, providing privacy and faster distribution to beneficiaries. You maintain full control as the trustee during your lifetime and can modify or revoke the trust at any time."
    },
    {
      question: "What is probate and why should I avoid it?",
      answer: "Probate is the court-supervised process of validating a will and distributing assets after death. It can take 6-18 months, costs thousands in legal fees, and becomes public record. Assets in a living trust bypass probate entirely, saving time, money, and maintaining privacy for your family."
    },
    {
      question: "What is a Power of Attorney?",
      answer: "A Power of Attorney is a legal document that authorizes someone you trust to make financial and legal decisions on your behalf if you become incapacitated. A Durable Financial Power of Attorney remains effective even if you become mentally incapacitated, ensuring your bills are paid and financial matters are handled."
    },
    {
      question: "What is a Healthcare Surrogate or Healthcare Power of Attorney?",
      answer: "A Healthcare Surrogate (also called Healthcare Power of Attorney) designates someone to make medical decisions for you if you're unable to do so. This person can communicate with doctors, access your medical records, and make treatment decisions based on your known wishes and best interests."
    },
    {
      question: "What is an Advance Directive or Living Will?",
      answer: "An Advance Directive (Living Will) documents your preferences for end-of-life medical care, including decisions about life support, artificial nutrition, and other medical interventions. It provides guidance to your healthcare surrogate and medical team about your wishes when you cannot communicate them yourself."
    },
    {
      question: "What is HIPAA Authorization and why do I need it?",
      answer: "HIPAA Authorization allows designated individuals to access your medical information and communicate with your healthcare providers. Without this authorization, even close family members may be denied access to your medical records or information about your condition due to privacy laws."
    },
    {
      question: "Do I need estate planning if I don't have many assets?",
      answer: "Yes! Estate planning isn't just about wealth—it's about protecting your family and ensuring your wishes are followed. Even with modest assets, you need to designate guardians for children, make healthcare decisions clear, and avoid forcing your family through probate court during a difficult time."
    },
    {
      question: "Are these documents legally valid in my state?",
      answer: "Yes! Our documents are attorney-drafted and specifically tailored to meet the legal requirements of all 50 states. NetLaw's 25+ years of experience ensures compliance with state-specific laws and regulations. The documents are regularly updated to reflect changes in state legislation."
    },
    {
      question: "Can I update my documents if my situation changes?",
      answer: "Absolutely! Life changes, and your estate plan should too. With our service, you receive lifetime access to update your documents at no additional cost. Whether you move, get married, have children, or acquire new assets, you can modify your estate plan as needed."
    },
    {
      question: "What happens if I die without a will or trust?",
      answer: "If you die without estate planning documents (called dying 'intestate'), state laws determine how your assets are distributed, which may not match your wishes. Your family will face a lengthy, expensive probate process, and the court will appoint guardians for minor children. This can create family conflicts and financial hardship."
    },
    {
      question: "How is this different from hiring a traditional attorney?",
      answer: "Our service provides the same quality, attorney-drafted documents at a fraction of the cost. Traditional attorneys typically charge $3,000-$5,000+ for estate planning. We offer professional-grade documents with lifetime updates for a one-time fee, making comprehensive estate planning accessible to everyone."
    }
  ];

  // Check if we're on the success page
  if (window.location.pathname === '/success') {
    return <SuccessPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Lead Magnet Modal */}
      <LeadMagnet 
        isOpen={isLeadMagnetOpen} 
        onClose={() => setIsLeadMagnetOpen(false)} 
      />

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/image.png" 
                alt="Grow-Shine Financial Logo" 
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h1 className="text-xl font-bold">Grow-Shine Financial</h1>
                <p className="text-blue-200 text-sm">Powered by NetLaw</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+1 (609) 674-7817</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">solve@growshinefin.com</span>
                </div>
              </div>
              <button
                onClick={() => setIsLeadMagnetOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <Gift className="w-4 h-4" />
                <span className="hidden sm:inline">Free Guide</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Estate Planning Made <span className="text-blue-600">Simple</span>
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-lg">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Protect Your Family</span>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Avoid Probate</span>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Secure Your Legacy</span>
              </div>
            </div>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Create Your Last Will & Living Trust Online — Backed by NetLaw's 25+ Years of Legal Excellence & Powered by Grow-Shine Financial Group
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
                <Scale className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Attorney-drafted documents</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Lifetime access with FREE updates</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Trusted by 500,000+ families</span>
              </div>
            </div>
            
            {/* Lead Magnet CTA */}
            <div className="mb-8">
              <button
                onClick={() => setIsLeadMagnetOpen(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-200 mb-4 flex items-center space-x-3 mx-auto"
              >
                <Download className="w-6 h-6" />
                <span>Get Free Estate Planning Guide</span>
              </button>
              <p className="text-sm text-gray-600">
                Download our comprehensive guide before you start your estate plan
              </p>
            </div>

            <PaymentButton className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-200">
              Start Your Will & Trust Now
            </PaymentButton>
          </div>
        </div>
      </section>

      {/* The Big Three Legacy Questions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">The Big Three Legacy Questions</h2>
              <p className="text-xl text-gray-600">Every family must answer these critical questions</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Question 1: Children */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-6">
                  <div className="bg-blue-600 rounded-full p-4 inline-block mb-4">
                    <Baby className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Who will care for your young children?</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Without naming a Guardian, a judge will decide who will have custody and control of your children and their inheritance.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Naturally, you want to ensure your kiddos go to the person you trust the most. If you wish to avoid custody battles between family members, you should plan your estate.
                  </p>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                    <p className="text-sm font-semibold text-blue-800">
                      Don't let a judge decide your children's future.
                    </p>
                  </div>
                </div>
              </div>

              {/* Question 2: Property */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-6">
                  <div className="bg-green-600 rounded-full p-4 inline-block mb-4">
                    <Home className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">What happens to your property?</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Suppose you bought a house or car that you want to remain in the family when you pass away. No biggie!
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    After some time in public court, your assets and bank accounts may finally be accessible to the right person. Or maybe not. If you want to avoid uncertainty, you should plan your estate.
                  </p>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-600">
                    <p className="text-sm font-semibold text-green-800">
                      Protect your family's financial future.
                    </p>
                  </div>
                </div>
              </div>

              {/* Question 3: Power */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-6">
                  <div className="bg-purple-600 rounded-full p-4 inline-block mb-4">
                    <UserCog className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Who has the power?</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Asking "who has the power" may sound like a silly question initially.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    However, suppose you become incapacitated for any reason. In that case, you need to have someone you trust appointed to make medical and financial decisions on your behalf. Needless to say, you should plan your estate.
                  </p>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-purple-600">
                    <p className="text-sm font-semibold text-purple-800">
                      Choose who makes decisions for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-red-900 mb-4">
                  Without Estate Planning, Others Decide Your Family's Future
                </h3>
                <p className="text-red-800 text-lg">
                  Don't leave these critical decisions to chance, courts, or family disputes. Take control today.
                </p>
              </div>
              
              <PaymentButton className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                Answer These Questions Today
              </PaymentButton>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - MOVED TO MIDDLE */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <CreditCard className="w-16 h-16 text-orange-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Limited Time Special Offer</h2>
            <p className="text-xl text-blue-200 mb-12">No hidden fees, no subscriptions, no ongoing costs</p>
            
            <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-2xl max-w-md mx-auto">
                <div className="text-center">
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full inline-block mb-4 animate-pulse">
                    <span className="font-bold">🔥 LIMITED TIME OFFER</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Complete Will & Trust Package – Lifetime Access</h3>
                  
                  {/* Pricing with crossed out original price */}
                  <div className="mb-6">
                    <div className="text-2xl text-gray-500 line-through mb-2">
                      $999
                    </div>
                    <div className="text-5xl font-bold text-green-600 mb-2">
                      $499
                    </div>
                    <div className="text-red-600 font-bold text-lg">
                      Save $500!
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>One-time payment — no recurring fees</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Lifetime access to your documents</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-bold">Unlimited free amendments for life</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Complete document package for both spouses</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Attorney-drafted, state-specific documents</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Secure cloud storage and access</span>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-yellow-800 font-semibold">
                      ⏰ This special pricing won't last long!
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Compare to $3,000+ for traditional attorney services
                    </p>
                  </div>
                  
                  <PaymentButton className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200 mb-4">
                    🔐 Secure This Deal Now - $499
                  </PaymentButton>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Lock className="w-4 h-4" />
                    <span>Powered by Stripe — bank-level security</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* NetLaw Credibility Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Building2 className="w-12 h-12 text-blue-600 mb-3" />
                <div className="text-3xl font-bold text-gray-900">25+</div>
                <div className="text-gray-600">Years of Legal Excellence</div>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-12 h-12 text-blue-600 mb-3" />
                <div className="text-3xl font-bold text-gray-900">500K+</div>
                <div className="text-gray-600">Families Protected</div>
              </div>
              <div className="flex flex-col items-center">
                <Scale className="w-12 h-12 text-blue-600 mb-3" />
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-gray-600">State Jurisdictions</div>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-12 h-12 text-blue-600 mb-3" />
                <div className="text-3xl font-bold text-gray-900">A+</div>
                <div className="text-gray-600">BBB Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Estate Planning Matters */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-4">
                <Shield className="w-16 h-16 text-blue-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Estate Planning Matters</h2>
              <p className="text-xl text-gray-600">Protect your family and your assets with professional-grade documents</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Estate planning is more than paperwork — it's peace of mind. With NetLaw's attorney-drafted Will & Trust documents, you:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Control exactly how your assets are distributed to beneficiaries</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Avoid costly probate proceedings and maintain family privacy</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Designate trusted individuals for healthcare and financial decisions</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Minimize estate taxes and maximize inheritance for loved ones</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Ensure your wishes are legally recognized in all 50 states</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
                <div className="text-center">
                  <Heart className="w-20 h-20 text-red-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Peace of Mind</h3>
                  <p className="text-gray-700 mb-4">
                    Knowing your family is protected with legally sound documents brings invaluable peace of mind.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 italic">
                      "Without proper estate planning, your family may face months or years of legal complications, high costs, and emotional stress during an already difficult time."
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <PaymentButton className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                Build My Plan Today
              </PaymentButton>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn & Receive */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Estate Planning Package</h2>
              <p className="text-xl text-gray-600">Attorney-drafted documents tailored to your state's laws</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Last Will and Testament', desc: 'Distribute assets and name guardians for minor children' },
                { title: 'Revocable Living Trust', desc: 'Avoid probate and maintain privacy for your family' },
                { title: 'Pour-Over Will', desc: 'Ensures all assets flow into your trust' },
                { title: 'Durable Financial Power of Attorney', desc: 'Authorize someone to handle financial matters' },
                { title: 'Healthcare Surrogate Designation', desc: 'Appoint someone to make medical decisions' },
                { title: 'HIPAA Authorization', desc: 'Allow access to your medical information' },
                { title: 'Advance Directive / Living Will', desc: 'Document your end-of-life care preferences' },
                { title: 'Pet Trust', desc: 'Ensure your pets are cared for after you\'re gone' },
                { title: 'Secure Cloud Storage', desc: 'Access your documents anytime, anywhere' }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-gray-900 font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl mt-8 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="w-6 h-6" />
                <span className="text-xl font-bold">Lifetime Amendments — Absolutely Free!</span>
                <Star className="w-6 h-6" />
              </div>
              <p className="text-green-100">Life changes, and so should your estate plan. Update your documents anytime at no additional cost.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Everything you need to know about estate planning</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onToggle={() => toggleFAQ(index)}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Still Have Questions?
                </h3>
                <p className="text-blue-800 mb-4">
                  Our team is here to help you understand estate planning and guide you through the process.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="text-sm">
                    <span className="font-medium">Phone:</span> +1 (609) 674-7817
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Email:</span> solve@growshinefin.com
                  </div>
                </div>
              </div>
              
              <PaymentButton className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                Get Started Now
              </PaymentButton>
            </div>
          </div>
        </div>
      </section>

      {/* NetLaw Professional Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Scale className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Legal Foundation</h2>
              <p className="text-xl text-gray-600">Built on NetLaw's proven expertise in estate planning</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why NetLaw?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Briefcase className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">25+ Years of Legal Excellence</h4>
                      <p className="text-gray-600">Established legal practice with deep expertise in estate planning law</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <UserCheck className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Attorney-Reviewed Documents</h4>
                      <p className="text-gray-600">Every template is created and regularly updated by licensed attorneys</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Globe className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">State-Specific Compliance</h4>
                      <p className="text-gray-600">Documents tailored to meet the legal requirements of your state</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Building2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Trusted by Professionals</h4>
                      <p className="text-gray-600">Used by financial advisors, CPAs, and estate planning professionals nationwide</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
                <div className="text-center">
                  <Award className="w-20 h-20 text-blue-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Grade</h3>
                  <p className="text-gray-700 mb-6">
                    The same quality documents used by estate planning attorneys, now accessible directly to you.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-semibold">A+ BBB Rating</span>
                    </div>
                    <p className="text-sm text-gray-600">Trusted by over 500,000 families nationwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
              <p className="text-xl text-gray-600">Real stories from real families who chose professional estate planning</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "So easy to understand and complete. In under an hour, we had our comprehensive will and trust in place. The NetLaw backing gives us confidence these documents are legally sound. Highly recommend Grow-Shine + NetLaw!"
                </p>
                <p className="font-semibold text-gray-900">– Ravi & Lakshmi P.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Probate was a nightmare for my parents — took 18 months and cost thousands. I'm glad I found this professional solution. Now my family is protected with attorney-quality documents, and it didn't cost a fortune."
                </p>
                <p className="font-semibold text-gray-900">– Sunita R.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "As a financial advisor, I've seen too many families struggle without proper estate planning. The NetLaw documents are professional-grade — the same quality I'd recommend from any estate attorney. The cloud access is brilliant."
                </p>
                <p className="font-semibold text-gray-900">– Ajay M., CFP</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Phone className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Need Help or Have Questions?</h2>
            <p className="text-xl text-gray-600 mb-8">Contact Grow-Shine Financial Group for personalized assistance:</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Phone</p>
                <p className="text-blue-600">+1 (609) 674-7817</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl">
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-blue-600">solve@growshinefin.com</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl">
                <Globe className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Website</p>
                <p className="text-blue-600">www.growshinefin.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Your legacy. Your way. Your peace of mind.</h2>
            <p className="text-xl text-blue-200 mb-4">Start your professional estate plan in minutes — backed by 25+ years of legal expertise.</p>
            <div className="bg-red-500 text-white px-6 py-2 rounded-full inline-block mb-6 animate-pulse">
              <span className="font-bold">🔥 Limited Time: Save $500 Today!</span>
            </div>
            <PaymentButton className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-200">
              Create My Will & Trust Now - $499
            </PaymentButton>
            <p className="text-blue-200 text-sm mt-4">Join over 500,000 families who trust NetLaw for their estate planning needs</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img 
                src="/image.png" 
                alt="Grow-Shine Financial Logo" 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-lg font-bold">Grow-Shine Financial Group</h3>
                <p className="text-gray-400 text-sm">Powered by NetLaw</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">
              © 2024 Grow-Shine Financial Group. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Estate planning documents created by NetLaw — 25+ years of legal excellence, trusted by over 500,000 families.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;