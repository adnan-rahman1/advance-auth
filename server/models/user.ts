import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    max: 32,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    defautl: "subscriber"
  },
  resetPasswordLink: {
    data: String,
    default: "",
  }
}, {
  timestamps: true
});

userSchema.set('toObject', { virtuals: true })
userSchema.set('toJSON', { virtuals: true })

userSchema.pre('save', async function (this: any, next) {
  this.password = await this.getHashPassword(this.password, await this.getSalt());
  next();
})

// method
userSchema.methods = {
  getSalt: async function () {
    try {
      return await bcrypt.genSalt(10)
    } catch (err) {
      return "";
    }
  },
  getHashPassword: async function (password: string, salt: string) {
    try {
      if (!password) return "";
      else {
        return await bcrypt.hash(password, salt)
      }
    } catch (err) {
      return "";
    }
  },
  comparePassword: async function (plainPassword: string) {
    try {
      return await bcrypt.compare(plainPassword, this.hashed_password)
    } catch (err) {
      return false;
    }
  }
}

export const User = mongoose.model('User', userSchema);
