import logger from "./lib/logger/index.js"
import * as baileys from "./lib/baileys/index.js"
import qrcode from "qrcode-terminal"
import handleMessages from "./src/handleMessages.js"

const startBot = () => {
	try {

		let bot = baileys.Sock()

		bot.ev.process(
			async(events) => {


				if (events["connection.update"]) {
					baileys.keepConnected(events, startBot)

					let conn = events["connection.update"]
					logger.debug(conn)

					if (conn?.connection === "open") {
						logger.info("Connection Openned")
					}
					if (conn?.connection === "connecting") {
						logger.info("wait, connecting...")
					}

					if (conn.qr) {
						logger.info("Scan the QR Code on Whatsapp")
						qrcode.generate(conn.qr, {
							small: true
						}, qrcode => logger.info("\n" + qrcode))
					}

				}


				if (events["creds.update"]) {
					const {
						saveCreds
					} = baileys
					await saveCreds()
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
startBot()