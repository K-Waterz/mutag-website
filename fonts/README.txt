Self-hosted Inter (variable 400–700) and Poppins (300, 400, 500, 600, 700) — Latin and Latin-Extended subsets only.

Regenerate after changing weights or families:
1. Update the Google Fonts URL in fonts/build-font-css.mjs if needed, or refresh fonts/_source.css:
   curl -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120" "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=Poppins:wght@300;400;500;600;700&display=swap" -o fonts/_source.css
2. node fonts/build-font-css.mjs
3. Copy mutag-fonts.css and *.woff2 to public/fonts/ for Vite builds (or run your deploy step).

Fonts are licensed under the SIL Open Font License 1.1.
