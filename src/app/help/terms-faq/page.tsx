'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const faqCategories = [
  {
    title: 'Account & Usage',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    questions: [
      {
        q: 'What are the requirements for creating an account?',
        a: 'To create an account, you must be at least 13 years old and provide a valid email address. You agree to maintain accurate account information and are responsible for all activities under your account.'
      },
      {
        q: 'Can I have multiple accounts?',
        a: 'While we generally recommend maintaining a single account, multiple accounts are permitted for different purposes (e.g., personal and business). However, accounts must not be used to circumvent restrictions or violate our terms.'
      },
      {
        q: 'What happens if I violate the terms of service?',
        a: 'Violations may result in various actions depending on severity, from warnings to account suspension. You will be notified of any violations and have the opportunity to appeal decisions through our moderation process.'
      }
    ]
  },
  {
    title: 'Content Rights',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    questions: [
      {
        q: 'Who owns the content I post?',
        a: 'You retain ownership of all content you create and post. However, by posting content, you grant us a non-exclusive license to use, display, and distribute your content on our platform.'
      },
      {
        q: 'Can I use copyrighted material in my posts?',
        a: 'You may only use copyrighted material with proper attribution and permission from the copyright holder. Fair use principles apply, but you are responsible for ensuring compliance with copyright laws.'
      },
      {
        q: 'What happens to my content if I delete my account?',
        a: 'When you delete your account, your content will be removed from public view. However, some content may be retained in backups or if required by law. Comments and interactions with other users\' content may remain.'
      }
    ]
  },
  {
    title: 'Privacy & Data',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    questions: [
      {
        q: 'What personal information do you collect?',
        a: 'We collect information you provide (email, profile info) and usage data (IP address, device info, interactions). See our Privacy Policy for complete details on data collection and usage.'
      },
      {
        q: 'How is my data protected?',
        a: 'We use industry-standard security measures including encryption, secure servers, and regular security audits. We never sell your personal data to third parties.'
      },
      {
        q: 'Can I request my data to be deleted?',
        a: 'Yes, you can request complete deletion of your data through your account settings or by contacting support. We will process your request within 30 days, subject to legal requirements.'
      }
    ]
  },
  {
    title: 'Billing & Subscriptions',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    questions: [
      {
        q: 'How do subscriptions work?',
        a: 'Subscriptions are billed monthly or annually. You can upgrade, downgrade, or cancel at any time. Changes to paid plans take effect at the next billing cycle.'
      },
      {
        q: 'What is your refund policy?',
        a: 'We offer a 14-day money-back guarantee for new subscriptions. After this period, refunds are handled on a case-by-case basis. Prorated refunds may be available for annual plans.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept major credit cards, PayPal, and bank transfers in select regions. All payments are processed securely through our payment providers.'
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

export default function TermsFAQPage() {
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
            Terms FAQ
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Frequently asked questions about our terms of service and policies.
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
              placeholder="Search FAQ..."
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
          <h2 className="text-3xl font-bold mb-6">Need More Help?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Check out our complete documentation or contact our support team for assistance.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/terms" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              Terms of Service
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/contact" 
              className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Contact Support
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  )
} 