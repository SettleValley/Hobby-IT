function hbsHelpers(hbs) {
  return hbs.create({
    extname: 'hbs',
    defaultLayout: 'base',
    partialsDir:__dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    helpers: { // This was missing
      splitNameUser: function() {
        console.log('reading it');
        return "hola";
      }

      // More helpers...
    }

  });
}

module.exports = hbsHelpers;
