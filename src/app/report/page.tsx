'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const reportTypes = [
  {
    id: 'content',
    label: 'Content Violation',
    description: 'Report content that violates our community guidelines',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    subTypes: [
      'Hate speech or harassment',
      'Spam or misleading content',
      'Copyright infringement',
      'Inappropriate material',
      'Violence or threats',
      'Other content violation'
    ]
  },
  {
    id: 'user',
    label: 'User Behavior',
    description: 'Report inappropriate user behavior or conduct',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    subTypes: [
      'Harassment or bullying',
      'Impersonation',
      'Spam account',
      'Threatening behavior',
      'Privacy violation',
      'Other user violation'
    ]
  },
  {
    id: 'technical',
    label: 'Technical Issue',
    description: 'Report bugs, errors, or technical problems',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    ),
    subTypes: [
      'Page loading error',
      'Feature malfunction',
      'Display problem',
      'Performance issue',
      'Mobile app issue',
      'Other technical issue'
    ]
  },
  {
    id: 'privacy',
    label: 'Privacy Concern',
    description: 'Report privacy violations or data protection issues',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    subTypes: [
      'Unauthorized data sharing',
      'Privacy policy violation',
      'Personal information misuse',
      'Data protection issue',
      'Cookie policy violation',
      'Other privacy concern'
    ]
  }
]

export default function ReportPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [subType, setSubType] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [files, setFiles] = useState<FileList | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedType || !subType || !description) {
      setErrorMessage('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Here you would typically send the report data to your backend
      const formData = new FormData()
      formData.append('type', selectedType)
      formData.append('subType', subType)
      formData.append('description', description)
      formData.append('url', url)
      if (files) {
        Array.from(files).forEach(file => {
          formData.append('files', file)
        })
      }

      // const response = await fetch('/api/reports', {
      //   method: 'POST',
      //   body: formData
      // })
      
      setSubmitStatus('success')
      setSelectedType(null)
      setSubType('')
      setDescription('')
      setUrl('')
      setFiles(null)
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Failed to submit report. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedTypeData = reportTypes.find(type => type.id === selectedType)

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Submit a Report
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Help us maintain a safe and positive community by reporting issues.
          </motion.p>
        </div>

        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl p-8 text-center"
          >
            <svg
              className="w-16 h-16 text-green-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold mb-4">Report Submitted Successfully</h2>
            <p className="text-gray-400 mb-6">
              Thank you for helping keep our community safe. We'll review your report and take appropriate action.
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Another Report
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-gray-800 rounded-xl p-8"
          >
            {/* Report Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-start gap-4
                    ${selectedType === type.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                    }`}
                >
                  <div className="text-blue-500">{type.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-1">{type.label}</h3>
                    <p className="text-sm text-gray-400">{type.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {selectedType && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-6"
              >
                {/* Sub-type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What type of {selectedTypeData?.label.toLowerCase()} are you reporting?
                  </label>
                  <select
                    value={subType}
                    onChange={(e) => setSubType(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                             focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    {selectedTypeData?.subTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* URL Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL (if applicable)
                  </label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                             placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Please provide details about the issue..."
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                             placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Attachments (optional)
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-700 text-gray-400 rounded-lg
                                    border-2 border-gray-600 border-dashed cursor-pointer hover:border-blue-500 transition-colors">
                      <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm">
                        {files ? `${files.length} file(s) selected` : 'Drop files here or click to upload'}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => setFiles(e.target.files)}
                      />
                    </label>
                  </div>
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <p className="text-error-500 text-sm">{errorMessage}</p>
                )}

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                  <Link
                    href="/help/reporting"
                    className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition
                             disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </>
                    ) : 'Submit Report'}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.form>
        )}
      </div>
    </main>
  )
} 