import mongoose from 'mongoose';

// create Schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

// convert schema into the model
const User = mongoose.model('User', userSchema);

// export mongoose Model from User file
export default User;
