'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const reportingCategories = [
  {
    title: 'Content Violations',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    description: 'Report content that violates our community guidelines or terms of service.',
    steps: [
      'Click the "Report" button on the content (three dots menu)',
      'Select the violation type from the dropdown menu',
      'Provide additional details about the violation',
      'Submit the report for review'
    ],
    examples: [
      'Hate speech or harassment',
      'Spam or misleading content',
      'Copyright infringement',
      'Inappropriate material'
    ]
  },
  {
    title: 'User Behavior',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    description: 'Report users who are engaging in inappropriate or harmful behavior.',
    steps: [
      'Visit the user\'s profile page',
      'Click the "Report User" button',
      'Select the type of behavioral violation',
      'Provide evidence and context',
      'Submit the report'
    ],
    examples: [
      'Harassment or bullying',
      'Impersonation',
      'Spam accounts',
      'Threatening behavior'
    ]
  },
  {
    title: 'Technical Issues',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    ),
    description: 'Report bugs, errors, or technical problems you encounter on the platform.',
    steps: [
      'Click the "Help" button in the navigation',
      'Select "Report a Technical Issue"',
      'Choose the issue category',
      'Describe the problem in detail',
      'Include screenshots if applicable',
      'Submit the report'
    ],
    examples: [
      'Page loading errors',
      'Feature malfunctions',
      'Display problems',
      'Performance issues'
    ]
  },
  {
    title: 'Privacy Concerns',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    description: 'Report privacy violations or concerns about personal data handling.',
    steps: [
      'Visit the Privacy Center in your settings',
      'Click "Report a Privacy Concern"',
      'Select the type of privacy issue',
      'Provide details about the concern',
      'Submit the report for review'
    ],
    examples: [
      'Unauthorized data sharing',
      'Privacy policy violations',
      'Personal information misuse',
      'Data protection issues'
    ]
  }
]

const ReportingGuide = ({ category }: { category: typeof reportingCategories[0] }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
          {category.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold">{category.title}</h3>
          <p className="text-gray-400 text-sm">{category.description}</p>
        </div>
      </div>

      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden'}`}>
        <div>
          <h4 className="font-semibold mb-2 text-blue-400">How to Report:</h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            {category.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-blue-400">Examples:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-400">
            {category.examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
      >
        {isExpanded ? 'Show Less' : 'Learn More'}
        <svg
          className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </motion.div>
  )
}

export default function ReportingPage() {
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
            Reporting Guide
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Learn how to report content, users, or issues to help maintain a safe and positive community.
          </motion.p>
        </div>

        {/* Reporting Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {reportingCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ReportingGuide category={category} />
            </motion.div>
          ))}
        </div>

        {/* Quick Report Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-gray-800 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-6">Need to Make a Report?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            If you've encountered something that requires immediate attention, you can make a report directly through our reporting system.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/report" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              Submit a Report
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/help" 
              className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              View Help Center
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  )
} 