// middleware for checking if there is an existing user in the database


async function checkUsrExist(req, res, next) {
    const email = req.body.email;
    const phone = req.body.phone;

    const existingUser = await User.findOne({ // userExists Check
        email: email
    })
    if (existingUser) {
        return res.status(400).json({
            "msg": "user already exists"
        })
    }
    const existingUser2 = await User.findOne({ // userExists Check
        phone: phone
    })
    if (existingUser2) {
        return res.status(400).json({
            "msg": "user already exists"
        })
    }
}


module.exports = {
    checkUsrExist
};