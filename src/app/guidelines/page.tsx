'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const guidelines = [
  {
    title: 'Content Standards',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    rules: [
      {
        title: 'Original Content',
        description: 'All content must be original or properly attributed. Plagiarism is strictly prohibited.'
      },
      {
        title: 'Quality Standards',
        description: 'Content should be well-written, properly formatted, and free of major grammatical errors.'
      },
      {
        title: 'Appropriate Content',
        description: 'Content must be suitable for a general audience and free of explicit or offensive material.'
      },
      {
        title: 'Accurate Information',
        description: 'Ensure all facts and claims are accurate and can be verified from reliable sources.'
      }
    ]
  },
  {
    title: 'Community Rules',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    rules: [
      {
        title: 'Respectful Interaction',
        description: 'Treat all community members with respect. Harassment or hate speech will not be tolerated.'
      },
      {
        title: 'Constructive Feedback',
        description: 'Provide constructive and helpful feedback. Avoid personal attacks or unconstructive criticism.'
      },
      {
        title: 'No Spam',
        description: 'Do not post spam, excessive self-promotion, or irrelevant content.'
      },
      {
        title: 'Privacy',
        description: 'Respect others\' privacy. Do not share personal information without consent.'
      }
    ]
  },
  {
    title: 'Best Practices',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    rules: [
      {
        title: 'Clear Writing',
        description: 'Use clear, concise language. Break up long paragraphs and use headers for organization.'
      },
      {
        title: 'Engaging Content',
        description: 'Create engaging and valuable content that serves your readers\' interests and needs.'
      },
      {
        title: 'Regular Updates',
        description: 'Maintain an active presence by posting regularly and engaging with your audience.'
      },
      {
        title: 'Proper Attribution',
        description: 'Always credit sources, images, and quotes appropriately.'
      }
    ]
  }
]

const violations = [
  {
    level: 'Minor',
    consequences: 'Warning and content removal',
    examples: ['Unintentional formatting issues', 'Minor attribution errors', 'Occasional self-promotion']
  },
  {
    level: 'Moderate',
    consequences: 'Temporary suspension (1-7 days)',
    examples: ['Repeated minor violations', 'Intentional misinformation', 'Harassment']
  },
  {
    level: 'Severe',
    consequences: 'Permanent account suspension',
    examples: ['Hate speech', 'Plagiarism', 'Malicious behavior', 'Illegal content']
  }
]

export default function GuidelinesPage() {
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
            Community Guidelines
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Our guidelines ensure a positive and enriching experience for all members of our community.
            Please read and follow these guidelines to maintain a respectful and productive environment.
          </motion.p>
        </div>

        {/* Guidelines Sections */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {guidelines.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <div className="space-y-6">
                  {section.rules.map((rule) => (
                    <div key={rule.title}>
                      <h3 className="text-lg font-semibold mb-2 text-blue-400">{rule.title}</h3>
                      <p className="text-gray-400">{rule.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Violations and Consequences */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8">Violations and Consequences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {violations.map((violation) => (
              <div key={violation.level} className="bg-gray-800 rounded-xl p-6">
                <h3 className={`text-xl font-bold mb-3 ${
                  violation.level === 'Minor' ? 'text-yellow-500' :
                  violation.level === 'Moderate' ? 'text-orange-500' :
                  'text-red-500'
                }`}>
                  {violation.level} Violations
                </h3>
                <p className="text-gray-400 mb-4">{violation.consequences}</p>
                <ul className="list-disc list-inside text-gray-400">
                  {violation.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Report Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-gray-800 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-6">Report a Violation</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            If you encounter content or behavior that violates our guidelines, please report it immediately.
            We take all reports seriously and will investigate thoroughly.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/help/reporting" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              Learn How to Report
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