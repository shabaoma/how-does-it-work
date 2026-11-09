const topicDefinitions = require('./topics');
const localeDefinitions = require('./locales');
const sideMenu = require('./side-menu');
// Update when the home page content or topic listing changes.
const homeUpdated = '2026-11-10';
const validDate = value => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value + 'T00:00:00Z');
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
};
for (const page of [{ key: 'home', updated: homeUpdated }, ...topicDefinitions]) {
  if (!validDate(page.updated)) throw new Error(`Invalid or missing update date for ${page.key}`);
}
const topicsByKey = new Map(topicDefinitions.map(topic => [topic.key, topic]));
if (topicsByKey.size !== topicDefinitions.length) throw new Error('Duplicate topic key in topics.js');
const menuKeys = new Set();
const menuCategories = new Set();
const menuGroups = [];
for (const entry of sideMenu) {
  if (typeof entry !== 'string' || !entry) throw new Error('Invalid menu entry');
  if (entry.startsWith('# ')) {
    const category = entry.slice(2);
    if (!category || menuCategories.has(category)) throw new Error(`Invalid or duplicate menu category: ${category}`);
    menuCategories.add(category);
    menuGroups.push({ category, topics: [] });
    continue;
  }
  const group = menuGroups[menuGroups.length - 1];
  const topic = topicsByKey.get(entry);
  if (!topic) throw new Error(`Unknown menu topic: ${entry}`);
  if (!group) throw new Error(`Menu topic before first category: ${entry}`);
  if (menuKeys.has(entry)) throw new Error(`Duplicate menu topic: ${entry}`);
  if (topic.category !== group.category) throw new Error(`Menu category mismatch for ${entry}`);
  menuKeys.add(entry);
  group.topics.push(entry);
}
for (const group of menuGroups) {
  if (!group.topics.length) throw new Error(`Empty menu category: ${group.category}`);
}
const missingMenuTopics = topicDefinitions.filter(topic => !menuKeys.has(topic.key));
if (missingMenuTopics.length) throw new Error(`Missing menu topics: ${missingMenuTopics.map(topic => topic.key).join(', ')}`);
for (const locale of localeDefinitions) {
  for (const group of menuGroups) {
    if (!locale.categories[group.category]) throw new Error(`Missing ${locale.code} category: ${group.category}`);
  }
  const missing = topicDefinitions.filter(topic => !locale.topics[topic.key]);
  if (missing.length) throw new Error(`Missing ${locale.code} topics: ${missing.map(topic => topic.key).join(', ')}`);
}
const locales = localeDefinitions.map(locale => {
  const localizedMenuGroups = menuGroups.map(group => ({
    category: locale.categories[group.category],
    topics: group.topics.map(key => ({
      ...topicsByKey.get(key), ...locale.topics[key], category: locale.categories[group.category]
    }))
  }));
  return { ...locale, menuGroups: localizedMenuGroups, topics: localizedMenuGroups.flatMap(group => group.topics) };
});
const defaultLocale = locales[0];
const localizedPages = locales.flatMap(locale => [
  { locale, topic: null, updated: homeUpdated, url: `${locale.prefix ? locale.prefix + '/' : ''}index.html` },
  ...locale.topics.map(topic => ({ locale, topic, updated: topic.updated, url: `${locale.prefix ? locale.prefix + '/' : ''}${topic.url}` }))
]);
module.exports = function (config) {
  config.ignores.add('templates/**');
  config.addGlobalData('topics', defaultLocale.topics);
  config.addGlobalData('locales', locales);
  config.addGlobalData('defaultLocale', defaultLocale);
  config.addGlobalData('localizedPages', localizedPages);
  config.addGlobalData('legacyPages', [
    { url: 'index.html', target: 'en/index.html', lang: 'en' },
    ...topicDefinitions.map(topic => ({ url: topic.url, target: `${defaultLocale.prefix}/${topic.url}`, lang: defaultLocale.code }))
  ]);
  config.addFilter('jsonForScript', value => JSON.stringify(value).replace(/</g, '\\u003c'));
  config.addPassthroughCopy('assets');
  config.addPassthroughCopy({ 'node_modules/bootstrap/dist/css/bootstrap-grid.min.css': 'assets/css/bootstrap-grid.min.css' });
  return { dir: { input: '.', includes: '_includes', output: 'dist' }, templateFormats: ['html', 'njk'], htmlTemplateEngine: 'njk' };
};
