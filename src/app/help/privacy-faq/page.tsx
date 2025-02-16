'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const faqCategories = [
  {
    title: 'Data Collection',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    questions: [
      {
        q: 'What personal information do you collect?',
        a: 'We collect basic account information (email, username), profile information you choose to provide, and usage data such as IP addresses, device information, and interaction data. We also collect content you create, post, or share on our platform.'
      },
      {
        q: 'Do you use cookies?',
        a: 'Yes, we use cookies and similar technologies to enhance your experience, remember your preferences, and understand how our platform is used. You can control cookie settings through your browser preferences.'
      },
      {
        q: 'How do you track user activity?',
        a: 'We track user interactions with our platform to improve our services, provide personalized content, and ensure security. This includes page views, clicks, and feature usage patterns.'
      }
    ]
  },
  {
    title: 'Data Usage',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    questions: [
      {
        q: 'How is my personal data used?',
        a: 'Your data is used to provide and improve our services, personalize your experience, communicate with you, and ensure platform security. We never sell your personal information to third parties.'
      },
      {
        q: 'Do you share my data with third parties?',
        a: 'We only share data with third parties when necessary to provide our services (e.g., payment processing), when required by law, or with your explicit consent. We have strict data protection agreements with all service providers.'
      },
      {
        q: 'How long do you retain my data?',
        a: 'We retain your data for as long as your account is active or as needed to provide services. After account deletion, some data may be retained for legal compliance or in anonymized form for analytics.'
      }
    ]
  },
  {
    title: 'Data Protection',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    questions: [
      {
        q: 'How do you protect my data?',
        a: 'We implement industry-standard security measures including encryption, secure servers, regular security audits, and strict access controls. We continuously monitor for potential security threats and update our protection measures.'
      },
      {
        q: 'What happens if there\'s a data breach?',
        a: 'In the event of a data breach, we will promptly notify affected users and relevant authorities as required by law. We will provide information about the breach and steps you should take to protect yourself.'
      },
      {
        q: 'Is my payment information secure?',
        a: 'All payment processing is handled by secure, certified payment providers. We never store your full credit card details on our servers.'
      }
    ]
  },
  {
    title: 'Your Privacy Rights',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    questions: [
      {
        q: 'How can I access my personal data?',
        a: 'You can access most of your personal data directly through your account settings. For additional data access requests, contact our privacy team through the support portal.'
      },
      {
        q: 'Can I request my data to be deleted?',
        a: 'Yes, you can request deletion of your personal data through your account settings or by contacting support. We will process your request within 30 days, subject to legal requirements.'
      },
      {
        q: 'How can I update my privacy preferences?',
        a: 'You can manage your privacy preferences, including communication settings and data usage options, through your account settings. Changes will take effect immediately.'
      }
    ]
  }
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="border-b border-gray-700">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-medium">{question}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PrivacyFAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({})

  const toggleQuestion = (question: string) => {
    setOpenQuestions(prev => ({
      ...prev,
      [question]: !prev[question]
    }))
  }

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Privacy FAQ
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Frequently asked questions about privacy and data protection on our platform.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search privacy questions..."
              className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white
                       placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <svg 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
                  {category.icon}
                </div>
                <h2 className="text-xl font-bold">{category.title}</h2>
              </div>
              <div className="space-y-2">
                {category.questions.map((item) => (
                  <FAQItem
                    key={item.q}
                    question={item.q}
                    answer={item.a}
                    isOpen={openQuestions[item.q] || false}
                    onToggle={() => toggleQuestion(item.q)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Resources */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-gray-800 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Review our complete privacy policy or contact our privacy team for specific concerns.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/privacy" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              Privacy Policy
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/contact" 
              className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Contact Privacy Team
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  )
} 