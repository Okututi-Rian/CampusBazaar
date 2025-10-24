import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(price)
}

// ✅ FIXED VERSION: handles both Date and string inputs safely
export function formatDate(date: Date | string): string {
  const now = new Date()
  const parsedDate = typeof date === 'string' ? new Date(date) : date

  if (isNaN(parsedDate.getTime())) return 'Invalid date'

  const diffInSeconds = Math.floor((now.getTime() - parsedDate.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`

  return new Intl.DateTimeFormat('en-KE', {
    month: 'short',
    day: 'numeric',
    year: parsedDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  }).format(parsedDate)
}

export function generateUsername(firstName?: string, lastName?: string): string {
  const randomNum = Math.floor(Math.random() * 1000)
  
  if (firstName && lastName) {
    return `${firstName.toLowerCase()}_${lastName.toLowerCase()}${randomNum}`
  }
  
  if (firstName) {
    return `${firstName.toLowerCase()}${randomNum}`
  }
  
  return `user${randomNum}`
}

export function validatePhoneNumber(phone: string): boolean {
  // Kenyan phone number validation
  const kenyanPhoneRegex = /^(?:\+254|0)?7\d{8}$/
  return kenyanPhoneRegex.test(phone.replace(/\s/g, ''))
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.startsWith('254')) {
    return `+${cleaned}`
  }
  
  if (cleaned.startsWith('07')) {
    return `+254${cleaned.slice(1)}`
  }
  
  if (cleaned.startsWith('7')) {
    return `+254${cleaned}`
  }
  
  return phone
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
