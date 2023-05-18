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
				"rp-blue": "#1D2E5B",
				"rp-pink": "#EE4179",
				"rp-dull-pink": "#803b61"
			},
		}
	},
	plugins: []
};
