import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

const config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
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
				kira: {
					red: '#FF5C5C',
					darkRed: '#E53E3E',
					lightRed: '#FFF0F0',
					pink: '#FF9EAA',
					purple: '#7667FC',
					blue: '#4DABF7',
					gradient1: '#FF5C5C',
					gradient2: '#FF9A8B',
					gradient3: '#FF6A88',
					gradient4: '#FF99AC',
					lilac: '#D6A4FF',
					pastel: '#FFF6F9',
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
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
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
				},
				'pulse-ring': {
					'0%': {
						transform: 'scale(0.95)',
						boxShadow: '0 0 0 0 rgba(255, 92, 92, 0.7)'
					},
					'70%': {
						transform: 'scale(1)',
						boxShadow: '0 0 0 15px rgba(255, 92, 92, 0)'
					},
					'100%': {
						transform: 'scale(0.95)',
						boxShadow: '0 0 0 0 rgba(255, 92, 92, 0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'zoom-in': {
					'0%': { transform: 'scale(0.95)' },
					'100%': { transform: 'scale(1)' }
				},
				'zoom-in-95': {
					'0%': { transform: 'scale(0.95)' },
					'100%': { transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'float': 'float 3s ease-in-out infinite',
				'fade-in': 'fade-in 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				'zoom-in': 'zoom-in 300ms cubic-bezier(0.16, 1, 0.3, 1)',
				'zoom-in-95': 'zoom-in-95 300ms cubic-bezier(0.16, 1, 0.3, 1)',
				'in': 'fade-in 300ms ease-out, zoom-in-95 300ms ease-out'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-main': 'linear-gradient(to right, #FF5C5C, #FF99AC)',
				'gradient-card': 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
				'gradient-button': 'linear-gradient(to right, #FF6A88, #FF99AC)',
				'gradient-modern': 'linear-gradient(120deg, #FFF6F9 0%, #FFF0F8 35%, #F9F0FF 75%, #F5F5FF 100%)',
				'gradient-modern-2': 'radial-gradient(circle at top right, rgba(214, 164, 255, 0.08) 0%, rgba(255, 158, 170, 0.05) 35%, rgba(255, 246, 249, 0.02) 100%)',
				'gradient-glassmorphism': 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%)',
				'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(344, 100%, 95%, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(270, 100%, 90%, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(350, 100%, 80%, 0.1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(280, 100%, 80%, 0.05) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(350, 100%, 95%, 0.1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(240, 100%, 90%, 0.05) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(340, 100%, 95%, 0.15) 0px, transparent 50%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate"), typography],
} satisfies Config;

export default config;
