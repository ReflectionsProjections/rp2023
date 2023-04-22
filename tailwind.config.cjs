/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			'sans': ['Roboto'],
			'serif': ['Roboto\\ Slab']
		},
		extend: {
			colors: {
				"rp-blue": "#1D2E5B"
			},
		}
	},
	plugins: []
};
