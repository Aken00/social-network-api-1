const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// Seting up the 'GET all' and 'POST' to create users at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);


// Set up the 'GET' one by id, the 'PUT' to update user, and 'DELETE' user at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


// Set up the 'POST' to add a friend and 'DELETE' a friend at /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(removeFriend);


module.exports = router;

