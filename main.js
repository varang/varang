var markdownInclude = require('markdown-include');
markdownInclude.compileFiles("./markdown.json").then(function (data) {
    // do something with compiled files
});
