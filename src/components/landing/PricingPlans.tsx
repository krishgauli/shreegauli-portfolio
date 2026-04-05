'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSitePreferences } from '@/components/SitePreferencesProvider';
import PricingCard from '@/components/PricingCard';

const plans = [
  {
    name: 'Hourly',
    price: '$50',
    period: '/ Hour',
    description: 'Perfect for businesses needing flexible, on-demand support.',
    features: [
      'Website Design & Development',
      'SEO & Local Search',
      'Google Ads Management',
      'Social Media Management',
      'Monthly Strategy Calls',
      'Performance Reporting',
    ],
    cta: 'Get started',
    variant: 'professional' as const,
    popular: false,
  },
  {
    name: 'Growth',
    price: '$1,499',
    period: '/ Month',
    description: 'For businesses ready to accelerate their growth with 30 hours/month.',
    features: [
      '30 Hours / Month',
      'Full-Stack Development',
      'Advanced SEO & Analytics',
      'Google & Meta Ads',
      'Dedicated Project Manager',
      'Priority Support & SLA',
      'Weekly Strategy Reports',
    ],
    cta: 'Get started',
    variant: 'professional' as const,
    popular: true,
  },
  {
    name: 'Scale',
    price: '$2,500',
    period: '/ Month',
    description: 'Enterprise solutions with 50 hours/month for maximum impact.',
    features: [
      '50 Hours / Month',
      'Custom Software Solutions',
      'Multi-Platform Campaigns',
      'Advanced Analytics & BI',
      'Conversion Rate Optimization',
      'White-Glove Onboarding',
      'Enterprise SLA & Support',
    ],
    cta: 'Get started',
    variant: 'professional' as const,
    popular: false,
  },
  {
    name: 'Custom',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for businesses with unique needs and goals.',
    features: [
      'Tailored Hours & Scope',
      'Dedicated Team & Resources',
      'Custom Integrations & APIs',
      'Multi-Channel Strategy',
      'Executive Reporting & BI',
      'White-Glove Onboarding',
      'Enterprise SLA & Support',
    ],
    cta: 'Contact Sales',
    variant: 'premium' as const,
    popular: false,
  },
];

export default function PricingPlans() {
  const { t, theme } = useSitePreferences();
  const isDark = theme === 'dark';

  return (
    <section className={`py-24 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('Choose Your Plan')}
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('Transparent pricing. No contracts. No fluff.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, idx) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              cta={plan.cta}
              ctaHref="/signup"
              popular={plan.popular}
              variant={plan.variant}
              delay={idx * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
