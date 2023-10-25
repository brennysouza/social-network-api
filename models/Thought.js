const mongoose = require('mongoose');
const { Schema, Types } = mongoose;


// THis code below is the reaction schema
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

    // This code below is the thought schema
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

const Thought = mongoose.model('Thought', thoughtSchema);
const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = { Thought, Reaction };
