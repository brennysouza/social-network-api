const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
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
    userName: [
      {
        type: String,
        required: true,
      },
    ],
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
