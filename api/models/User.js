const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update['password']) {
    const salt = await bcrypt.genSaltSync(10);
    this._update['password'] = await bcrypt.hashSync(this._update['password'], salt);
  }
  next();
});

const User = mongoose.model('users', UserSchema);

module.exports = {
  User,
};
