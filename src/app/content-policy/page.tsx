'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const contentGuidelines = [
  {
    title: 'Quality Standards',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    rules: [
      'Content must be original or properly attributed',
      'Clear and coherent writing style',
      'Proper formatting and structure',
      'Accurate and fact-checked information'
    ]
  },
  {
    title: 'Ethical Standards',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
      </svg>
    ),
    rules: [
      'Respect intellectual property rights',
      'Maintain user privacy',
      'Avoid plagiarism',
      'Disclose sponsored content'
    ]
  },
  {
    title: 'Community Standards',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    rules: [
      'Respectful communication',
      'Inclusive language',
      'Constructive discussions',
      'No harassment or bullying'
    ]
  }
]

const prohibitedContent = [
  {
    category: 'Harmful Content',
    examples: [
      'Hate speech or discrimination',
      'Threats or incitement to violence',
      'Harassment or bullying',
      'Explicit or graphic violence'
    ],
    severity: 'high'
  },
  {
    category: 'Illegal Content',
    examples: [
      'Copyright infringement',
      'Illegal goods or services',
      'Fraudulent schemes',
      'Personal data exploitation'
    ],
    severity: 'high'
  },
  {
    category: 'Misleading Content',
    examples: [
      'False or unverified information',
      'Deceptive practices',
      'Impersonation',
      'Manipulated media'
    ],
    severity: 'medium'
  },
  {
    category: 'Spam Content',
    examples: [
      'Excessive self-promotion',
      'Repetitive content',
      'Irrelevant links',
      'Automated posting'
    ],
    severity: 'low'
  }
]

const moderationProcedures = [
  {
    title: 'Content Review',
    description: 'Our moderation team reviews reported content within 24 hours.',
    steps: [
      'Initial assessment of reported content',
      'Review against content policies',
      'Determination of violation severity',
      'Action decision and implementation'
    ]
  },
  {
    title: 'User Appeals',
    description: 'Users can appeal content moderation decisions through our appeal process.',
    steps: [
      'Submit appeal request',
      'Provide additional context',
      'Secondary review by senior moderator',
      'Final decision communication'
    ]
  },
  {
    title: 'Account Actions',
    description: 'Violations may result in various account actions based on severity and frequency.',
    steps: [
      'Warning notification',
      'Temporary restrictions',
      'Content removal',
      'Account suspension'
    ]
  }
]

export default function ContentPolicyPage() {
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
            Content Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Our content policy ensures a safe, respectful, and high-quality environment for all users.
            Please review these guidelines carefully.
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

        {/* Content Guidelines */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Content Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contentGuidelines.map((guideline, index) => (
              <motion.div
                key={guideline.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
                    {guideline.icon}
                  </div>
                  <h3 className="text-xl font-bold">{guideline.title}</h3>
                </div>
                <ul className="space-y-3">
                  {guideline.rules.map((rule) => (
                    <li key={rule} className="flex items-start gap-2 text-gray-400">
                      <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                      </svg>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Prohibited Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8">Prohibited Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {prohibitedContent.map((category) => (
              <div 
                key={category.category} 
                className="bg-gray-800 rounded-xl p-6 border-l-4 border-opacity-50"
                style={{
                  borderColor: category.severity === 'high' ? '#ef4444' : 
                             category.severity === 'medium' ? '#f59e0b' : '#3b82f6'
                }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  {category.category}
                  <span className={`text-xs px-2 py-1 rounded ${
                    category.severity === 'high' ? 'bg-red-500/10 text-red-400' :
                    category.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-blue-500/10 text-blue-400'
                  }`}>
                    {category.severity.charAt(0).toUpperCase() + category.severity.slice(1)} Severity
                  </span>
                </h3>
                <ul className="space-y-2">
                  {category.examples.map((example) => (
                    <li key={example} className="flex items-center gap-2 text-gray-400">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Moderation Procedures */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8">Moderation Procedures</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {moderationProcedures.map((procedure, index) => (
              <div key={procedure.title} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">{procedure.title}</h3>
                <p className="text-gray-400 mb-4">{procedure.description}</p>
                <ol className="list-decimal list-inside text-gray-400 space-y-2">
                  {procedure.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-gray-800 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-6">Questions or Concerns?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            If you have questions about our content policy or need to report a violation,
            please contact our moderation team.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              Contact Moderation Team
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/help/reporting" 
              className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Report Content
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  )
} 