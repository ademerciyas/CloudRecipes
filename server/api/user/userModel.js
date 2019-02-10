const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');



const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    avatar: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    }
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    this.password = this.encryptPassword(this.password);
    next();
});

UserSchema.methods = {
    // check the passwords on signIn
    authenticate: function (plainTextPassword) {
        return bcrypt.compareSync(plainTextPassword, this.password);
    },
    // hash the passwords
    encryptPassword: function (plainTextPassword) {
        if (!plainTextPassword) {
            return ''
        } else {
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plainTextPassword, salt);
        }
    },

    toJson: function () {
        const obj = this.toObject();
        delete obj.password;
        return obj;
    }
};

module.exports = mongoose.model('user', UserSchema);