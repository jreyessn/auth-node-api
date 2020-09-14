// middleware es un validator
import Role from '../models/Role';
import User from '../models/User';

export const checkDuplicateUser = async (req, res, next) => {
	const user = await User.findOne({username: req.body.username})

	if(user) return res.status(400).json({ message: "El usuario ya existe" })

	const email = await User.findOne({email: req.body.email})

	if(email) return res.status(400).json({ message: "El email de usuario ya existe" })

	next();
}

export const checkRolesExisted = async (req, res, next) => {
	if(req.body.roles) {

		const roles = (await Role.find()).map(item => item.name);

		req.body.roles.forEach(role => {
			
			if(!roles.includes(role)) {

				return res.status(400).json({
					message: "El rol " + role + " no existe",
				})

			}

		})

		next();
	}

}
