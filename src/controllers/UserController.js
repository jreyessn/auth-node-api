import User from '../models/User';
import Role from '../models/Role';

// show all items

export const index = async (req, res) => {
	const users = await User.find();
	
	res.status(200).json(users)
}

// save a item

export const store = async (req, res) => {

	const newUser = new User(req.body)

    // checking for roles
    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: req.body.roles } });

      newUser.roles = foundRoles.map((role) => role._id);

    } else {
      const role = await Role.findOne({ name: "user" });

      newUser.roles = [role._id];
    }

	await newUser.save();

	res.status(201).json({
		message: 'Usuario creado correctamente',
	})
}