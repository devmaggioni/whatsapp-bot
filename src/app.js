import logger from "../lib/logger/index.js"
import * as baileys from "../lib/baileys/index.js"

/* handle Events */
import handleMessages from "./handle/handleMessages.js"
import handleConnection from "./handle/handleConnection.js"

const startBot = async() => {
	try {

		const {
			Sock
		} = baileys

		const bot = Sock("db") // "local" to save locally

		bot.ev.process(
			async(events) => {

				if (events["connection.update"]) {
					let conn = events["connection.update"]
					// reconnect if disconnection
					baileys.keepConnected({bot, events, startBot})
					handleConnection(bot, conn)
				}

				if (events["creds.update"]) {
					const {
						mongoSaveCreds
					} = baileys

         if (mongoSaveCreds) {
					await mongoSaveCreds()
         } else {
					// save credentials locally
         	const {
						defaultSaveCreds
					} = baileys

					await defaultSaveCreds()
					logger.warn("Could not access the database. saving files locally.")
         }
					
				}

				if (events["messages.upsert"]) {
					let message = events["messages.upsert"]
					handleMessages(bot, message)
				}

			})

	} catch(e) {
		logger.error(e)
	}
}

export default startBot