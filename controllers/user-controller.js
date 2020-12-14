const { User } = require('../models');

const userController = {
    // get all users /api/users
    getAllUsers(req, res) {
        User.find({})
            .populate(
                { path: 'thoughts', select: '-__v' })
            .populate(
                { path: 'friends', select: '-__v' })
            .select('-__v')
            .sort({ createdAt: 'desc' })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one user by id /api/users/:id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a user /api/users
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update a user by id /api/user/:id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user can be found with this id!' });
                    return;
                }
                res.json({ message: 'User was updated'});
            })
            .catch(err => res.status(400).json(err));
    },

    // delete a user /api/user/:id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user can be found with this id!' });
                    return;
                }
                res.json({ message: 'User was deleated.' });
            })
            .catch(err => res.status(400).json(err));
    },


    // add a friend to a user 
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user can be found with this id!' });
                    return;
                }
                res.json({ message: 'You added a new friend.' });
            })
            .catch(err => res.status(400).json(err));
    },

    // remove a friend from a user
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user can be found with that id.' });
                    return;
                }
                res.json({ message: 'Your friend was removed.' });
            })
            .catch(err => res.json(err));
    }

};


module.exports = userController;