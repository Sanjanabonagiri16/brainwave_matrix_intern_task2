import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import ConditionalFooter from '@/components/ConditionalFooter'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'BlogApp - Share Your Stories',
  description: 'Create, publish, and engage with a community of passionate writers and readers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-background-light dark:bg-background-dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-sans text-gray-600 dark:text-gray-300 flex flex-col bg-background-light dark:bg-background-dark">
        <ThemeProvider>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow bg-background-light dark:bg-background-dark">
                <div className="pt-16">
                  <PageTransition>
                    {children}
                  </PageTransition>
                </div>
              </main>
              <ConditionalFooter />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 