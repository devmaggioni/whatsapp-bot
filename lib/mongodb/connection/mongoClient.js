import {
	MongoClient
} from "mongodb"
import "dotenv/config"
import logger from "../../logger/index.js"

if (!process.env.URL_MONGO) {
	logger.warn("Cannot find variable \"URL_MONGO\" in process.env")
}

let mongoClient = process.env.URL_MONGO ? new MongoClient(process.env.URL_MONGO) : undefined

if (mongoClient) {
	mongoClient.connect()
	.then(() => logger.info("Database is connected"))
	.catch(error => console.log(error))
}

/*
let mongoClient = new MongoClient(process.env.URL_MONGO)
mongoClient.connect()
	.then(() => logger.info("Database is connected"))
	.catch(error => console.log(error))
*/

export default mongoClient