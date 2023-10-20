const Account = require('../model/modelAccount');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        Account.findOne({ email: req.body.email }, (err, userAccount) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (!userAccount) {
                return res.status(400).json({ error: 'Email address or password is invalid' });
            }

            bcrypt.compare(req.body.password, userAccount.password, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'Internal server error' });
                } else if (result) {
                    const accessToken = jsonwebtoken.sign(
                        {
                            _id: userAccount._id,
                            username: userAccount.username,
                            email: userAccount.email,
                        },
                        'my-secret-key-1234'
                    );

                    console.log(`Hello, ${userAccount.username}!`);
                    res.status(200).json({
                        accessToken,
                        userAccount,
                    });
                } else {
                    res.status(400).json({ error: 'Invalid email or password.' });
                }
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = login;
