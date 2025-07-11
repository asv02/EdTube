const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  Role:
  {
    type: String,
    enum: ["User", "Admin"],
    required: true,
    validate(value) {
      if (!["User", "Admin"].includes(value)) {
        throw new Error("Invalid Role");
      }
    }
  },
  PhotoUrl: {
    type: String,
  },
  FirstName: {
    type: String,
    required: true,
    maxLength: 20,
    validate(value) {
      if (!validator.isAlpha(value)) {
        throw new Error("First name must contain only letters");
      }
    },
  },
  LastName: {
    type: String,
    required: true,
    maxLength: 30,
    validate(value) {
      if (!validator.isAlpha(value)) {
        throw new Error("Last name must contain only letters");
      }
    },
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  PhoneNumber: {
    type:String,
    required: true,
    validate(value) 
    {
        if(!validator.isMobilePhone(value))
            {
                throw new Error("Invalid Phone Number");
            }
    }
  },
  Gender: {
    type: String,
    required: true,
    validate(value) {
      if (!["Male", "Female", "Others"].includes(value)) {
        throw new Error("Invalid Gender.");
      }
    },
  },
  Password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Password must be strong");
      }
    },
  },
  DateOfBirth: {
    type: Date,
    required: true,
    validate(value) {
      if (!validator.isDate(value)) {
        throw new Error("Invalid Date of Birth");
      }
    },
  },
  RefreshToken:
  {
    type:String,
    default:null,
    validate(value) {
      if (value && !validator.isJWT(value)) {
        throw new Error("Invalid Refresh Token");
      }
    }
  }
},{timestamps: true});

module.exports = mongoose.model("User", UserSchema);
