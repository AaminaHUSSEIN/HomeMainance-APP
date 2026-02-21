// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('so-SO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Format currency
export const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`
}

// Truncate text
export const truncateText = (text, maxLength) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

// Get initials from name
export const getInitials = (name) => {
  if (!name) return ''
  const names = name.split(' ')
  return names.map(n => n[0]).join('').toUpperCase()
}

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Debounce function
export const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}