import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Nunito', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        mood: {
          happy: "hsl(var(--mood-happy))",
          "happy-light": "hsl(var(--mood-happy-light))",
          "happy-glow": "hsl(var(--mood-happy-glow))",
          tired: "hsl(var(--mood-tired))",
          "tired-light": "hsl(var(--mood-tired-light))",
          "tired-glow": "hsl(var(--mood-tired-glow))",
          sick: "hsl(var(--mood-sick))",
          "sick-light": "hsl(var(--mood-sick-light))",
          "sick-glow": "hsl(var(--mood-sick-glow))",
          crying: "hsl(var(--mood-crying))",
          "crying-light": "hsl(var(--mood-crying-light))",
          "crying-glow": "hsl(var(--mood-crying-glow))",
        },
        pollutant: {
          pm25: "hsl(var(--pollutant-pm25))",
          pm10: "hsl(var(--pollutant-pm10))",
          no: "hsl(var(--pollutant-no))",
          no2: "hsl(var(--pollutant-no2))",
          nox: "hsl(var(--pollutant-nox))",
          nh3: "hsl(var(--pollutant-nh3))",
          co: "hsl(var(--pollutant-co))",
          so2: "hsl(var(--pollutant-so2))",
          o3: "hsl(var(--pollutant-o3))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
