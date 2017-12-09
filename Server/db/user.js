var mongoose = require("mongoose");

const schema = mongoose.Schema({
    _iamUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'iamUser',
        required: true
    },
    _product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
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

const userModel = mongoose.model("user", schema);

module.exports = userModel;