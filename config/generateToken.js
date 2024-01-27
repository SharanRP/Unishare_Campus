const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, 'sharanrp35', { expiresIn: "210d" });
}
module.exports = generateToken