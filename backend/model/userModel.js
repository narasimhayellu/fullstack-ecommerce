const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = Schema({
      firstName: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [2, 'First name must be at least 2 characters'],
        maxlength: [50, 'First name cannot exceed 50 characters']
      },
      lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: [2, 'Last name must be at least 2 characters'],
        maxlength: [50, 'Last name cannot exceed 50 characters']
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
      }
   })

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

