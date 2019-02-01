var Category = require('../models/category');
var Spot = require('../models/spot');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (err) return console.log(err);
});

var CategoryData =[
    new Category({
        status: true,
        title: "Yoga",
        create_Date: "2018-09-24 23:22:29.383"
    }),
    new Category({
        status: true,
        title: "Lectura",
        create_Date: "2018-09-24 23:22:29.383"
    }),
    new Category({
        status: true,
        title: "Pesca",
        create_Date: "2018-09-24 23:22:29.383"
    })
];

var SpotData = [
    new Spot({
        status: true,
        name: 'BeerDen',
        gallery: [{

        }],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum aliquam libero, ultricies hendrerit diam bibendum eu. Cras at feugiat ipsum, vitae pretium erat.',
        categories: CategoryData._id,
        comments:"",
        address: {
            lat: "8.9137263",
            lng: "-79.5295815"
        },
        created_Date: "2018-09-24 23:22:29.383"

    }),
    new Spot({

    })
];
var done = 0;

for (var i = 0; i < CategoryData.length; i++) {
    CategoryData[i].save(function (err, result) {
        done++;
        if (done === CategoryData.length) {
            exit();
        }
    });

}

function exit() {
    mongoose.disconnect(function (err) {
        if (err) return console.log(err);
    })
}
