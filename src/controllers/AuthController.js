import User from '../models/User';
import Role from '../models/Role';

import jwt from 'jsonwebtoken';
import config from '../config';

export const signUp = async (req, res) => {
	const { username, email, password, roles } = req.body;

	const newUser = new User({
		username,
		email,
		password: await User.encryptPassword(password),
		role: await Role.findOne({ name: 'user' })
	})	
	
	const savedUser = await newUser.save();

	const token = jwt.sign({id: savedUser._id}, config.SECRET, {
		expiresIn: 3600
	})

	res.json({
		message: "Usuario registrado correctamente",
		token
	})
}

export const signIn = async (req, res) => {
	const userFound = await User.findOne({ email: req.body.email }).populate("roles")

	if(!userFound) return res.status(404).json({message: "Usuario no encontrado", token: null })

	const matchPassword = await User.passwordHash(req.body.password, userFound.password)

	if(!matchPassword) return res.status(404).json({message: "Contraseña Invalida", token: null })

	const token = jwt.sign({id: userFound._id}, config.SECRET, {
		expiresIn: 3600
	})

	res.json({
		token
	})
}

