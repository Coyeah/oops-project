const webpack = require('webpack');
const path = require('path');

const website = require('../../config/website.config');
const paths = require('../config/paths');

const getDllReferPlugins = (entries, use) => {
  if (!use) return [];
  const names = Object.keys(entries);
  return names.map(
    (name) =>
      new webpack.DllReferencePlugin({
        manifest: path.resolve(
          paths.appDll,
          `${name}.${website.name}.manifest.json`,
        ),
      }),
  );
};

module.exports = getDllReferPlugins;
