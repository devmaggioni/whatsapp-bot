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

		const bot = Sock("db")

		/*
   // save credentials locally

		const bot = Sock('local')
		*/

		bot.ev.process(
			async(events) => {

				if (events["connection.update"]) {
					let conn = events["connection.update"]
					// reconnect if disconnection
					baileys.keepConnected(events, startBot)
					handleConnection(bot, conn)
				}

				if (events["creds.update"]) {
					const {
						mongoSaveCreds
					} = baileys

					await mongoSaveCreds()
					
					/*
					// save credentials locally
					
					const {
						defaultSaveCreds
					} = baileys

					await defaultSaveCreds()
					*/

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