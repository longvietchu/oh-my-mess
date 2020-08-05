const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Model
const User = require('../../models/User');

// Middlewares
const validations = require('../../middlewares/validations.middleware');

/**
 * @route   POST api/users
 * @desc    Register user
 * @access  Public
 */
router.post('/', validations.registerValidate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        // Create salt & hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Generate token
        const token = jwt.sign(
            { email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: 3600 }
        );

        res.json({
            token,
            user: {
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;
