var mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        default: true,
        required: false
    },
    _createUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'iamUser',
        required: true
    },
    _lastUpdateUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'iamUser',
        required: true
    },
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
});

const linkModel = mongoose.model("link", schema);

module.exports = linkModel;