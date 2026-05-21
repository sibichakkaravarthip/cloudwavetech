import React, { useState } from 'react';
import { Check, Server, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState('one-time'); // 'one-time' or 'monthly'

  const plans = [
    {
      name: 'Basic Hosting',
      icon: Server,
      prices: {
        'one-time': '$39',
        'monthly': '$29'
      },
      billingText: {
        'one-time': 'starting price',
        'monthly': 'starting price'
      },
      description: 'Ideal for static websites, single page applications, or developer portfolios.',
      features: [
        'Single EC2 deployment',
        'Nginx configuration',
        'SSL setup',
        'Route53 DNS connection',
        'Static website hosting',
        '7-day support',
      ],
      popular: false,
      cta: 'Get Started',
      accentColor: 'from-blue-500 to-cyan-400',
      glowColor: 'rgba(59, 130, 246, 0.12)',
    },
    {
      name: 'Standard Deployment',
      icon: Zap,
      prices: {
        'one-time': '$99',
        'monthly': '$49'
      },
      billingText: {
        'one-time': 'starting price',
        'monthly': 'starting price'
      },
      description: 'Full production stack setup with database, reverse proxy, and continuous pipelines.',
      features: [
        'Full stack deployment',
        'React + backend hosting',
        'CloudFront CDN setup',
        'CI/CD deployment',
        'Database configuration',
        'Nginx reverse proxy',
        'SSL + domain setup',
        '30-day support',
      ],
      popular: true,
      cta: 'Deploy Now',
      accentColor: 'from-blue-600 via-indigo-500 to-blue-500',
      glowColor: 'rgba(99, 102, 241, 0.25)',
    },
    {
      name: 'Premium Cloud Infrastructure',
      icon: Shield,
      prices: {
        'one-time': '$249',
        'monthly': '$119'
      },
      billingText: {
        'one-time': 'starting price',
        'monthly': 'starting price'
      },
      description: 'High-availability, secure, scalable infrastructure for mission-critical applications.',
      features: [
        'Load balancer setup',
        'Auto scaling',
        'Production optimization',
        'Monitoring & logging',
        'Security hardening',
        'High availability architecture',
        'Performance optimization',
        'Priority support',
      ],
      popular: false,
      cta: 'Request Consultation',
      accentColor: 'from-indigo-500 to-purple-600',
      glowColor: 'rgba(168, 85, 247, 0.12)',
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-slate-200/40 dark:border-slate-900 relative overflow-hidden">
      
      {/* Background neon glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-600/5 rounded-full filter blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="text-blue-500 font-bold tracking-widest uppercase text-xs">
          Pricing Plans
        </div>
        {/* Tiny Trust Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-extrabold uppercase tracking-wider mx-auto">
          <span>Secure</span>
          <span className="text-blue-500/40">•</span>
          <span>Scalable</span>
          <span className="text-blue-500/40">•</span>
          <span>Production Ready</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white leading-tight">
          Flexible Pricing for Every Scale
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
          Select a package that matches your web application's resource demands, reliability requirements, and team support level.
        </p>
      </div>

      {/* Billing Switcher Toggle */}
      <div className="flex justify-center items-center gap-4 mb-16">
        <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${billingPeriod === 'one-time' ? 'text-blue-500' : 'text-slate-500 dark:text-slate-400'}`}>
          One-Time Setup
        </span>
        <button
          onClick={() => setBillingPeriod(billingPeriod === 'one-time' ? 'monthly' : 'one-time')}
          className="relative w-10 h-6 bg-slate-200 dark:bg-slate-800 rounded-full transition-colors duration-300 focus:outline-none border border-slate-300 dark:border-slate-700 cursor-pointer p-1 flex items-center"
          aria-label="Toggle billing period"
        >
          <div
            className={`w-4 h-4 bg-blue-600 rounded-full shadow-md transition-transform duration-300 transform flex-shrink-0 ${
              billingPeriod === 'one-time' ? 'translate-x-0' : 'translate-x-4'
            }`}
          />
        </button>
        <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${billingPeriod === 'monthly' ? 'text-blue-500' : 'text-slate-500 dark:text-slate-400'}`}>
          Monthly Management
        </span>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto px-2 md:px-0">
        {plans.map((plan, idx) => {
          const Icon = plan.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ 
                y: -8, 
                scale: plan.popular ? 1.04 : 1.02,
                boxShadow: `0 20px 45px ${plan.glowColor}`
              }}
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between border relative overflow-hidden transition-all duration-300 ${
                plan.popular 
                  ? 'border-blue-500/70 bg-gradient-to-b from-slate-900/40 to-slate-950/40 dark:from-slate-900/40 dark:to-slate-950/40 shadow-xl shadow-blue-500/5 lg:scale-105 z-10' 
                  : 'border-slate-200/80 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 shadow-md'
              } backdrop-blur-sm`}
            >
              {/* Standard card background pulse glow */}
              {plan.popular && (
                <div className="absolute inset-0 bg-blue-500/3 rounded-3xl filter blur-xl animate-pulse pointer-events-none -z-10" />
              )}

              {/* Top gradient accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.accentColor}`} />


              <div className="text-left">
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${plan.accentColor} text-white shadow-md shadow-blue-500/10`}>
                    <Icon className="w-5 h-5 text-white stroke-[2.5]" />
                  </div>
                  {plan.popular && (
                    <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Best Value
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed min-h-[40px]">{plan.description}</p>
                
                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-8 border-b border-slate-200/50 dark:border-slate-800/50 pb-6">
                  <div className="overflow-hidden flex items-baseline">
                    <span className="text-3xl font-bold text-slate-500 dark:text-slate-400 mr-0.5 align-top">$</span>
                    <motion.span
                      key={billingPeriod}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="text-5xl font-extrabold text-slate-800 dark:text-white font-sans tracking-tight"
                    >
                      {plan.prices[billingPeriod].replace('$', '')}
                    </motion.span>
                  </div>
                  <motion.span
                    key={`text-${billingPeriod}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1"
                  >
                    / {plan.billingText[billingPeriod]}
                  </motion.span>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400 leading-normal">
                      <div className="p-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-500 mt-0.5">
                        <Check className="w-3.5 h-3.5 flex-shrink-0" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                className={`w-full py-3.5 rounded-2xl font-bold text-xs text-center transition-all duration-300 block ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 cursor-pointer'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:-translate-y-0.5 cursor-pointer'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Notes & Notice */}
      <div className="mt-16 text-center space-y-4 max-w-2xl mx-auto px-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-100/50 dark:bg-slate-900/40 py-2.5 px-5 rounded-full inline-block border border-slate-200/50 dark:border-slate-800/50">
          <span className="text-blue-500 font-extrabold uppercase tracking-wider mr-1.5">Notice:</span>
          AWS cloud infrastructure charges are billed separately based on actual usage.
        </p>
        <div>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium italic">
            Custom enterprise infrastructure pricing available upon consultation.
          </p>
        </div>
      </div>
    </section>
  );
}
