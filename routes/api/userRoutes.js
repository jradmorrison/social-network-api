const router = require('express').Router();
const {
getUsers,
getUserById,
createUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).put().delete();

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post().delete();

module.exports = router;