import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      validate: {
        validator: (val) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
        message: "Email address must be valid",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password must be at least 8 characters long."],
    },
  },
  { timestamps: true }
);

//define a temporary field that wont't be persisted to the database
UserSchema.virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

//"pre" allows you to define middleware functionality that will execute
//BEFORE the rest of the model functionality
UserSchema.pre("validate", function (next) {
  //use a standard function (scoping issue with 'this')
  console.log(this.confirmPassword);
  //define a validator and its associated error message
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password.");
  }

  // pass on the process to the next function in the process (typically the model's validators)
  next();
});

//make a middleware function that hashes the user password before sending to the database
UserSchema.pre("save", function (next) {
  //has the password that was given
  bcrypt.hash(this.password, 10).then((hashedPassword) => {
    this.password = hashedPassword;
    next();
  });
});

const UserModel = model("User", UserSchema);

export default UserModel;
