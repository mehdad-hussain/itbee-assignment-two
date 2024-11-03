module.exports = {
    // Match files you want lint-staged to check
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"],
};
