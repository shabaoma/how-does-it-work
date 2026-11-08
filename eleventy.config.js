const locales = require('./locales');
const defaultLocale = locales[0];
const localizedPages = locales.slice(1).flatMap(locale => [
  { locale, topic: null, url: `${locale.prefix}/index.html` },
  ...locale.topics.map(topic => ({ locale, topic, url: `${locale.prefix}/${topic.url}` }))
]);
module.exports = function (config) {
  config.ignores.add('templates/**');
  config.addGlobalData('topics', defaultLocale.topics);
  config.addGlobalData('locales', locales);
  config.addGlobalData('defaultLocale', defaultLocale);
  config.addGlobalData('localizedPages', localizedPages);
  config.addFilter('jsonForScript', value => JSON.stringify(value).replace(/</g, '\\u003c'));
  config.addPassthroughCopy('assets');
  config.addPassthroughCopy({ 'node_modules/bootstrap/dist/css/bootstrap-grid.min.css': 'assets/css/bootstrap-grid.min.css' });
  return { dir: { input: '.', includes: '_includes', output: 'dist' }, templateFormats: ['html', 'njk'], htmlTemplateEngine: 'njk' };
};
