"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Building } from 'lucide-react';
import { ShinyButton } from '@/components/ui/fancy-button';


const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-300">
      {/* Hero Section */}
      <header className="relative px-4 py-24 overflow-hidden md:py-32">
        <motion.div 
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-grid-brand-700/[0.05] bg-[size:32px]" />
        </motion.div>
        
        <motion.div 
          className="max-w-6xl mx-auto text-center"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.h1 
            className="mb-6 text-5xl font-bold text-gray-900 md:text-7xl"
            variants={fadeIn}
          >
            Your Career
            <span className="block mt-2 text-brand-700">Your Future</span>
          </motion.h1>
          
          <motion.p 
            className="max-w-2xl mx-auto mb-12 text-lg text-gray-600 md:text-xl"
            variants={fadeIn}
          >
            Connect with industry-leading companies and unlock opportunities that align with your passion and expertise.
          </motion.p>
          
          <motion.div 
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            variants={fadeIn}
          >
            <ShinyButton href="/sign-in" className="py-4">
              Start Hiring Today
            </ShinyButton>
            <ShinyButton href="/sign-up" className="py-4">
              Explore Opportunities
            </ShinyButton>
          </motion.div>
        </motion.div>
      </header>

      {/* Features Section */}
      <motion.section 
        className="px-4 py-24 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="mb-16 text-4xl font-bold text-center text-gray-900 md:text-5xl"
            variants={fadeIn}
          >
            Why Leading Companies Choose Us
          </motion.h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <Building className="w-12 h-12 text-brand-600" />,
                title: "Premium Employers",
                description: "Partner with Fortune 500 companies and innovative startups reshaping industries."
              },
              {
                icon: <Users className="w-12 h-12 text-brand-600" />,
                title: "Talent Network",
                description: "Access a curated network of exceptional professionals across all sectors."
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-brand-600" />,
                title: "Career Growth",
                description: "Benefit from personalized career guidance and industry insights."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="p-8 transition-all duration-300 bg-gray-50 rounded-xl hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-center text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-center text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="px-4 py-24 text-white bg-brand-700"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
            {[
              { number: "100K+", label: "Active Positions" },
              { number: "50K+", label: "Partner Companies" },
              { number: "1M+", label: "Success Stories" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="relative p-8 transition-all duration-300 rounded-xl hover:bg-brand-600"
              >
                <div className="mb-4 text-5xl font-bold">{stat.number}</div>
                <div className="text-xl text-brand-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="px-4 py-24 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl"
            variants={fadeIn}
          >
            Ready to Transform Your Career?
          </motion.h2>
          <motion.p 
            className="mb-12 text-lg text-gray-600"
            variants={fadeIn}
          >
            Join thousands of professionals who have found their dream roles through our platform.
          </motion.p>
          <motion.div 
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            variants={fadeIn}
          >
            <ShinyButton href="/sign-up" className="py-4">
              Get Started Now
            </ShinyButton>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="px-4 py-12 text-gray-400 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2025 JobBoarD_NG. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;