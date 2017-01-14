'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Hoek = require('hoek');
const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000, host: 'localhost' });

server.register(require('vision'), (err) => {

    Hoek.assert(!err, err);

server.views({  
    engines: {
        html: require('handlebars')
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'default',
    // helpersPath: 'views/helpers',
    //partialsPath: 'views/partials'
});
});

var express = require('express');
var app = express();
var Sequelize = require('sequelize');

//allows text to be read from form
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//enable PUSH to be overriden into DELETE
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

var models = require('./models');
models.TodoItem.sync({ force: true }).then(function() {
    return models.TodoItem.bulkCreate(

        [{
            task: "watch rouge one",
            done: false
        }, {
            task: "bathe dog",
            done: false
        }, {
            task: 'brush cat',
            done: false
        }]

    );
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        models.TodoItem.findAll({}).then(function(data) {
        reply.view('index', { tasks: data });
    })
    }
});

// app.post('/todos/', function(req, res) {
//     //Adds a new todo
//     models.TodoItem.create({
//         task: req.body.newTask,
//         done: false
//     }).then(function() {
//         res.redirect('/');
//     });

// });

// app.delete('/todos/:id', function(req, res) {
//     //Deletes todo with specific ids
//     models.TodoItem.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(function(data) {
//         res.redirect('/');
//     })

// });

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`The party starts at: ${server.info.uri}`);
});
