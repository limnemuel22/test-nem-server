var express = require('express');
var router = express.Router();

/* GET animal listing. */
router.get('/', function (req, res, next) {

    res.send({
        name: "dog"
    });
});

router.get('/:id', function (req, res, next) {
    console.log("TEST", req.params);
    res.send({
        name: "dogs",
        params: req.params
    });
});


router.put('/:id', function (req, res, next) {
    console.log("TEST", req.params);

    res.send({
        name: "dog"
    });
});


module.exports = router;