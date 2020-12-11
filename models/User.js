const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Please make a username',
        trim: true
    },
    email: {
        type: String,
        required: 'Please add an email address',
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valide email address']
    },
    thought: 
    [{
        type: Schema.Types.ObjectId,
        ref: User
    }],
    friends:
    [{
        type: Schema.Types.ObjectId,
        ref: User
    }]
},
{
    toJSON: {
        virtuals: true,
            getters: true
    },
    id: false
});

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;