const express  = require('express')
const {registerUser, authUser, allUsers}  = require('../controllers/user2Controller')
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router()

router.route('/').post(registerUser).get( protect ,allUsers)
router.post('/login' , authUser)

module.exports = router
