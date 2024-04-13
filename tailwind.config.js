/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom_violet: "#5964E0",
        custom_light_violet: "#939BF4",
        custom_very_dark_blue: "#19202D",
        custom_midnight: "#121721",
        custom_grey: "#9DAEC2",
        custom_light_grey: "#F4F6F8",
        custom_dark_grey: "#6E8098",
      },
      fontFamily: {
        Kumbh_Sans: "Kumbh Sans",
      },

      backgroundImage: {
        bg_pattern_header_mobile: "url('./src/assets/mobile/bg-pattern-header.svg')",
        bg_pattern_header_tablet: "url('./src/assets/tablet/bg-pattern-header.svg')",
        bg_pattern_header_desktop: "url('./src/assets/desktop/bg-pattern-header.svg')",
        bg_pattern_detail_footer_desktop:
          "url('./src/assets/desktop/bg-pattern-detail-footer.svg')",
        bg_pattern_detail_footer_mobile: "url('./src/assets/mobile/bg-pattern-detail-footer.svg')",
      },
    },
    screens: {
      sm: "425px",
      md: "768px",
      lg: "1100px",
      xl: "1280px",
      xl2: "1440px",
    },
  },

  darkMode: "class",
  plugins: [],
};
