import bcrypt from 'bcryptjs'

export function generateRandomPassword(length: number = 8): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''
  
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  
  return password
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12)
  return bcrypt.hash(password, salt)
}

export function formatCurrency(amount: number, currency: string = 'SAR'): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}
