const themeConfig = require('../../config/theme.config');
const theme = {};
Object.keys(themeConfig).forEach((key) => {
  theme[`@${key}`] = themeConfig[key];
});

module.exports = theme;
