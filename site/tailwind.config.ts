import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
export default {
    content: ["./app/**/*.{ts,tsx,jsx,js}"],
    theme: {
        extend: {
            fontFamily: {
                // Satoshi
                sans: ["Satoshi-Variable", ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                // "4.5xl": ["40px", "54px"],
                xss: ["10px", "110%"],
                // "5xl": "2.5rem",
            },
        },
    },
    plugins: [],
} satisfies Config;
