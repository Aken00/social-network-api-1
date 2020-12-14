const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeAllReaction,
    removeOneReaction,
} = require('../../controllers/thought-controller');

// 'GET' all thoughts and 'POST' to create thoughts at users/api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

// 'GET' one thought by id, 'PUT' to update thought, and 'DELETE' a thought at api/thoughts/<thoughtId>
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)

// 'POST' to add a friend and 'DELETE' a friend at api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeAllReaction);

// Create an extra route to 'DELETE' one reaction at api/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeOneReaction);

module.exports = router;
