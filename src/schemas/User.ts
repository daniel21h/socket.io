import mongoose, { Document, Schema } from 'mongoose';

type User = Document & {
  socket_id: string;
  name: string;
  email: string;
  avatar: string;
};

const UserSchema = new Schema({
  socket_id: String,
  name: String,
  email: String,
  avatar: String,
});

const User = mongoose.model<User>('Users', UserSchema);

export { User };
