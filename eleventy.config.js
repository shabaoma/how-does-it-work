const topicDefinitions = require('./topics');
const localeDefinitions = require('./locales');
for (const locale of localeDefinitions) {
  const missing = topicDefinitions.filter(topic => !locale.topics[topic.key]);
  if (missing.length) throw new Error(`Missing ${locale.code} topics: ${missing.map(topic => topic.key).join(', ')}`);
}
const locales = localeDefinitions.map(locale => ({
  ...locale,
  topics: topicDefinitions.filter(topic => locale.topics[topic.key]).map(topic => ({
    ...topic, ...locale.topics[topic.key], category: locale.categories[topic.category]
  }))
}));
const defaultLocale = locales[0];
const localizedPages = locales.flatMap(locale => [
  { locale, topic: null, url: `${locale.prefix ? locale.prefix + '/' : ''}index.html` },
  ...locale.topics.map(topic => ({ locale, topic, url: `${locale.prefix ? locale.prefix + '/' : ''}${topic.url}` }))
]);
module.exports = function (config) {
  config.ignores.add('templates/**');
  config.addGlobalData('topics', defaultLocale.topics);
  config.addGlobalData('locales', locales);
  config.addGlobalData('defaultLocale', defaultLocale);
  config.addGlobalData('localizedPages', localizedPages);
  config.addGlobalData('legacyPages', ['index.html', ...topicDefinitions.map(topic => topic.url)].map(url => ({ url, target: `${defaultLocale.prefix}/${url}` }))); 
  config.addFilter('jsonForScript', value => JSON.stringify(value).replace(/</g, '\\u003c'));
  config.addPassthroughCopy('assets');
  config.addPassthroughCopy({ 'node_modules/bootstrap/dist/css/bootstrap-grid.min.css': 'assets/css/bootstrap-grid.min.css' });
  return { dir: { input: '.', includes: '_includes', output: 'dist' }, templateFormats: ['html', 'njk'], htmlTemplateEngine: 'njk' };
};
