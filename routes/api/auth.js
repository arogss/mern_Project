const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const { check, validationResult } = require('express-validator');

//user model
let User = require('../../models/User');

//route Get api/users
//desc Get all user
//access public
router.get('/', async (req, res) => {
    try {
        const UserDb = await User.find();
        res.send(UserDb);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

//route Get api/auth/user
//desc Get user
//access private
router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) {
            return res.status(404).send('user not found');
        }
        res.json(user);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

//route post api/auth
//desc Auth user
//access public
router.post(
    '/',
    [
        check('email', 'Email is required')
            .not()
            .isEmpty().isEmail(),
        check('password', 'Password longer than 5 chars').isLength({
            min: 5
        })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            User.findOne(req.body.email).then(user => {
                if (!user) {
                    return res.status(400).json({ msg: 'User does not exist' })
                }

                //validate password
                bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({msg: 'Invalid credentials'})

                    jwt.sign(
                        {
                            id: user.id
                        },
                        config.get(jwt),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
            })
        } catch (err) {
            res.status(500).send('Server error');
        }
    }
);

//route delete api/users/:id
//desc delete user by id
//access public
router.delete('/:id', async (req, res) => {
    try {
        // find the element
        const user = await User.findOne({ username: req.params.id });
        await user.remove()

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//route put  api/users/
//desc update user
//access public
router.put('/:id', async (req, res) => {
    try {
        const taskup = await User.findOne(req.body.id);

        taskup.email = req.body.email;
        taskup.password = req.body.password;
        taskup.fullname = req.body.fullname;
        await taskup.save();

        res.send('User updated');
        window.alert("User updated")
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;






