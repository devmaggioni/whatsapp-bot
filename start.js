import startBot from "./src/app.js"
import logger from "./lib/logger/index.js"
import sleep from "./lib/sleep.js"

async function run(){
	
	let isNotDefined = (varName, defaultName) => logger.warn(!defaultName ? `environment variable "${varName}" is not defined.` : `environment variable "${varName}" is not defined. default: "${defaultName}"`)
	
	let interval = 1500
	
	if (!process.env.URL_MONGO) {
		await sleep(interval)
		isNotDefined("URL_MONGO")
	}
	
if (!process.env.BOT_PREFIX) {
		await sleep(interval)
		isNotDefined("BOT_PREFIX", "#")
	}
	
if (!process.env.BOT_OWNER) {
		await sleep(interval)
		isNotDefined("BOT_OWNER")
	}
	
if (!process.env.BOT_LOGGER_LEVEL) {
		await sleep(interval)
		isNotDefined("BOT_LOGGER_LEVEL", "info")
	}
	
	startBot()
	
}
run()