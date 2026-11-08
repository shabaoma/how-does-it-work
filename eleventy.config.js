const topics = require('./topics.js');
module.exports = function (config) {
  config.ignores.add('templates/**');
  config.addGlobalData('topics', topics);
  config.addPassthroughCopy('assets');
  return {
    dir: { input: '.', includes: '_includes', output: 'dist' },
    templateFormats: ['html', 'njk'],
    htmlTemplateEngine: 'njk'
  };
};
