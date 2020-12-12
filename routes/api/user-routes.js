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

// Seting up the 'GET all' and 'POST' for /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Set up the 'GET one,' 'PUT,' and 'DELETE' for /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// Setup up the 'PUT' for /api/users/:userId/friends/:friendId
router
    .route('/:id/:friendId')
    .put(addFriend)
    .delete(removeFriend);

module.exports - router;