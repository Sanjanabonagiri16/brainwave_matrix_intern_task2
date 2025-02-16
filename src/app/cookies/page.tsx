'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const cookieTypes = [
  {
    title: 'Essential Cookies',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    description: 'These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take such as logging in or filling in forms.',
    required: true,
    examples: [
      'Authentication cookies',
      'Session cookies',
      'Security cookies',
      'Load balancing cookies'
    ]
  },
  {
    title: 'Functional Cookies',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    ),
    description: 'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers.',
    required: false,
    examples: [
      'Language preferences',
      'Theme preferences',
      'Font size settings',
      'Saved searches'
    ]
  },
  {
    title: 'Analytics Cookies',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
    required: false,
    examples: [
      'Page view statistics',
      'Traffic sources',
      'User behavior patterns',
      'Performance metrics'
    ]
  },
  {
    title: 'Marketing Cookies',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    description: 'These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for individual users.',
    required: false,
    examples: [
      'Targeted advertising',
      'Social media sharing',
      'Interest tracking',
      'Campaign effectiveness'
    ]
  }
]

const userControls = [
  {
    title: 'Browser Settings',
    description: 'You can control cookies through your browser settings. Most browsers allow you to block or delete cookies.',
    steps: [
      'Access your browser settings',
      'Navigate to privacy/security section',
      'Manage cookie preferences',
      'Choose blocking or deletion options'
    ]
  },
  {
    title: 'Cookie Preferences',
    description: 'Our website provides a cookie preference center where you can manage non-essential cookies.',
    steps: [
      'Click cookie settings',
      'Review cookie categories',
      'Toggle preferences',
      'Save your choices'
    ]
  },
  {
    title: 'Third-Party Tools',
    description: 'You can use third-party privacy tools and browser extensions to manage cookies and tracking.',
    steps: [
      'Install privacy extensions',
      'Configure tracking protection',
      'Manage cookie permissions',
      'Monitor cookie activity'
    ]
  }
]

export default function CookiesPage() {
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
            Cookie Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            We use cookies and similar technologies to provide you with the best possible experience.
            Learn how we use them and how you can control them.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-500 mt-4"
          >
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </motion.p>
        </div>

        {/* Cookie Types */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Types of Cookies We Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{type.title}</h3>
                    {type.required && (
                      <span className="text-xs text-blue-400">Required</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 mb-4">{type.description}</p>
                <div className="bg-gray-750 rounded-lg p-4">
                  <h4 className="text-sm font-semibold mb-2">Examples:</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    {type.examples.map((example) => (
                      <li key={example} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                        </svg>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* User Controls */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8">Managing Your Cookie Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userControls.map((control, index) => (
              <div key={control.title} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">{control.title}</h3>
                <p className="text-gray-400 mb-4">{control.description}</p>
                <ol className="list-decimal list-inside text-gray-400 space-y-2">
                  {control.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Additional Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <div className="bg-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
            <div className="space-y-4 text-gray-400">
              <p>
                Our cookies help us: 
                Remember your settings, 
                Improve our services, 
                Offer you a better experience.
              </p>
              <p>
                We do not use cookies to: 
                Collect personally identifiable information without your consent, 
                Pass personally identifiable data to third parties.
              </p>
              <p>
                If you have any questions about our use of cookies, please contact our support team.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-gray-800 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-6">Questions About Cookies?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            If you have any questions about our cookie policy or how we use cookies,
            please contact our support team for clarification.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              Contact Support
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Back to Top
            </button>
          </div>
        </motion.section>
      </div>
    </main>
  )
} 