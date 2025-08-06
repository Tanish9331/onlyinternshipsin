import React from 'react';
import { 
  validatePassword, 
  getPasswordStrengthColor, 
  getPasswordStrengthText
} from '../../utils/passwordValidation';
import { FaCheck, FaTimes } from 'react-icons/fa';

const PasswordStrengthIndicator = ({ password, showRequirements = true }) => {
  if (!password) return null;

  const validation = validatePassword(password);
  const strengthColor = getPasswordStrengthColor(validation.strength);
  const strengthText = getPasswordStrengthText(validation.strength);

  const requirementStatus = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numeric: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password)
  };

  return (
    <div className="mt-2 space-y-3">
      {/* Password Strength Bar */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Password Strength:</span>
          <span className={`text-sm font-semibold ${strengthColor}`}>
            {strengthText}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              validation.strength === 'weak' ? 'bg-red-500 w-1/4' :
              validation.strength === 'fair' ? 'bg-orange-500 w-1/2' :
              validation.strength === 'good' ? 'bg-yellow-500 w-3/4' :
              'bg-green-500 w-full'
            }`}
          />
        </div>
      </div>

      {/* Requirements List */}
      {showRequirements && (
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Requirements:
          </h4>
          <ul className="space-y-1">
            <RequirementItem 
              met={requirementStatus.length}
              text={`At least 6 characters (${password.length}/6)`}
            />
            <RequirementItem 
              met={requirementStatus.uppercase}
              text="Uppercase letter (A-Z)"
            />
            <RequirementItem 
              met={requirementStatus.lowercase}
              text="Lowercase letter (a-z)"
            />
            <RequirementItem 
              met={requirementStatus.numeric}
              text="Number (0-9)"
            />
            <RequirementItem 
              met={requirementStatus.special}
              text="Special character (!@#$%^&*()_+-=[]{}|;:,.<>?`~)"
            />
          </ul>
        </div>
      )}
    </div>
  );
};

const RequirementItem = ({ met, text }) => (
  <li className="flex items-center space-x-2">
    {met ? (
      <FaCheck className="h-3 w-3 text-green-500 flex-shrink-0" />
    ) : (
      <FaTimes className="h-3 w-3 text-red-500 flex-shrink-0" />
    )}
    <span className={`text-sm ${met ? 'text-green-700' : 'text-red-700'}`}>
      {text}
    </span>
  </li>
);

export default PasswordStrengthIndicator; 