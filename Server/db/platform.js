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
    os: {
        type: String,
        required: true
    },
    side: {
        type: String, //服务端/客户端
        required: true,
    },
    public: {
        type: Boolean,
        default: true,
        required: false
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

const platformModel = mongoose.model("platform", schema);

module.exports = platformModel;