var mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    size: {
        type: Number,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    //该包的版本号 x.y.z
    version: {
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        default: true,
        required: false
    },
    publishDate: {
        type: String,
        required: true
    },
    _version: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'version',
        required: true
    },
    _platform: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'platform',
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

const packageModel = mongoose.model("package", schema);

module.exports = packageModel;