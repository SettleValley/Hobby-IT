var register = function(Handlebars) {
  var helpers = {
    // put all of your helpers inside this object
    NameSlice: function(name){
        if (!name || !name.length){return;}
        var cut = name.slice(0,2);
        return cut;
    },
    bar: function(){
        return "BAR";
    },
    dateFormate: function(date){
      var reformat = new Date(date),
      month = '' + (reformat.getMonth() + 1),
      day = '' + reformat.getDate(),
      year = reformat.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      
      return [month, day, year].join('/');
    }
  };

  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    // register helpers
    for (var prop in helpers) {
        Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
      // just return helpers object if we can't register helpers here
      return helpers;
  }

};

module.exports.register = register;
module.exports.helpers = register(null);
