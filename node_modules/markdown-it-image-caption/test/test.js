var plg = require('../index');
var md = require('markdown-it')().use(plg);

var result = md.render('# markdown-it rulezz!\n![Int](h.jpg "tu") **fdg**');

console.log(result);
