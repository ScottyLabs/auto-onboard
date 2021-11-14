module.exports = {
    root: true,
    ignorePatterns: ['build/**/*.js', 'node_modules/**/*.js'],
    extends: ['eslint:recommended', 'prettier'],
    env: {
        node: true,
    },
};
