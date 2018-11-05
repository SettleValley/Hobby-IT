'use strict'
var User = require('../models/user');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (err) return console.log(err);
});

var UserData = [
    new User({
        name: "Admin",
        email: "admin@hobbit.com",
        password: "$2a$05$4Gf80Oji5DeHUvjQlQ0Ohe9dRcuUXbFrG/.vUCPXqnYXMjjiyd8Sy",
        priority: "Admin",
        spots: [{
            _id: "5ba9c4e5cbebbd02d1e53ab2",
            _id: "5bdebf29b1831301ee966d91"
        }],
    })
];
var done = 0;

for (var i = 0; i < UserData.length; i++) {
    UserData[i].save(function (err, result) {
        done++;
        if (done === UserData.length) {
            exit();
        }
    });

}
function exit() {
    mongoose.disconnect(function (err) {
        if (err) return console.log(err);
    })
}
