const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Middleware
const authMiddleware = require('../../middlewares/auth.middleware');
const validations = require('../../middlewares/validations.middleware');

// Model
const User = require('../../models/User');

/**
 * @route   POST api/auth
 * @desc    Sign-in user
 * @access  Public
 */
router.post('/', validations.loginValidate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: 3600
        });
        res.json({
            token,
            user: {
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err);
    }
});

/**
 * @route   GET api/users
 * @desc    Get infomation of an user
 * @access  Private
 */
router.get('/user', authMiddleware, async (req, res) => {
    user = await User.findOne({ where: { email: req.user.email } });
    res.status(200).json({
        username: user.username,
        email: user.email
    });
});

module.exports = router;
