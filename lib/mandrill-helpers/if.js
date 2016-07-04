/**
 * Custom 'if' helper that supports Mandrill's custom `expression` comparison statements
 *
 * Example:
 *
 *    {{if `value == "test"`}}
 *      ...
 *    {{/if}}
 * 
 * See https://mandrill.zendesk.com/hc/en-us/articles/205582537-Using-Handlebars-for-dynamic-content#additions-to-standard-handlebars
 * for details.
 *
 * Limitations:
 *   - Does not support unlimited {{elseif cond}} blocks (as per Mandrill docs)
 *   - Does not correctly handle nexted context scopes in evaluation.
 *
 * WARNING
 * 
 * This code is not tested and considered UNSAFE. It is intended to be used locally to
 * preview Mandrill Handlebars templates during development.
 * It IS NOT MEANT for production systems!!
 */
module.exports = function(conditional, options) {
  // Handle Mandrill-style if tag...
  // 
  // Lexer has been modified to conditional values in the form of {{if `value == 123`}} as
  // strings, leaving the `` on the passed input.
  // 
  // This function treats any string argument to `if` that begin & end with "`" as a
  // Mandrill expression statement, and evaulates against the current context, using the
  // resulting value to decide the truthiness of the conditional statement.
  if(typeof conditional === 'string' && conditional[0] === '`' && conditional[conditional.length-1] === '`') {
    // Strip leading & trailing "`" off the original string.
    conditional = conditional.substr(1, conditional.length-2);
    // Replace anything that has been html escaped. Can happen when using a template
    // to generate the template...
    conditional = conditional.replace(/&quot;/g, '"');
    with(options.data.root) {
      conditional = eval(conditional);
    }
  }

  if(conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};