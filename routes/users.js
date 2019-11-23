var express = require('express');
var router = express.Router();
var Users = require("../schemas/users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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
          let errorMsg = 'Error creating Users'
          if (err.errmsg.includes('duplicate key')) {
            errorMsg = `${req.body.email} is already exists`
          }
          res.send({
            status: false,
            message: errorMsg
          })
        } else {
          res.send({
            status: true,
            data: response,
          });
        }
      });
    }
  });
});

router.post("/login", async (req, res) => {
  const users = await Users.find({
    email: req.body.email
  }, ["_id", "email", "type", "password"], {}, );
  const checkHash = bcrypt.compareSync(req.body.password, users[0].password);
  if (checkHash) {
    try {
      const JWT_KEY = process.env.JWT_KEY || "JWT_KEY_UNDEFINED";
      const token = jwt.sign({
          email: users[0].email,
          userId: users[0]._id,
          type: users[0].type ? users[0].type : "owner"
        },

        JWT_KEY, {
          expiresIn: "30m"
        }
      );
      res.send({
        data: {
          user: users[0],
          token
        },
        message: "Successfully Authenticated",
        status: 200,
        token
      });
    } catch (ex) {
      console.log(ex, "login() error");
    }
  } else {
    res.send({
      status: false,
      message: "Authentication failed",
      status: 401
    })
  }



});

module.exports = router;