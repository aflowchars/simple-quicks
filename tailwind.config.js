/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [require('flowbite/plugin')],
	theme: {
		extend: {
			fontFamily: {
				lato: ['Lato', 'sans-serif']
			},
			colors: {
				primary: {
					'2f80ed': '#2f80ed',
					'4f4f4f': '#4f4f4f',
					828282: '#828282',
					e0e0e0: '#e0e0e0'
				},
				indicator: {
					f8b76b: '#f8b76b',
					'8785ff': '#8785ff',
					eb5757: '#eb5757',
					f2c94c: '#f2c94c'
				},
				chats: {
					fceed3: '#fceed3',
					e5a443: '#e5a443',
					eedcff: '#eedcff',
					'9b51e0': '#9b51e0',
					d2f2ea: '#d2f2ea',
					'43b78d': '#43b78d'
				},
				stickers: {
					e9f3ff: '#e9f3ff',
					fdcfa4: '#fdcfa4',
					f9e9c3: '#f9e9c3',
					afebdb: '#afebdb',
					cbf1c2: '#cbf1c2',
					cfcef9: '#cfcef9',
					f9e0fd: '#f9e0fd'
				}
			}
		}
	},
	plugins: []
};
