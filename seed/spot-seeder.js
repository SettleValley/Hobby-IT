var Spot = require('../models/spot');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (err) return console.log(err);
});

var Box =[
    new Spot({
        status: true,
        name: 'BeerDen',
        gallery:[{

        }],
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum aliquam libero, ultricies hendrerit diam bibendum eu. Cras at feugiat ipsum, vitae pretium erat.',
        categories: '5bdebe4efd01dd01cca20c36'

    })
];
var done = 0;

for (var i = 0; i < Box.length; i++) {
    Box[i].save(function (err, result) {
        done++;
        if (done === Box.length) {
            exit();
        }
    });

}
function exit() {
    mongoose.disconnect(function (err) {
        if (err) return console.log(err);
    })
}
