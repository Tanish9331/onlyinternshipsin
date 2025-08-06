// Password validation utility that matches Firebase password policy requirements
// Based on Firebase password policy: uppercase, lowercase, special character, numeric, min 6 chars, max 4096 chars

export const PASSWORD_REQUIREMENTS = {
  minLength: 6,
  maxLength: 4096,
  requireUppercase: true,
  requireLowercase: true,
  requireSpecial: true,
  requireNumeric: true
};

// Comprehensive special character regex that matches Firebase requirements
const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/;

export const validatePassword = (password) => {
  const errors = [];
  const warnings = [];

  // Check minimum length
  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(`Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long`);
  }

  // Check maximum length
  if (password.length > PASSWORD_REQUIREMENTS.maxLength) {
    errors.push(`Password must be no more than ${PASSWORD_REQUIREMENTS.maxLength} characters long`);
  }

  // Check for uppercase character
  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter (A-Z)');
  }

  // Check for lowercase character
  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter (a-z)');
  }

  // Check for numeric character
  if (PASSWORD_REQUIREMENTS.requireNumeric && !/\d/.test(password)) {
    errors.push('Password must contain at least one number (0-9)');
  }

  // Check for special character
  if (PASSWORD_REQUIREMENTS.requireSpecial && !SPECIAL_CHAR_REGEX.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?`~)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    strength: calculatePasswordStrength(password)
  };
};

export const calculatePasswordStrength = (password) => {
  let score = 0;
  
  // Length contribution
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  // Character variety contribution
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (SPECIAL_CHAR_REGEX.test(password)) score += 1;
  
  // Bonus for mixed case and numbers
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password) && /[a-zA-Z]/.test(password)) score += 1;
  
  // Penalty for common patterns
  if (/(.)\1{2,}/.test(password)) score -= 1; // Repeated characters
  if (/123|abc|qwe|password|123456/i.test(password)) score -= 2; // Common sequences
  
  // Normalize score to 0-100
  const normalizedScore = Math.max(0, Math.min(100, (score / 8) * 100));
  
  if (normalizedScore < 25) return 'weak';
  if (normalizedScore < 50) return 'fair';
  if (normalizedScore < 75) return 'good';
  return 'strong';
};

export const getPasswordStrengthColor = (strength) => {
  switch (strength) {
    case 'weak': return 'text-red-500';
    case 'fair': return 'text-orange-500';
    case 'good': return 'text-yellow-500';
    case 'strong': return 'text-green-500';
    default: return 'text-gray-500';
  }
};

export const getPasswordStrengthText = (strength) => {
  switch (strength) {
    case 'weak': return 'Weak';
    case 'fair': return 'Fair';
    case 'good': return 'Good';
    case 'strong': return 'Strong';
    default: return 'Very Weak';
  }
};

export const formatPasswordRequirements = () => {
  return [
    `At least ${PASSWORD_REQUIREMENTS.minLength} characters long`,
    'One uppercase letter (A-Z)',
    'One lowercase letter (a-z)',
    'One number (0-9)',
    'One special character (!@#$%^&*()_+-=[]{}|;:,.<>?`~)'
  ];
}; 