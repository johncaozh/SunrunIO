var mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    logoUrl: {
        type: String,
        required: false,
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

productSchema.pre('remove', function (next) {
    require('./package').remove({
        _product: this._id
    }).exec();

    require('./platform').remove({
        _product: this._id
    }).exec();

    require('./version').remove({
        _product: this._id
    }).exec();

    require('./faq').remove({
        _product: this._id
    }).exec();

    require('./document').remove({
        _product: this._id
    }).exec();

    require('./user').remove({
        _product: this._id
    }).exec();

    next();
})

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;