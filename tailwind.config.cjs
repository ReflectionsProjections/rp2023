/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Nunito'],
			serif: ['Roboto\\ Slab']
		},
		extend: {
			animation: {
				'bounce-once': 'bounce-once 1s'
			},
			keyframes: {
				'bounce-once': {
					'0%, 100%': {
						transform: 'none',
						'animation-timing-function': 'cubic-bezier(0.8,0,1,1)'
					},
					'50%': {
						transform: 'translateY(-25%)',
						'animation-timing-function': 'cubic-bezier(0,0,0.2,1)'
					}
				}
			},
			colors: {
				'rp-blue': '#1D2E5B',
				'rp-pink': '#EE4179',
				'rp-dull-pink': '#803b61',
				'rp-subtle-pink': '#E7A4BA',
				'rp-hot-pink': '#C71E5E',
				'rp-cream': '#F9EEEC'
			},
			gridTemplateColumns: {
				'16': 'repeat(16, minmax(0, 1fr))',
				'footer': '200px minmax(900px, 1fr) 100px'
			}
		}
	},
	variants: { // all the following default to ['responsive']
		imageRendering: ['responsive'],
	},
	plugins: [
		require('tailwindcss-image-rendering')(), // no options to configure
	],
};
