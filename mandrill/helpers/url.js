/**
 * Escapes url component pieces like Mandrill's built-in url helper would
 *
 * See https://mandrill.zendesk.com/hc/en-us/articles/205582537-Using-Handlebars-for-Dynamic-Content#inline-helpers-available-in-mandrill
 * for details
 */
module.exports = function(text, options) {
  return encodeURIComponent(text);
};