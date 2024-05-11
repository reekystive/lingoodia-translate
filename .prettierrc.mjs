/** @type {import('prettier').Config} */
export default {
  semi: true,
  printWidth: 100,
  trailingComma: 'es5',
  singleQuote: true,
  jsxSingleQuote: false,
  tabWidth: 2,
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: 'libs/language-codes/src/**/*.{j,t}s{,x}',
      options: {
        printWidth: 180,
        quoteProps: 'consistent',
      },
    },
  ],
};
