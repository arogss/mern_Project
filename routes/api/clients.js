const router = require('express').Router();
let Client = require('../../models/Client');

router.get('/', (req, res) => {
    Client.find()
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/', (req, res) => {
  const username = req.body.username;

  const newClient = new Client({username});

  newClient.save()
    .then(() => res.json('Client added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;