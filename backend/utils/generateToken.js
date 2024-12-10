const jwt = require('jsonwebtoken');

const generateToken = async (userId, res) => {
    // Create the JWT token
    const token = jwt.sign({ userId }, process.env.JWTSECRET, { expiresIn: "1d" });

    // Set the cookie on the response object
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Cookie cannot be accessed via JavaScript
        sameSite: 'strict', // Protects against CSRF attacks
        secure: false // Change to true in production
    });

    // Return the token in case you need it elsewhere
    return token;
};

module.exports = generateToken;
