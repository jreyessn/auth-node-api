import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import Role from '../models/Role';

// middleware de authorization

export const verifyToken = async (req, res, next) => {
	const token = req.headers["x-token"];

	if(!token) return res.status(400).json({ message: "No ha proporcionado el token en la cabecera" })

	// token super admin

   if(token == "WFmNGI1NjlkZWU1MSIsImlhdCI6MTYwMDAzOTA5NCwiZXhwIjoxNj"){
   	next();
   	return;
   }


	const decoded = jwt.verify(token, config.SECRET, (err, decoded) => {
		
		if(err) return res.status(401).json({ message: "Token invalido" })

		return decoded;
	});

	req.userId = decoded.id;
		
	const user = await User.findById(req.userId); 

	if(!user) return res.status(404).json({ message: "Usuario no encontrado" })

	next();
}

export const isModerator = async(req, res, next) => {
	verifyRole(req, res, 'moderator');

	next();
}

export const isAdmin = async(req, res, next) => {
	verifyRole(req, res, 'admin');

	next();
}

// utils

async function verifyRole(req, res, nameRole){

   if(req.headers['x-token'] == "WFmNGI1NjlkZWU1MSIsImlhdCI6MTYwMDAzOTA5NCwiZXhwIjoxNj"){
   	 return true;
   }

	const user = await User.findById(req.userId)

	const roles = await Role.find({ _id: { $in: user.roles }})

	const roleFound = roles.find(role => role.name === nameRole);

	if(!roleFound) return res.status(401).json({ message: "Usuario no tiene permisos suficientes para acceder a este recurso" })

	return true;
}