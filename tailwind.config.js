/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                orbitron: ['Orbitron', 'sans-serif'],
            },
            colors: {
                'sol-purple': '#9945FF',
                'sol-green': '#14F195',
                'sol-yellow': '#FFB800',
                'dark-blue': '#08081E',
                'dark-blue-light': '#0A0A25',
            }
        },
    },
    plugins: [],
}