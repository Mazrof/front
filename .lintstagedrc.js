module.exports = {
  // Lint & Prettify TS, TSX, JS, JSX files within the app directory and its subdirectories, excluding the dist directory
  "/**/*.{ts,tsx,js,jsx}": [
    `npm run lint`,
    `npm run prettier`,
  ],
  "!dist/**/*": [], // Exclude the dist directory from linting
  "!node_modules/**/*": [], // Exclude the node_modules directory from linting
  "!.next/**/*": [], // Exclude the .next directory from linting
  "!.swc/**/*": [], // Exclude the .swc directory from linting
   "!.husky/**/*": [], // Exclude the .husky directory from linting
};