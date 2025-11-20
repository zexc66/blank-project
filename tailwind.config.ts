import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#2E7D32',
          gold: '#F9A825',
          orange: '#FF6F00',
          blue: '#1976D2',
        },
        neutral: {
          900: '#1A1A1A',
          700: '#4A4A4A',
          500: '#6B7280',
          300: '#D1D5DB',
          100: '#F3F4F6',
          50: '#F9FAFB',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        heading: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config