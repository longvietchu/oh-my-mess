const { check } = require('express-validator');

module.exports.registerValidate = [
    // Validate request
    check('username', 'Username must be at least 6 chars long').isLength({
        min: 6
    }),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 chars long').isLength({
        min: 6
    })
];

module.exports.loginValidate = [
    // Validate request
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
];
