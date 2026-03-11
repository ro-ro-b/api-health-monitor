import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#0F766E',
        background: '#F8FAFC',
        foreground: '#0F172A',
        muted: '#E2E8F0',
        accent: '#7C3AED',
        destructive: '#DC2626',
        success: '#16A34A',
        warning: '#D97706',
        border: '#CBD5E1',
        chartHealthyLight: '#22C55E',
        chartHealthyDark: '#4ADE80',
        chartDegradedLight: '#F59E0B',
        chartDegradedDark: '#FBBF24',
        chartDownLight: '#EF4444',
        chartDownDark: '#F87171',
        chartLatencyLight: '#3B82F6',
        chartLatencyDark: '#60A5FA',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.75rem',
        lg: '0.5rem',
        md: '0.375rem',
      },
    },
  },
  plugins: [],
};

export default config;
