'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function ConditionalFooter() {
  const pathname = usePathname()
  
  // Only render footer on home page
  if (pathname === '/') {
    return <Footer />
  }
  
  return null
} 