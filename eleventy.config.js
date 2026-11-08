const topics = require('./topics.js');
module.exports = function (config) {
  config.ignores.add('templates/**');
  config.addGlobalData('topics', topics);
  config.addGlobalData('englishTopics', require('./english-topics.js'));
  config.addFilter('jsonForScript', value => JSON.stringify(value).replace(/</g, '\\u003c'));
  config.addPassthroughCopy('assets');
  return {
    dir: { input: '.', includes: '_includes', output: 'dist' },
    templateFormats: ['html', 'njk'],
    htmlTemplateEngine: 'njk'
  };
};
