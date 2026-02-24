/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0a0b0f',
        'deep-navy': '#0d1117',
        'navy-light': '#161b27',
        amber: {
          glow: '#f59e0b',
          soft: '#fbbf24',
          pale: '#fef3c7',
        },
        slate: {
          prose: '#94a3b8',
          dim: '#64748b',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-crimson)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'wave-slow': 'wave 8s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0px) scaleX(1)' },
          '50%': { transform: 'translateY(-8px) scaleX(1.02)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
