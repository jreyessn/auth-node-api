import app from './app';
import { startConnection } from './database';
import { createRoles } from './libs/initialSetup';

async function main(){

	await startConnection();
	await app.listen(app.get('port'))

	createRoles();

	console.log("Puerto", app.get('port'))

} 


main();