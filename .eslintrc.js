module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended', // Ensures Prettier is used with ESLint
    ],
    plugins: ['filenames', 'prettier'],
    rules: {
        // Enforce Title Case for files inside 'src/components'
        'filenames/match-regex': ['error', '^[A-Z][a-zA-Z0-9]*$', true],
        // Apply the same rule but exclude the 'src/components' directory
        'filenames/match-regex': [
            'error',
            '^[a-z0-9-]+$',
            true,
            { ignore: ['src/components/'] },
        ],
        // Ensure Prettier is also applied and any Prettier issues are treated as ESLint errors
        'prettier/prettier': 'error',
    },
};
