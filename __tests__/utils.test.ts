// __tests__/utils.test.ts
/// <reference types="jest" />
import { formatDuration, calculateCreditsNeeded, maskEmail } from '@/utils/helpers';
import { validateEmail, validatePassword } from '@/utils/validators';

describe('Utility Functions', () => {
  describe('formatDuration', () => {
    test('should format seconds correctly', () => {
      expect(formatDuration(45)).toBe('45s');
      expect(formatDuration(120)).toBe('2m 0s');
      expect(formatDuration(3661)).toBe('1h 1m');
    });
  });

  describe('calculateCreditsNeeded', () => {
    test('should calculate credits correctly', () => {
      expect(calculateCreditsNeeded(60, 0.01)).toBe(0.01);
      expect(calculateCreditsNeeded(120, 0.01)).toBe(0.02);
    });
  });

  describe('maskEmail', () => {
    test('should mask email correctly', () => {
      const masked = maskEmail('test@example.com');
      expect(masked).toContain('@example.com');
      expect(masked).not.toContain('test@');
    });
  });

  describe('validateEmail', () => {
    test('should validate valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('should validate password strength', () => {
      const weak = validatePassword('weak');
      expect(weak.valid).toBe(false);
      expect(weak.errors.length).toBeGreaterThan(0);

      const strong = validatePassword('StrongPass123');
      expect(strong.valid).toBe(true);
    });
  });
});
