var express = require('express'),
    Thought = require('../models/thoughtModel');

var routes = function () {
    var router = express.Router();
    router.route('/')
        .post(function (req, res) {
            var thought = new Thought(req.body);
            thought.createDate = new Date();
            thought.updateDate = new Date();
            thought.save();
            res.status(201).send(thought); //Status 201 = Created

        })
        .get(function (req, res) {

            var query = {};
            Thought.find(query, function (err, thoughts) {
                if (err) {
                    res.status(500).send(err);
                }

                res.json(thoughts);
            });

        });

    //Middleware to get Thought by ID, since we do this in more than one
    //  route. We append Thought to the request for other routes.
    router.use('/:id', function (req, res, next) {
        Thought.findById(req.params.id, function (err, thought) {
            if (err)
                res.status(500).send(err);
            else if (thought) {
                req.thought = thought;
                next();
            }
            else {
                res.status(404).send('No thought entity found.');
            }
        });
    });

    router.route('/:id')
        .get(function (req, res) {
            res.json(req.thought);
        })
        .put(function (req, res) {
            //Find and update entire Thought.
            req.thought.title = req.body.title;
            req.thought.description = req.body.description;
            req.thought.updateDate = new Date();

            req.thought.save(function(err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.thought);
                }
            });
        })
        .patch(function (req, res) {

            if (req.body._id) {
                delete req.body._id; //We don't want to update this.
            }

            //Only update what is passed.
            for(var p in req.body) {
                req.thought[p] = req.body[p];
            }

            req.thought.save(function(err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.thought);
                }
            });

        })
        .delete(function(req,res) {

            req.thought.remove(function(err) {
                if (err)
                    res.status(500).send(err);
                else {
                    //204 == No-content/Removed
                    res.status(204).send('Thought deleted.');
                }
            });
        });

    return router;

};

module.exports = routes;