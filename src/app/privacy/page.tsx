'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const privacyContent = [
  {
    title: 'Information We Collect',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    sections: [
      {
        subtitle: 'Account Information',
        content: 'Name, email address, username, and password when you create an account.'
      },
      {
        subtitle: 'Profile Information',
        content: 'Bio, profile picture, and any other information you choose to provide.'
      },
      {
        subtitle: 'Content Data',
        content: 'Blog posts, comments, likes, and other interactions you make on the platform.'
      },
      {
        subtitle: 'Usage Data',
        content: 'IP address, browser type, device information, and interaction with our services.'
      }
    ]
  },
  {
    title: 'How We Use Your Data',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    sections: [
      {
        subtitle: 'Service Provision',
        content: 'To provide, maintain, and improve our platform and services.'
      },
      {
        subtitle: 'Communication',
        content: 'To send you updates, newsletters, and important notifications.'
      },
      {
        subtitle: 'Analytics',
        content: 'To analyze usage patterns and improve user experience.'
      },
      {
        subtitle: 'Security',
        content: 'To detect and prevent fraud, abuse, and security breaches.'
      }
    ]
  },
  {
    title: 'Data Protection',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    sections: [
      {
        subtitle: 'Data Security',
        content: 'We implement industry-standard security measures to protect your data.'
      },
      {
        subtitle: 'Data Retention',
        content: 'We retain your data only as long as necessary for service provision.'
      },
      {
        subtitle: 'Third-Party Access',
        content: 'We never sell your personal data to third parties.'
      },
      {
        subtitle: 'Data Encryption',
        content: 'All sensitive data is encrypted in transit and at rest.'
      }
    ]
  }
]

const userRights = [
  {
    title: 'Access Your Data',
    description: 'Request a copy of all personal data we hold about you.'
  },
  {
    title: 'Correct Your Data',
    description: 'Update or correct any inaccurate information in your profile.'
  },
  {
    title: 'Delete Your Data',
    description: 'Request deletion of your personal data (right to be forgotten).'
  },
  {
    title: 'Data Portability',
    description: 'Receive your data in a structured, commonly used format.'
  },
  {
    title: 'Withdraw Consent',
    description: 'Withdraw your consent for data processing at any time.'
  },
  {
    title: 'Object to Processing',
    description: 'Object to processing of your personal data for specific purposes.'
  }
]

const cookieTypes = [
  {
    name: 'Essential Cookies',
    description: 'Required for basic site functionality and security.',
    required: true
  },
  {
    name: 'Functional Cookies',
    description: 'Enable enhanced functionality and personalization.',
    required: false
  },
  {
    name: 'Analytics Cookies',
    description: 'Help us understand how visitors interact with our site.',
    required: false
  },
  {
    name: 'Marketing Cookies',
    description: 'Used to track visitors across websites for marketing purposes.',
    required: false
  }
]

export default function PrivacyPage() {
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
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            We are committed to protecting your privacy and ensuring the security of your personal information.
            This policy explains how we collect, use, and protect your data.
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

        {/* Main Content Sections */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {privacyContent.map((section, index) => (
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
                  {section.sections.map((subsection) => (
                    <div key={subsection.subtitle}>
                      <h3 className="text-lg font-semibold mb-2 text-blue-400">{subsection.subtitle}</h3>
                      <p className="text-gray-400">{subsection.content}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Your Rights Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8">Your Privacy Rights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRights.map((right) => (
              <div key={right.title} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-400">{right.title}</h3>
                <p className="text-gray-400">{right.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Cookie Policy Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8">Cookie Policy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cookieTypes.map((cookie) => (
              <div key={cookie.name} className="bg-gray-800 rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-blue-400">{cookie.name}</h3>
                  {cookie.required && (
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-gray-400">{cookie.description}</p>
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
          <h2 className="text-3xl font-bold mb-6">Questions About Privacy?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            If you have any questions about our privacy policy or how we handle your data,
            please don't hesitate to contact our privacy team.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              Contact Privacy Team
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/help/privacy-faq" 
              className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Privacy FAQ
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  )
} 