import nextPlugin from 'eslint-config-next';

const eslintConfig = [
  ...nextPlugin,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];

export default eslintConfig;
