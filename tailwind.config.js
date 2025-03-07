/** @type {import('tailwindcss').Config} */
// import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssDebugScreens from "tailwindcss-debug-screens";
import tailwindcssNoScrollbar from "tailwindcss-no-scrollbar";
import tailwindScrollbar from "tailwind-scrollbar";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx,tsx,ts}",
    "./components/**/*.{js,jsx,tsx,ts}",
    "./app/**/*.{js,jsx,tsx,ts}",
    "./src/**/*.{js,jsx,tsx,ts}",
	'./src/**/*.{js,jsx,ts,tsx,html}'
  ],
  prefix: "",
  theme: {
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			textMain: 'var(--mainText)',
  			textSec: 'var(--secColor)',
  			textSoft: 'var(--colorSoft)',
  			textGray: 'var(--gray)',
  			textHardSoft: 'var( --hardSoftColor)',
  			textGreen: 'var( --green)',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			wave: {
  				'0%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'scale(2)',
  					opacity: '0'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		backgroundColor: {
  			bg: 'var(--mainColor)',
  			softBg: 'var(--softColor)',
  			bgSoft: 'var(--colorSoft)',
  			bgGray: 'var(--gray)',
  			bgGraySoft: 'var(--graySoft)',
  			bgPrimaryVariant: 'var(--primaryVariant)',
  			bgHardSoft: 'var( --hardSoftColor)',
  			bgGreen: 'var( --green)'
  		},
  		animation: {
  			wave: 'wave 1.5s infinite ease-in-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		backgroundImage: {
  			'custom-gradient': 'linear-gradient(220.66deg, #F0DFFF -11.2%, #FFFFFF 100.09%)'
  		}
  	}
  },
  plugins: [
    tailwindcssAnimate,
	tailwindcssAnimate,
    tailwindcssDebugScreens,
    tailwindcssNoScrollbar,
    tailwindScrollbar,
    // require("tailwindcss-debug-screens"),
    // require("tailwindcss-no-scrollbar"),
    // require("tailwind-scrollbar"),
  ],
};

export default config;
