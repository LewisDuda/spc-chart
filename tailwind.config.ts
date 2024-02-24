import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			transparent: 'transparent',
			white: '#ffffff',
			gray: '#F1F0E8',
			primary: {
				background: '#96B6C5',
				text: '#3E444A',
			},
			secondary: {
				background: '#EEE0C9',
				text: '#4C6973',
			},
			danger: {
				background: '#8C3B3B',
				text: '#ffffff',
			},
			success: {
				background: '#A1C49C',
				text: '#333333',
			},
			information: {
				background: '#B3A8C4',
				text: '#000066',
			},
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [],
};
export default config;
