const Account = require('../model/modelAccount');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Please provide all required information." });
        }

        const exists = await Account.findOne({ email });

        if (exists) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const saltRounds = 10;

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Error while hashing the password" });
            }

            const newAccount = new Account({
                username,
                email,
                password: hash, // Store the hashed password
            });

            try {
                const savedAccount = await newAccount.save();
                res.status(200).json(savedAccount);
                console.log(`Hello, ${username}!`);
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Error while saving the account" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = register;
