import { MongoClient } from "mongodb";
import 'dotenv/config';
import logger from "../../logger/index.js"

if (!process.env.URL_MONGO){
	logger.error('Cannot find variable "URL_MONGO" in process.env')
}

let mongoClient = new MongoClient(process.env.URL_MONGO);
mongoClient.connect()
.then(() => logger.info('Database is connected'))
    .catch(error => console.log(error));

export default mongoClient;