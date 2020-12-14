const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts /api/thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ createdAt: 'desc' })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one thought by id /api/thoughts/:thoughtId
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ createdAt: 'desc' })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought can be found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // add thought pushed to user /api/thoughts/:userId
    addThought({ body }, res) {
        console.log(body)
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought can be found with this id!' });
                    return;
                }
                res.json({ message: 'Your thought was made!' });
            })
            .catch(err => res.json(err));
    },

    // update a thought by id api/thoughts/:thoughtId
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought can be found with this id!' });
                    return;
                }
                res.json({ message: 'Your thought was updated!' });
            })
            .catch(err => res.status(400).json(err));
    },

    // Remove thought and UPDATE user /api/thoughts/:userId/:thoughtId
    removeThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then(deletedThought => {
                if (!deletedThought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                return User.findOneAndUpdate(
                    { username: deletedThought.username },
                    { $pull: { thoughts: { id: req.params.id } } },
                    { new: true, runValidators: true }
                )
                    .then(deletedThought => {
                        res.json({ message: 'Your thought was deleted!' });
                    });
            })
            .catch(err => res.status(400).json(err));
    },

    // add a reaction to a thought 
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },

    // Removie all reactions from thoughts
    removeAllReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.body } },
            { new: true }
        )
            .select('-__v')
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No reaction found with that id!' });
                    return;
                }
                res.json({ message: 'Your reactions were removed!' });
            })
            .catch(err => res.status(400).json(err));
    },

    // remove a reaction to a thought
    removeOneReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true, runValidators: true }
        )
            .select('-__v')
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No reaction can be found with that id!' });
                    return;
                }
                res.json({ message: 'Your reaction was removed!' });
            })
            .catch(err => res.json(err));
    }

};

module.exports = thoughtController;