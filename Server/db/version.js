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
    public: {
        type: Boolean,
        default: true,
        required: false
    },
    publishDate: {
        type: String,
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

schema.pre('remove', function (next) {
    require('./package').remove({
        _product: this._id
    }).exec();

    next();
})

const versionModel = mongoose.model("version", schema);

module.exports = versionModel;