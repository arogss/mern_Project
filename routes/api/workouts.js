const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const auth = require('../../middleware/auth')

const { check, validationResult } = require('express-validator');

//user model
let Workout = require('../../models/Workout');


//route Get api/workouts
//desc Get all workout
//access public
router.get('/', async (req, res) => {
    try {
        const WorkoutDb = await Workout.find();
        res.send(WorkoutDb);
    } catch (err) {
        res.status(500).send('Server error');
    }
});


//route post api/workouts
//desc insert workout
//access public
router.post(
    '/',
    [
        check('username', 'Username is required')
            .not().
            isEmpty(),
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('description', 'Description is required')
            .not()
            .isEmpty(),
        check('duration', 'Duration is required')
            .not()
            .isEmpty(),
        check('date', 'Date is required')
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            console.log(req.body);
            const newWorkout = new Workout({
                username: req.body.username,
                name: req.body.name,
                description: req.body.description,
                duration: Number(req.body.duration),
                date: Date.parse(req.body.date)
            });

            const nt = await newWorkout.save();
            res.send(nt);
        } catch (err) {
            res.status(500).send('Server error');
        }
    }
);

router.get('/:id', async (req, res) => {
    Workout.findById(req.params.id)
      .then(workout => res.json(workout))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.delete('/:id', auth, async (req, res) => {
    Workout.findByIdAndDelete(req.params.id)
      .then(() => res.json('Workout deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.put('/:id', auth, async (req, res) => {
    Workout.findById(req.params.id)
      .then(workout => {
        workout.username = req.body.username;
        workout.name = req.body.name;
        workout.description = req.body.description;
        workout.duration = Number(req.body.duration);
        workout.date = Date.parse(req.body.date);
  
        workout.save()
          .then(() => res.json('Workout updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

module.exports = router;