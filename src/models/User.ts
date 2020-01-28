// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
import { Schema, Document, Model, model } from 'mongoose';

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
}

//Create Schema
const UserSchema: Schema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

//middleware hook
// UserSchema.pre('findOneAndUpdate', function () {
// 	this.update({}, { $set: { updated_at: new Date() } });
// });
const User: Model<IUser> = model<IUser>('User', UserSchema);
export default User;
// module.exports =