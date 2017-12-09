var mongoose = require("mongoose");

const schema = mongoose.Schema({
    iamId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
    },
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
});

const iamUserModel = mongoose.model("iamUser", schema);

module.exports = iamUserModel;