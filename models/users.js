const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Provide a name"],
      trim: true,
      minlength: 4,
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide your email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Provide your passowrd"],
      trim: true,
      minlength: 6,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    coverPicture: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      maxlength: 200,
    },
    city: {
      type: String,
      maxlength: 20,
    },
    from: {
      type: String,
      maxlength: 20,
    },
    relationShip: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

// UserSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

UserSchema.methods.checkPassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
