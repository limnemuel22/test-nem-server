const express = require('express');
const router = express.Router();
const Movies = require('../schemas/movies');

router.get('/', async function (req, res, next) {
    await Movies.find((error, result) => {
        if (error) {
            res.send({
                status: false,
                error,
                message: 'Error in getting movies'
            })
        } else {
            if (!result) {
                res.send({
                    status: true,
                    message: 'No movies found',
                    data: []
                })
            } else {
                res.send({
                    status: true,
                    message: 'Successfuly fetched movies!',
                    data: result
                })
            }
        }
    })
});

router.post('/', function (req, res, next) {
    if (!req.body.title) {
        res.send({
            status: false,
            message: 'Title is required'
        });
    }
    if (!req.body.director) {
        res.send({
            status: false,
            message: 'Director is required'
        });
    }
    if (!req.body.quantity) {
        res.send({
            status: false,
            message: 'Quantity is required'
        });
    }
    if (!req.body.genre) {
        res.send({
            status: false,
            message: 'Genre is required'
        });
    }
    Movies.create(req.body, function (error, data) {
        if (error) {

            let errorMsg = 'Error creating Movies'
            if (error.errmsg.includes('duplicate key')) {
                errorMsg = `${req.body.title} already exists`
            }
            res.send({
                status: false,
                message: errorMsg
            })
        } else {
            res.send({
                status: true,
                message: `${req.body.title} is Successfully Added!`,
                data
            })
        }
    });
});

router.get('/:id', function (req, res, next) {
    Movies.findOne({
        _id: req.params.id
    }, function (error, result) {

        if (error) {
            res.send({
                status: false,
                error,
                message: 'Error getting specific movies'
            })
        } else {
            res.send({
                status: true,
                message: `Successfuly fetched Movie`,
                data: result
            })
        }

    });
});

// delete Movies

router.delete('/:id', function (req, res, next) {
    const query = Movies.where({
        _id: req.params.id
    });
    query.findOne().lean().exec(function (err, result) {
        if (err) {
            res.send({
                status: false,
                error,
                message: "No Movie found in database!",
            });
        } else {
            Movies.remove({
                _id: req.params.id
            }, function (error) {


                if (error) {
                    res.send({
                        status: false,
                        error,
                        message: error.errmsg,
                    })
                } else {
                    res.send({
                        status: true,
                        message: `The selected Movie ${result.title} is Successfully Deleted`,
                        data: result
                    })
                }
            });
        }
    });

});


router.put('/:id', function (req, res, next) {
    Movies.findOneAndUpdate({
        _id: req.params.id
    }, {
        name: req.body,
    }, {
        upsert: true
    }, function (err, result) {

        if (err) {
            res.send({
                status: false,
                error: err,
                message: `Something went wrong in updating movies!`,
            });
        } else {
            res.send({
                status: true,
                message: `Movie ${req.body.name} is Updated!`,
                data: {
                    ...result.toObject({
                        getter: true,
                    }),
                    ...req.body,
                },

            });
        }
    });

});


module.exports = router;