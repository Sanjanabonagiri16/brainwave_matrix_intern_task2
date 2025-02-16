'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const termsContent = [
  {
    title: 'User Agreement',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    sections: [
      {
        subtitle: 'Account Requirements',
        content: 'Users must be at least 13 years old and provide accurate information when creating an account.'
      },
      {
        subtitle: 'Account Responsibility',
        content: 'Users are responsible for maintaining the security of their account and all activities under their account.'
      },
      {
        subtitle: 'Account Termination',
        content: 'We reserve the right to terminate or suspend accounts that violate our terms or policies.'
      },
      {
        subtitle: 'Communication Preferences',
        content: 'Users may receive service-related communications, with options to manage notification preferences.'
      }
    ]
  },
  {
    title: 'Content Policies',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    sections: [
      {
        subtitle: 'Content Ownership',
        content: 'Users retain ownership of their content while granting us a license to display and distribute it on our platform.'
      },
      {
        subtitle: 'Content Restrictions',
        content: 'Content must not violate any laws, infringe on rights, or contain prohibited material.'
      },
      {
        subtitle: 'Content Removal',
        content: 'We reserve the right to remove content that violates our policies or terms of service.'
      },
      {
        subtitle: 'Content License',
        content: 'By posting content, users grant us a worldwide, non-exclusive, royalty-free license to use their content.'
      }
    ]
  },
  {
    title: 'Platform Rules',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    sections: [
      {
        subtitle: 'Fair Usage',
        content: 'Users must not abuse platform resources or attempt to circumvent platform limitations.'
      },
      {
        subtitle: 'Service Modifications',
        content: 'We may modify, suspend, or discontinue services at any time with or without notice.'
      },
      {
        subtitle: 'Third-Party Services',
        content: 'Users acknowledge that third-party services integrated with our platform have their own terms.'
      },
      {
        subtitle: 'API Usage',
        content: 'API access must comply with our rate limits and usage guidelines.'
      }
    ]
  }
]

const prohibitedActivities = [
  {
    title: 'Illegal Activities',
    description: 'Any activities that violate applicable laws or regulations.'
  },
  {
    title: 'Harassment',
    description: 'Harassment, bullying, or intimidation of other users.'
  },
  {
    title: 'Impersonation',
    description: 'Impersonating others or providing false information.'
  },
  {
    title: 'Data Mining',
    description: 'Unauthorized data mining, scraping, or harvesting of content.'
  },
  {
    title: 'Malicious Code',
    description: 'Uploading malware, viruses, or other malicious code.'
  },
  {
    title: 'System Interference',
    description: 'Interfering with or disrupting platform services or servers.'
  }
]

const legalDisclosures = [
  {
    title: 'Warranty Disclaimer',
    content: 'Services are provided "as is" without any warranties, express or implied.'
  },
  {
    title: 'Limitation of Liability',
    content: 'We are not liable for any indirect, incidental, or consequential damages.'
  },
  {
    title: 'Indemnification',
    content: 'Users agree to indemnify and hold us harmless from any claims or damages.'
  },
  {
    title: 'Governing Law',
    content: 'These terms are governed by applicable laws, without regard to conflicts of law principles.'
  }
]

export default function TermsPage() {
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
            Terms of Service
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Please read these terms carefully before using our platform.
            By using our services, you agree to be bound by these terms.
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
            {termsContent.map((section, index) => (
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

        {/* Prohibited Activities */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8">Prohibited Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prohibitedActivities.map((activity) => (
              <div key={activity.title} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-red-400">{activity.title}</h3>
                <p className="text-gray-400">{activity.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Legal Disclosures */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8">Legal Disclosures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legalDisclosures.map((disclosure) => (
              <div key={disclosure.title} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-400">{disclosure.title}</h3>
                <p className="text-gray-400">{disclosure.content}</p>
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
          <h2 className="text-3xl font-bold mb-6">Questions About Terms?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            If you have any questions about our terms of service,
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
            <Link 
              href="/help/terms-faq" 
              className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Terms FAQ
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  )
} 