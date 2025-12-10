"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Basic conversions",
      "Limited editing",
      "Limited AI use",
      "Watermarked exports",
      "1 GB storage",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "For professionals",
    features: [
      "Unlimited editing",
      "Unlimited AI",
      "Batch operations",
      "No watermark",
      "100 GB cloud sync",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    price: "$29.99",
    period: "/month",
    description: "For teams",
    features: [
      "Everything in Pro",
      "Multiple users",
      "Admin dashboard",
      "Collaboration tools",
      "API access",
      "Dedicated support",
      "Custom branding",
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-black mb-4 gradient-text">
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Choose the plan that fits your needs. Scale up anytime.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`rounded-2xl p-8 transition-all ${
              plan.highlighted
                ? "glass-panel border-2 border-neon-pink ring-1 ring-neon-pink/50"
                : "glass-panel"
            }`}
          >
            {plan.highlighted && (
              <div className="mb-4 inline-block px-3 py-1 rounded-full bg-neon-pink/20 text-neon-pink text-xs font-bold">
                POPULAR
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-white/60 text-sm mb-6">{plan.description}</p>

            <div className="mb-6">
              <span className="text-5xl font-black">{plan.price}</span>
              {plan.period && <span className="text-white/60 ml-2">{plan.period}</span>}
            </div>

            <button
              className={`w-full py-3 rounded-lg font-bold mb-8 transition-all ${
                plan.highlighted
                  ? "bg-gradient-to-r from-neon-pink to-neon-purple hover:shadow-lg hover:shadow-neon-pink/50"
                  : "glass-button hover:bg-white/20"
              }`}
            >
              Get Started
            </button>

            <div className="space-y-4">
              {plan.features.map((feature, fidx) => (
                <motion.div
                  key={fidx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: fidx * 0.05 }}
                  className="flex items-center space-x-3"
                >
                  <Check className="w-5 h-5 text-neon-green flex-shrink-0" />
                  <span className="text-white/80">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
