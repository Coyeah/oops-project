const website = {
  title: 'oops-project',
  name: 'oops-project',
  author: 'Coyeah Chen',
  github: 'https://github.com/Coyeah',
  owner: 'coyeah',
  description: 'Create a quick start project',
  repo: 'https://github.com/Coyeah/oops-project',
  licenses: 'http://creativecommons.org/licenses/by-nc/4.0/',
  since: 2020,
};

const customInfo = require('../../config/site.config') || {};

module.exports = {
  ...website,
  ...customInfo,
};
