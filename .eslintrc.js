module.exports = {
    extends: ['eslint:recommended'],
    plugins: ['filenames', 'prettier'],
    rules: {
        // Enforce Title Case for files inside 'src/components'
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
