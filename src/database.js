import { connect } from 'mongoose';

export async function startConnection(){

	await connect('mongodb://54.215.246.194:27017/company', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
		createIndexes: true
	})

	console.log("Database connected")
}
