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
  safelist: [
    "bg-inherit",
    "bg-red-300",
    "bg-blue-300",
    "bg-yellow-100",
    "px-0", "px-1", "px-2", "px-3", "px-4", "px-5", "px-6",
    "py-0", "py-1", "py-2", "py-3", "py-4", "py-5", "py-6",
	...Array.from({ length: 9 }, (_, i) => `gap-${i}`),
	"flex",
	"flex-col",
	 // Width
	 "w-0", "w-1", "w-2", "w-3", "w-4", "w-5", "w-6",
	 "w-8", "w-10", "w-16", "w-24", "w-32", "w-40", "w-48", "w-56", "w-64", "w-full",
	 "gap-0", "gap-1", "gap-2", "gap-3", "gap-4", "gap-5", "gap-6", "gap-7", "gap-8", "gap-9",
	 "space-y-0",
	 "space-y-1",
	 "space-y-2",
	 "space-y-3",
	 "space-y-4",
	 "space-y-5",
	 "space-y-6",
	 "space-y-7",
	 "space-y-8",
   
	 "sm:space-y-0",
	 "sm:space-y-1",
	 "sm:space-y-2",
	 "sm:space-y-3",
	 "sm:space-y-4",
	 "sm:space-y-5",
	 "sm:space-y-6",
	 "sm:space-y-7",
	 "sm:space-y-8",
   
	 "md:space-y-0",
	 "md:space-y-1",
	 "md:space-y-2",
	 "md:space-y-3",
	 "md:space-y-4",
	 "md:space-y-5",
	 "md:space-y-6",
	 "md:space-y-7",
	 "md:space-y-8",
   
	 "lg:space-y-0",
	 "lg:space-y-1",
	 "lg:space-y-2",
	 "lg:space-y-3",
	 "lg:space-y-4",
	 "lg:space-y-5",
	 "lg:space-y-6",
	 "lg:space-y-7",
	 "lg:space-y-8",
	 // Height
	 "h-0", "h-1", "h-2", "h-3", "h-4", "h-5", "h-6",
	 "h-8", "h-10", "h-16", "h-24", "h-32", "h-40", "h-48", "h-56", "h-64", "h-full",
	  "mt-0", "mt-1", "mt-2", "mt-3", "mt-4", "mt-5", "mt-6", "mt-7", "mt-8",
  "mb-0", "mb-1", "mb-2", "mb-3", "mb-4", "mb-5", "mb-6", "mb-7", "mb-8",
    "border", "rounded-md", "shadow-md"
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
