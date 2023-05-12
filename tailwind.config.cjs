/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			'sans': ['Nunito Sans'],
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
