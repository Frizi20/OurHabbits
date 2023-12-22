/** @type {import('tailwindcss').Config} */

import scrollbar from 'tailwind-scrollbar';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'custom-gray': '#eff6ff',
                'custom-purple-100': 'var(--custom-purple-100)',
                'custom-purple-hover-100': 'var(--custom-purple-hover-100)',
            },
            animation: {
                'bounce-custom': 'bounce 1.3s cubic-bezier(0, 0, 1, 1) infinite',
            },
            keyframes:{
              bounce: {
                '0%': {transform:'translateY(0)'},
                '50%': {transform:'translateY(-7px)'},
                '100%': {transform:'translateY(0)'},
              }
            }
        },
    },
    plugins: [scrollbar({ nocompatible: true })],
};
