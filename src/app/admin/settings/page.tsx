'use client'

import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { motion } from 'framer-motion'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    general: {
      siteName: 'BlogApp',
      siteDescription: 'Share Your Stories',
      language: 'en',
      timezone: 'UTC',
    },
    appearance: {
      theme: 'dark',
      primaryColor: '#3b82f6',
      fontFamily: 'Inter',
      enableAnimations: true,
    },
    content: {
      postsPerPage: 10,
      excerptLength: 150,
      enableComments: true,
      moderateComments: true,
    },
    email: {
      notifyOnComments: true,
      notifyOnMentions: true,
      digestFrequency: 'daily',
      emailTemplate: 'default',
    },
    social: {
      twitter: '',
      facebook: '',
      linkedin: '',
      github: '',
    },
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (!response.ok) {
        throw new Error('Failed to save settings')
      }

      // Show success message
    } catch (error) {
      // Show error message
      console.error('Failed to save settings:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  return (
    <AdminLayout currentPage="Settings">
      {/* Tabs */}
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        {Object.keys(settings).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize whitespace-nowrap ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            } transition-colors`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Settings Form */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1e1e1e] rounded-xl border border-gray-800 p-6"
      >
        <div className="space-y-6">
          {Object.entries(settings[activeTab as keyof typeof settings]).map(([field, value]) => (
            <div key={field} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-400 capitalize">
                {field.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </label>
              {typeof value === 'boolean' ? (
                <div className="md:col-span-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleChange(activeTab, field, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ) : typeof value === 'number' ? (
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleChange(activeTab, field, parseInt(e.target.value))}
                  className="md:col-span-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(activeTab, field, e.target.value)}
                  className="md:col-span-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </AdminLayout>
  )
} 