const router = require('express').Router();
const Account = require('../db/models/Accounts')

router.put('/', (req, res, next) => {
  Account.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (!user) {
        res.status(401).send('User not found')
      } else {
        req.login(user, (err) => {
          if (err) next(err);
          else req.json(user);
        });
      }
    })
    .catch(next);
});

module.exports = router;