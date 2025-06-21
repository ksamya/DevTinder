const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const validator = require("validator");

//here we created a schema which is a structure or a blue print of what type a document is should be inside a collection
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("invalid email id");
          
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          if (value.length < 3) {
            throw new Error("Password length should be more than 3 char");
          }
          let hasUpper = false;
          let hasLower = false;
          let hasNumber = false;
          let hasSpecial = false;

          // Define allowed special characters (adjust if needed)
          const specialChars = "!@#$%^&*()_+[]{}|;:',.<>?/`~";

          for (let i = 0; i < value.length; i++) {
            const char = value[i];

            if (!isNaN(char) && char !== " ") {
              hasNumber = true;
            } else if (char >= "A" && char <= "Z") {
              hasUpper = true;
            } else if (char >= "a" && char <= "z") {
              hasLower = true;
            } else if (specialChars.includes(char)) {
              hasSpecial = true;
            }
          }

          // Return true only if all conditions are met
          if (hasUpper && hasLower && hasNumber && hasSpecial) {
            return true;
          }

          throw new Error(
            "Password must be at least 4 characters and include uppercase, lowercase, number, and special character"
          );
        },
      },
    },
    age: {
      type: Number,
      trim: true,
      validate: [
        {
          validator: Number.isInteger,
        },
        {
          validator: function (value) {
            if (value >= 18) {
              true;
            } else {
              throw new Error("age should me more than 18 years");
            }
          },
        },
      ],
    },
    gender: {
      type: String,
      trim: true,
    },
    photoUrl: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg",
      trim: true,
    },
    about: {
      type: String,
      default: "Write about your self",
      trim: true,
    },
    skills: {
      type: [String],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

//To communicate with DB we need to use Module

module.exports = mongoose.model("User", userSchema);
