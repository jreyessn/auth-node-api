import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
	username: {
		unique: true,
		type: String
	},
	email: {
		unique: true,
		type: String
	},
	password: {
		type: String,
		required: true
	},
	roles: [{
		ref: "Role",
		type: Schema.Types.ObjectId
	}]
}, {
	timestamps: true,
	versionKey: false
})

userSchema.statics.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10)

	return await bcrypt.hash(String(password), salt)
}

// retorna un true o false

userSchema.statics.passwordHash = async (password, receivePassword) => {
	return await bcrypt.compare(String(password), receivePassword)
}

export default model('User', userSchema);