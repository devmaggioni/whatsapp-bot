import pino from "pino"
import pinoHttp from "pino-http"
import * as dotenv from "dotenv"; dotenv.config();

const pinoConfig = {
	level: process.env.BOT_LOGGER_LEVEL || "debug",
	transport: {
		target: "pino-pretty",
		options: {
			colorize: true,
			levelFirst: true
		}
	}
}

export const loggerHttp = pinoHttp
const logger = pino(pinoConfig)
export default logger