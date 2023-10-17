const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema({
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: Date,
        default: Date.now,
        get: (createdAt) => {
            return new Date(createdAt).toISOString();
        },
    },
    username: [
        {
            type: String,
            required: true,
        },
    ],
    createdAt: [
        {
            type: Date,
            default: Date.now,
            get: (createdAt) => {
                return new Date(createdAt).toISOString();
            },
        },
    ],
},

    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    });

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => {
            return new Date(createdAt).toISOString();
        },
    },
    username: [
        {
            type: String,
            required: true,
        },
    ],
    reactions: [reactionSchema],
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    });

thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = mongoose.model('thought', thoughtSchema);
const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
module.exports = Thought;
