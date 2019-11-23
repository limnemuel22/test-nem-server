var express = require('express');
var router = express.Router();
var Users = require("../schemas/users");


/* GET users listing. */
router.get("/", async function (req, res) {
  const arr = await Users.find({});
  res.send({
    status: true,
    data: arr,
  });
});

router.post("/", async (req, res) => {
  const temp = {
    ...req.body,
  };
  bcrypt.hash(temp.password, 10, (err, hash) => {
    if (err) {
      res.send({
        status: false,
        error: err,
      });
    } else {
      temp.password = hash;
      Users.create(temp, function (err, response) {
        if (err) {
          res.send({
            status: false,
            error: err,
          });
        } else {
          res.send({
            status: true,
            data: response,
          });
        }
      });
    }
  });

  router.post("/login", async (req, res) => {
    const match = await bcrypt.compare(password, temp.password);
    if (match) {}
    if (res) {
      console.log(res);
    } else {
      return response.json({
        success: false,
        message: "passwords do not match"
      });
    }
  });
});


module.exports = router;